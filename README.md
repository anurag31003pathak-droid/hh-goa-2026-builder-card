# 🏛 Sutradhar AI: Citizen's Legislative Compass

Sutradhar AI is a **high-performance Legal-Tech Platform** that transforms dense Indian legal documents (such as the BNS, DPDP Act, and parliamentary bills) into real-time, easy-to-understand insights. Built for citizens, powered by AI.

## ✨ Features
- **Smart Document Ingestion**: Upload massive 100k+ token legal PDFs natively.
- **Map-Reduce Semantic Chunking**: Our token compression engine isolates Rights, Penalties, and Obligations automatically.
- **8th-Grade Translation**: Converts complex procedural legalese into simple English.
- **RAG QA Chatbot**: Chat securely and accurately with your laws via vector indexing.
- **Premium Glassmorphic UI**: Hackathon-winning aesthetics built with Next.js, Framer Motion, and Tailwind CSS v4.

## 🛠️ Tech Stack
- **Frontend**: Next.js 15, Framer Motion, TailwindCSS
- **Backend**: FastAPI (Python), Uvicorn
- **AI Engine**: LangChain, OpenAI API
- **Vector DB**: FAISS Local Embeddings
- **Extraction**: PDFPlumber

## 🚀 Quick Start Pipeline

### 1. Launch the Backend Inference Engine
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Configure your Environment
echo "OPENAI_API_KEY=sk-..." > .env

uvicorn main:app --port 8000
```

### 2. Launch the Citizen Dashboard
```bash
cd frontend
npm install
npm run dev
```

Navigate to `http://localhost:3000` to interact with the fully localized Map-Reduce AI platform!

---
*Built with ❤️ during the AI Web App Hackathon.*
