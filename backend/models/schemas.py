from pydantic import BaseModel
from typing import List, Optional, Any

class ChunkMetadata(BaseModel):
    section: str
    clause: Optional[str] = None
    original_tokens: int

class CompressedChunk(BaseModel):
    id: str
    content: str
    metadata: ChunkMetadata
    entities: List[str]
    compressed_tokens: int
    simplified: Optional[str] = None

class SummarizationResponse(BaseModel):
    document_id: str
    filename: str
    tldr: str
    sections: List[CompressedChunk]

class QARequest(BaseModel):
    document_id: str
    query: str

class QAResponse(BaseModel):
    answer: str
    confidence_score: float
    sources: List[str]
