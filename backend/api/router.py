import os
import shutil
import tempfile
from fastapi import APIRouter, UploadFile, File, HTTPException
from models.schemas import SummarizationResponse, QARequest, QAResponse
from services.compression import TokenCompressionEngine
from services.ingestion import DocumentIngestionEngine

api_router = APIRouter()
compression_engine = TokenCompressionEngine()

@api_router.post("/documents/ingest", response_model=SummarizationResponse)
async def ingest_document(file: UploadFile = File(...)):
    """
    Endpoint for Document Ingestion. 
    Accepts PDF files, parses them, and executes the Map-Reduce summarization.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No filename provided")
        
    # Save the uploaded file temporarily to extract text using pdfplumber
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            shutil.copyfileobj(file.file, tmp)
            tmp_path = tmp.name
            
        full_text = DocumentIngestionEngine.extract_text(tmp_path)
        os.remove(tmp_path) # clean up
    except Exception as e:
         raise HTTPException(status_code=500, detail=f"Failed to process file: {str(e)}")
    
    if not full_text:
         raise HTTPException(status_code=400, detail="The uploaded PDF contains no extractable text.")
         
    try:
        # Process document
        response = compression_engine.process_document(file.filename, full_text)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@api_router.post("/qa/ask", response_model=QAResponse)
async def ask_question(request: QARequest):
    """
    RAG QA endpoint. Takes document_id and query, returns grounded answer.
    """
    try:
        return compression_engine.answer_question(request.document_id, request.query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
