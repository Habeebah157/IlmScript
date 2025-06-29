# docker run --name ilm_postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=ilm_db -p 5432:5432 -d postgres


from sqlmodel import SQLModel, create_engine, Session
DATABASE_URL = "postgresql://postgres:secret@localhost/ilm_db"
engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session