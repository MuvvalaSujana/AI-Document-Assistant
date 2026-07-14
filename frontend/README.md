# AI Document Assistant 🚀

A full-stack, modular AI application that parses documents and handles conversational retrieval using FastAPI and React.

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** FastAPI, Uvicorn, Python
- **AI/LLM:** [Insert your model/framework here, e.g., LangChain, OpenAI API, Gemini API]
- **Database/Vector Store:** [Insert if any, e.g., ChromaDB, FAISS]

## 🏗️ Architecture Features
- **Modular Routing:** Segregated API controllers for chunking/uploading documents and vector-backed chat retrieval.
- **Asynchronous Processing:** Built using FastAPI's async paradigms to handle incoming file uploads smoothly.

## 🚀 Local Installation
1. Clone the repo and navigate to backend: `cd backend`
2. Install dependencies: `pip install -r requirements.txt`
3. Run the server: `uvicorn main:app --reload`
