from fastapi import APIRouter, UploadFile, File
from fastapi.responses import HTMLResponse, JSONResponse
import shutil
import os

# from .. import database

# Now use database.some_function() or database.database (whatever you have)


# from app.models import files

from app.models.models import files




router = APIRouter()

UPLOAD_DIR = "app/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return JSONResponse(content={"url": f"/uploads/{file.filename}"})


@router.get("/", response_class=HTMLResponse)
def form_page():
    return """
    <html>
        <body>
            <h2>Upload an MP3 file</h2>
            <form action="/upload" enctype="multipart/form-data" method="post">
                <input name="file" type="file" accept=".mp3">
                <input type="submit">
            </form>
        </body>
    </html>
    """

@router.post("/uploadandsave")
async def upload_and_save_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    query = files.insert().values(filename=file.filename, url=f"/uploads/{file.filename}")
    await database.execute(query)

    return {"url": f"/uploads/{file.filename}"}
