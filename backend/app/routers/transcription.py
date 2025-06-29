from fastapi import APIRouter, HTTPException
from pathlib import Path
import whisper
import torch
import json
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import shutil
import os

router = APIRouter()

# Load model once at module level
device = "cuda" if torch.cuda.is_available() else "cpu"
model = whisper.load_model("small").to(device)
if device == "cuda":
    model = model.half()

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