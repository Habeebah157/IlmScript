import whisper
import json
import torch
from pathlib import Path

def transcribe_to_file(audio_path: str, output_txt_path="transcript.txt", output_json_path="transcript.json"):
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Using device: {device}")

    model = whisper.load_model("small").to(device)
    if device == "cuda":
        model = model.half()

    print("Starting transcription...")
    result = model.transcribe(audio_path)

    # Save plain text
    with open(output_txt_path, "w", encoding="utf-8") as f:
        f.write(result["text"])

    # Save full JSON
    with open(output_json_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print("Transcription complete.")
    print(result)
    return result
