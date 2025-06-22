import whisper
import torch
import os
import shutil
from uuid import uuid4
from fastapi import UploadFile
from schemas.transcription import TranscriptionResponse

device = "cuda" if torch.cuda.is_available() else "cpu"
model = whisper.load_model("small").to(device)
if device == "cuda":
    model = model.half()

async def transcribe_audio_file(file: UploadFile) -> TranscriptionResponse:
    file_id = str(uuid4())
    temp_path = f"uploads/{file_id}_{file.filename}"
    os.makedirs("uploads", exist_ok=True)

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = model.transcribe(temp_path)
    os.remove(temp_path)

    return TranscriptionResponse(text=result["text"], segments=result.get("segments", []))
