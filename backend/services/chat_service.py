from langchain_google_genai import ChatGoogleGenerativeAI

from app.config import GOOGLE_API_KEY
from services.retriever import get_retriever


def ask_question(question: str):

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=GOOGLE_API_KEY,
        temperature=0.2
    )

    retriever = get_retriever()

    docs = retriever.invoke(question)

    if not docs:
        return (
            "I couldn't find any relevant information in the uploaded document."
        )

    context = "\n\n".join(
        [
            f"Page {doc.metadata.get('page', 'Unknown')}:\n{doc.page_content}"
            for doc in docs
        ]
    )

    prompt = f"""
You are an AI Document Assistant.

Your job is to answer questions ONLY using the provided document.

Rules:
1. Answer ONLY from the context.
2. If the answer is not available in the document, reply:
   "I couldn't find this information in the uploaded PDF."
3. Keep answers clear and professional.
4. Use bullet points whenever appropriate.
5. If summarizing, organize the answer into sections.
6. Never make up information.

=========================
DOCUMENT
=========================

{context}

=========================
QUESTION
=========================

{question}

=========================
ANSWER
=========================
"""

    response = llm.invoke(prompt)

    answer = response.content.strip()

    pages = sorted(
        {
            doc.metadata.get("page", "Unknown")
            for doc in docs
        }
    )

    answer += "\n\n---\n"

    answer += "**Source Pages:** "

    answer += ", ".join(str(page) for page in pages)

    return answer