from sqlalchemy import Table, Column, Integer, String, MetaData

metadata = MetaData()

files = Table(
    "files",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("filename", String, unique=True, index=True),
    Column("url", String),
)
