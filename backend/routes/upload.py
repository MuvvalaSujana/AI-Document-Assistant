from fastapi import APIRouter, UploadFile, File, HTTPException
import os

from services.pdf_loader import load_pdf
from services.text_splitter import split_text
from services.vector_store import create_vector_store

router = APIRouter()


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    try:

        if not file.filename.lower().endswith(".pdf"):
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed."
            )

        os.makedirs("uploads", exist_ok=True)

        file_path = os.path.join(
            "uploads",
            file.filename
        )

        with open(file_path, "wb") as f:
            f.write(await file.read())

        documents = load_pdf(file_path)

        chunks = split_text(documents)

        create_vector_store(chunks)

        return {
            "success": True,
            "message": "PDF uploaded successfully",
            "filename": file.filename,
            "pages": len(documents),
            "chunks": len(chunks)
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )