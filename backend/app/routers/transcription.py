from fastapi import APIRouter
from pathlib import Path
import json
from ..controllers.transcription_controller import transcribe_to_file

router = APIRouter()

@router.post("/transcribe")
async def run_transcription():
    try:
        audio_path = Path(__file__).parent.parent / "audio" / "Friday Khutbah_ The Art of Silence.mp3"
        output_json_path = Path(__file__).parent.parent / "audio" / "output.json"
        output_txt_path = Path(__file__).parent.parent / "audio" / "output.txt"

        # Call transcription function
        transcribe_to_file(
            audio_path=str(audio_path),
            output_txt_path=str(output_txt_path),
            output_json_path=str(output_json_path)
        )

        # Read and print the JSON contents
        with open(output_json_path, "r", encoding="utf-8") as f:
            transcription_data = json.load(f)

        # Print the transcription to console/logs
        print("Transcription result:", transcription_data)

        return transcription_data

    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")