import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";

const API_BASE = "https://algofast-backend.onrender.com";

export default function Chat() {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/chat`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ text })
    });
    if (res.ok) {
      const msg = await res.json();
      setMessages([...messages, msg]);
      setText("");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-extrabold mb-6 text-blue-500 flex items-center gap-2">
        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l.8-3.2A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        Chat chung
      </h2>
      <div className="bg-gray-800 rounded-2xl p-6 h-[400px] overflow-y-auto mb-4 shadow-2xl flex flex-col gap-3">
        {messages.length === 0 && <div className="text-gray-400">Chưa có tin nhắn nào.</div>}
        {messages.map((msg, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="font-bold text-blue-400">
              {msg.username || "Ẩn danh"}:
              <span className="ml-2 font-normal text-white">{msg.text}</span>
            </span>
            <span className="text-xs text-gray-400 ml-2">{new Date(msg.createdAt).toLocaleString()}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-1 px-4 py-3 rounded-2xl bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-blue-400 outline-none shadow"
          placeholder="Nhập tin nhắn..."
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-2xl font-bold shadow transition"
          disabled={loading}
        >
          Gửi
        </button>
      </form>
    </div>
  );
}
