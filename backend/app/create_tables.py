from sqlalchemy import create_engine
from models import metadata

engine = create_engine("postgresql://postgres:secret@localhost:5432/ilm_db")

metadata.create_all(engine)
