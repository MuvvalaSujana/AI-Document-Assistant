import os

from langchain_community.vectorstores import FAISS
from services.embedding import get_embeddings

DB_PATH = "faiss_index"


def create_vector_store(chunks):
    embeddings = get_embeddings()

    vector_store = FAISS.from_documents(
        documents=chunks,
        embedding=embeddings
    )

    os.makedirs(DB_PATH, exist_ok=True)

    vector_store.save_local(DB_PATH)

    return vector_store


def load_vector_store():

    if not os.path.exists(DB_PATH):
        raise FileNotFoundError(
            "Please upload a PDF first."
        )

    return FAISS.load_local(
        DB_PATH,
        get_embeddings(),
        allow_dangerous_deserialization=True
    )