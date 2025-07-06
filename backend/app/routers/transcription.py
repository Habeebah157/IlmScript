from fastapi import APIRouter, HTTPException, UploadFile, Depends
from fastapi import File as UploadFileField  # rename FastAPI's File to avoid conflict
from pathlib import Path
import whisper
import torch
import json
import os
from app.models.models import File as FileModel, Segment  # use FileModel for your model
from app.database import get_session
from sqlmodel import Session, select
import hashlib
import cloudinary
import cloudinary.uploader
from io import BytesIO
import tempfile



router = APIRouter()

import cloudinary

cloudinary.config(
    cloud_name="dvozhxxtl",      
    api_key="494359569394626",             
    api_secret="ptM56roFhv0GBAlwLits-tf4hLM",      
    secure=True
)

# Load model once at module level
device = "cuda" if torch.cuda.is_available() else "cpu"
model = whisper.load_model("small").to(device)
if device == "cuda":
    model = model.half()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/getsavedtranscriptions")
async def getsavedtranscriptions(
    session: Session = Depends(get_session)
):
    files = session.exec(select(FileModel)).all()

    if not files:
        raise HTTPException(status_code=404, detail="No transcriptions found")

    result = []

    for file in files:
        result.append({
            "filename": file.filename,
            "url": file.url,
            "player": f'<audio controls src="{file.url}">Your browser does not support the audio element.</audio>',
            "segments": [
                {
                    "start": segment.start,
                    "end": segment.end,
                    "text": segment.text
                }
                for segment in file.segments
            ]
        })


    return result
    


@router.post("/transcribe")
async def transcribe_audio(
    file: UploadFile,
    session: Session = Depends(get_session),
):
    # Check file extension (case-insensitive)
    if not file.filename.lower().endswith(".mp3"):
        raise HTTPException(status_code=400, detail="Only MP3 files are allowed")

    # Read file and calculate hash
    content = await file.read()
    file_hash = hashlib.sha256(content).hexdigest()

    # Check for existing transcription
    existing_file = session.exec(select(FileModel).where(FileModel.hash == file_hash)).first()
    if existing_file and existing_file.segments:
        segments = [
            {"start": seg.start, "end": seg.end, "text": seg.text}
            for seg in existing_file.segments
        ]
        return {
            "segments": segments,
            "filename": existing_file.filename,
            "url": existing_file.url,
        }


    # Upload to Cloudinary
    try:
        file_bytes = BytesIO(content)
        upload_result = cloudinary.uploader.upload_large(
            file_bytes,
            resource_type="video",
            public_id=f"audio_uploads/{file.filename.split('.')[0]}_{file_hash[:8]}",
            chunk_size=6000000
        )
        audio_url = upload_result["secure_url"]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Cloudinary upload failed: {str(e)}")

    # Save metadata in DB
    file_record = FileModel(
        filename=file.filename,
        url=audio_url,
        hash=file_hash,
    )
    session.add(file_record)
    session.commit()
    session.refresh(file_record)

    # Write audio to a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio:
        temp_audio.write(content)
        temp_audio_path = Path(temp_audio.name)

    # Set path for transcription output
    output_json_path = temp_audio_path.with_suffix(".json")

    try:
        # Transcribe using the model (e.g., Whisper)
        result = model.transcribe(str(temp_audio_path), fp16=(device == "cuda"))
        with open(output_json_path, "w", encoding="utf-8") as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")
    finally:
        # Clean up temporary audio file
        os.remove(temp_audio_path)

    # Extract segments and save to DB
    segments = result.get("segments", [])
    for seg in segments:
        segment_record = Segment(
            file_id=file_record.id,
            start=seg["start"],
            end=seg["end"],
            text=seg["text"],
        )
        session.add(segment_record)
    session.commit()

    return {
        "segments": segments,
        "filename": file.filename,
        "url": audio_url,
        "transcription_file": str(output_json_path),
    }

# @router.get("/transcription")
# async def get_transcription():
#     try:
#         output_json_path = Path(__file__).parent.parent / "audio" / "output.json"

#         if not output_json_path.exists():
#             raise HTTPException(status_code=404, detail="Transcription file not found.")

#         with open(output_json_path, "r", encoding="utf-8") as f:
#             result = json.load(f)

#         segments = result.get("segments", [])
#         return segments

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Failed to load transcription: {str(e)}")
