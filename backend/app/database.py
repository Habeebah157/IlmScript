# from sqlmodel import SQLModel, create_engine, Session
# from typing import Generator

# DATABASE_URL = "postgresql://postgres:secret@localhost/ilm_db"
# engine = create_engine(DATABASE_URL, echo=True)

# def get_session() -> Generator[Session, None, None]:
#     with Session(engine) as session:
#         yield session

# def create_db_and_tables():
#     SQLModel.metadata.create_all(engine)

from databases import Database
from sqlmodel import Session, SQLModel, create_engine

DATABASE_URL = "postgresql://postgres:secret@localhost/ilm_db"

# For async use with `databases` package
database = Database(DATABASE_URL)

# For sync use with SQLModel
engine = create_engine(DATABASE_URL)


def get_session():
    with Session(engine) as session:
        yield session

