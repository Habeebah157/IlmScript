from pydantic import BaseModel
from typing import List, Optional

class Segment(BaseModel):
    start: float
    end: float
    text: str

class TranscriptionResponse(BaseModel):
    text: str
    segments: Optional[List[Segment]] = []
