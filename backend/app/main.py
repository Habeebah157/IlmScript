# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from .routers import transcription
# from fastapi.staticfiles import StaticFiles
# from fastapi import FastAPI
# from fastapi.staticfiles import StaticFiles
# from app.routers import upload  



# # uvicorn app.main:app --reload
# app = FastAPI()

# # Allow CORS for React (running on port 3000)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # React's default port
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # @app.on_event("startup")
# # async def startup():
# #     await database.connect()

# # @app.on_event("shutdown")
# # async def shutdown():
# #     await database.disconnect()

# class Message(BaseModel):
#     text: str

# app.include_router(transcription.router)
# @app.get("/")
# async def root():
#     return {"message": "Hello from FastAPI!"}



# # app.mount("/uploads", StaticFiles(directory="app/uploads"), name="uploads")
# app.include_router(upload.router)

# @app.post("/send")
# async def send_message(message: Message):
#     return {"response": f"FastAPI received: {message.text}"}

from fastapi.staticfiles import StaticFiles
from app.routers import upload
from .routers import transcription
from app.database import database, get_session
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from sqlmodel import SQLModel
from app.database import engine, database


app = FastAPI()

# Mount static files BEFORE including routers
app.mount("/uploads", StaticFiles(directory="app/uploads"), name="uploads")

@app.on_event("startup")
async def startup():
    await database.connect()
    SQLModel.metadata.create_all(engine)

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# CORS middleware config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production!
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(upload.router)
app.include_router(transcription.router)

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI!"}

@app.post("/send")
async def send_message(text: str):
    return {"response": f"FastAPI received: {text}"}
