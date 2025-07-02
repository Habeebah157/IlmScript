from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional

class Segment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    file_id: int = Field(foreign_key="file.id")
    start: float
    end: float
    text: str

    file: Optional["File"] = Relationship(back_populates="segments")


class File(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    filename: str
    url: str
    hash: str = Field(index=True, unique=True)

    segments: List[Segment] = Relationship(back_populates="file")