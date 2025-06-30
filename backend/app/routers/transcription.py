from fastapi import APIRouter, HTTPException
from pathlib import Path
import whisper
import torch
import json
from fastapi import FastAPI, File, UploadFile, Depends
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import shutil
import os
from app.models.models import File as FileModel
from app.database import get_session
from sqlmodel import Session
import hashlib




router = APIRouter()

# Load model once at module level
device = "cuda" if torch.cuda.is_available() else "cpu"
model = whisper.load_model("small").to(device)
if device == "cuda":
    model = model.half()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/transcribe")
async def transcribe_audio(
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
):
    if not file.filename.endswith(".mp3"):
        raise HTTPException(status_code=400, detail="Only MP3 files are allowed")

    content = await file.read()
    file_hash = hashlib.sha256(content).hexdigest()

    existing_file = session.query(FileModel).filter_by(hash=file_hash).first()
    audio_path = Path(UPLOAD_DIR) / file.filename
    output_json_path = audio_path.with_suffix(".json")

    if existing_file:
        # If transcription JSON exists, load it, else transcribe and save again
        if output_json_path.exists():
            with open(output_json_path, "r", encoding="utf-8") as f:
                result = json.load(f)
        else:
            try:
                result = model.transcribe(str(audio_path), fp16=(device == "cuda"))
                with open(output_json_path, "w", encoding="utf-8") as f:
                    json.dump(result, f, indent=2, ensure_ascii=False)
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")
    else:
        # Save uploaded file to disk (write the bytes content)
        with open(audio_path, "wb") as buffer:
            buffer.write(content)

        try:
            result = model.transcribe(str(audio_path), fp16=(device == "cuda"))
            with open(output_json_path, "w", encoding="utf-8") as f:
                json.dump(result, f, indent=2, ensure_ascii=False)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")

        file_record = FileModel(
            filename=file.filename,
            url=f"/uploads/{file.filename}",
            hash=file_hash,
        )
        session.add(file_record)
        session.commit()
        session.refresh(file_record)

    segments = result.get("segments", [])
    print(f"Transcription segments count: {len(segments)}")

    return {
        "segments": segments,
        "filename": file.filename,
        "transcription_file": str(output_json_path),
    }
# @router.post("/transcribe")
# async def run_transcription():
#     try:
#         audio_path = Path(__file__).parent.parent / "audio" / "Friday Khutbah_ The Art of Silence.mp3"
#         output_json_path = Path(__file__).parent.parent / "audio" / "output.json"

#         if output_json_path.exists():
#             # ✅ Already transcribed — return from file
#             with open(output_json_path, "r", encoding="utf-8") as f:
#                 result = json.load(f)
#         else:
#             # 🚀 Transcribe and save result
#             result = model.transcribe(
#                 str(audio_path),
#                 fp16=(device == "cuda")
#             )

#             # Save result
#             with open(output_json_path, "w", encoding="utf-8") as f:
#                 json.dump(result, f, indent=2, ensure_ascii=False)

#         # Return segments only
#         segments = result.get("segments", [])
#         print(f"Transcription segments count: {len(segments)}")

#         return segments

#     except FileNotFoundError:
#         raise HTTPException(status_code=404, detail="File not found.")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")

@router.get("/transcription")
async def get_transcription():
    try:
        output_json_path = Path(__file__).parent.parent / "audio" / "output.json"

        if not output_json_path.exists():
            raise HTTPException(status_code=404, detail="Transcription file not found.")

        with open(output_json_path, "r", encoding="utf-8") as f:
            result = json.load(f)

        segments = result.get("segments", [])
        return segments

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load transcription: {str(e)}")


# app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# UPLOAD_DIR = "uploads"
# os.makedirs(UPLOAD_DIR, exist_ok=True)

# @app.post("/upload")
# async def upload_file(file: UploadFile = File(...)): 
#     file_location = f"{UPLOAD_DIR}/{file.filename}"
#     with open(file_location, "wb") as f: 
#         shutil.copyfileobj(file.file, f)
#     return {"filename": file.filename, "url": f"/uploads/{file.filename}"}