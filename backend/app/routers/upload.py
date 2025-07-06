from fastapi import APIRouter, UploadFile, File, Depends
from fastapi.responses import HTMLResponse, JSONResponse
from sqlmodel import Session
from app.database import get_session
from app.models.models import File as FileModel
import shutil
import os
import hashlib

router = APIRouter()

UPLOAD_DIR = "app/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# @router.get("/", response_class=HTMLResponse)
# def form_page():
#     return """
#     <html>
#         <body>
#             <h2>Upload an MP3 file</h2>
#             <form action="/upload" enctype="multipart/form-data" method="post">
#                 <input name="file" type="file" accept=".mp3">
#                 <input type="submit">
#             </form>
#         </body>
#     </html>
#     """

# @router.post("/upload")
# async def upload_file(file: UploadFile = File(...)):
#     file_path = os.path.join(UPLOAD_DIR, file.filename)
#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)
#     return JSONResponse(content={"url": f"/uploads/{file.filename}"})

# @router.post("/uploadandsave")
# def upload_and_save_file(
#     file: UploadFile = File(...),
#     session: Session = Depends(get_session)
# ):
#     content= file.file.read()
#     file_hash = hashlib.sha256(content).hexdigest()
#     existing_file = session.query(FileModel).filter_by(hash=file_hash).first()
#     if existing_file: 
#         return {
#             "message": "File already exists. ", 
#             "url": existing_file.url, 
#             "filename": existing_file.filename
#         }
#     file_path = os.path.join(UPLOAD_DIR, file.filename)
#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)

#     file_record = FileModel(
#         filename=file.filename,
#         url=f"/uploads/{file.filename}", 
#         hash = file_hash
#     )
#     session.add(file_record)
#     session.commit()
#     session.refresh(file_record)

#     return {"url": file_record.url, "filename": file_record.filename}
