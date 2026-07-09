import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [documentInfo, setDocumentInfo] = useState({
    filename: "",
    pages: 0,
    chunks: 0,
  });

  const [darkMode, setDarkMode] = useState(false);

  // Upload PDF
  const uploadPDF = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("✅ PDF uploaded successfully");

      setDocumentInfo({
        filename: res.data.filename,
        pages: res.data.pages,
        chunks: res.data.chunks,
      });

      // New PDF → clear old conversation
      setChatHistory([]);
    } catch (err) {
      console.log(err);
      setMessage("❌ Upload failed");
    }

    setLoading(false);
  };

  // Ask Question
  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          question,
        }
      );

      setChatHistory((prev) => [
        ...prev,
        {
          question,
          answer: res.data.answer,
        },
      ]);

      setQuestion("");
    } catch (err) {
      console.log(err);

      setChatHistory((prev) => [
        ...prev,
        {
          question,
          answer: "❌ Error getting answer.",
        },
      ]);
    }

    setLoading(false);
  };

  // Copy AI Answer
  const copyAnswer = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  // Clear Chat
  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>

      {/* Header */}

      <header className="header">

        <div>

          <h1>📄 AI Document Assistant</h1>

          <p>
            Ask intelligent questions about your uploaded PDF
          </p>

        </div>

        <button
          className="themeBtn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

      </header>

      {/* Upload Card */}

      <div className="card">

        <h2>📤 Upload PDF</h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="primaryBtn"
          onClick={uploadPDF}
        >
          Upload PDF
        </button>

        {message && (
          <p className="successText">
            {message}
          </p>
        )}

      </div>

      {/* Current Document */}

      {documentInfo.filename && (

        <div className="card">

          <h2>📄 Current Document</h2>

          <p>

            <b>Name:</b> {documentInfo.filename}

          </p>

          <p>

            <b>Pages:</b> {documentInfo.pages}

          </p>

          <p>

            <b>Chunks:</b> {documentInfo.chunks}

          </p>

          <p>

            <b>Status:</b> ✅ Indexed Successfully

          </p>

        </div>

      )}

      {/* Ask Question */}

      <div className="card">

        <h2>💬 Ask AI</h2>

        <textarea
          rows="5"
          placeholder="Ask anything about the uploaded document..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <div className="buttonRow">

          <button
            className="primaryBtn"
            onClick={askQuestion}
          >
            Ask AI
          </button>

          <button
            className="dangerBtn"
            onClick={clearChat}
          >
            🗑 Clear Chat
          </button>

        </div>

        {loading && (

          <div className="loading">

            🤖 AI is analyzing your document...

          </div>

        )}
                {/* Chat History */}

        <div className="chatContainer">

          {chatHistory.length === 0 ? (

            <div className="emptyChat">

              <h3>💬 No Conversation Yet</h3>

              <p>Upload a PDF and ask questions like:</p>

              <ul>
                <li>📌 Summarize the document</li>
                <li>📌 Explain Question 5</li>
                <li>📌 Give Python code</li>
                <li>📌 What are the important topics?</li>
              </ul>

            </div>

          ) : (

            chatHistory.map((chat, index) => (

              <div
                className="chatCard"
                key={index}
              >

                <div className="userMessage">

                  <h3>👤 You</h3>

                  <p>{chat.question}</p>

                </div>

                <div className="aiMessage">

                  <div className="answerHeader">

                    <h3>🤖 AI Assistant</h3>

                    <button
                      className="copyBtn"
                      onClick={() => copyAnswer(chat.answer)}
                    >
                      📋 Copy
                    </button>

                  </div>

                  <div className="answer">

                    {chat.answer}

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      {/* Footer */}

      <footer className="footer">

        <p>

          🚀 Powered by React • FastAPI • Gemini • FAISS

        </p>

      </footer>

    </div>
  );
}

export default App;