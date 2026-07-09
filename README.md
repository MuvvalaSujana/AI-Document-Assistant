# 📄 AI Document Assistant

An AI-powered Document Assistant built with **React**, **FastAPI**, **Google Gemini**, **LangChain**, and **FAISS**.

Users can upload PDF documents and ask natural language questions about their content using Retrieval-Augmented Generation (RAG).

---

## 🚀 Features

- 📄 Upload PDF documents
- 🤖 AI-powered question answering
- 🔍 Semantic search using FAISS
- 📚 LangChain document processing
- 💬 Interactive chat interface
- 🌙 Modern responsive UI
- ⚡ FastAPI backend
- 🧠 Google Gemini integration

---

## 🛠 Tech Stack

### Frontend
- React
- Axios
- CSS

### Backend
- FastAPI
- LangChain
- Google Gemini API
- FAISS
- PyPDF
- Uvicorn

---

## 📂 Project Structure

```
AI-Document-Assistant
│
├── backend
│   ├── routes
│   ├── services
│   ├── uploads
│   ├── main.py
│   └── requirements.txt
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── README.md
└── LICENSE
```

---

## ⚙️ Installation

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 📸 Workflow

1. Upload a PDF
2. Extract text
3. Split text into chunks
4. Generate embeddings
5. Store vectors in FAISS
6. Retrieve relevant chunks
7. Generate answers using Gemini

---

## 🎯 Future Improvements

- Markdown rendering
- Syntax highlighting
- User authentication
- Drag & Drop upload
- Cloud deployment

---

## 👩‍💻 Author

**Muvvala Sujana**

GitHub: https://github.com/MuvvalaSujana