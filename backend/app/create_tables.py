from sqlmodel import SQLModel, create_engine
from models.models import File  # Make sure this includes `hash` field

# Use your actual database connection string
DATABASE_URL = "postgresql://postgres:secret@localhost/ilm_db"

engine = create_engine(DATABASE_URL)

# WARNING: This will delete and recreate all tables defined in your models!
SQLModel.metadata.drop_all(engine)
SQLModel.metadata.create_all(engine)
