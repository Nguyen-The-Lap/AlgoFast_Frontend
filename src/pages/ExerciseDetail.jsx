import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import MonacoEditor from '@monaco-editor/react';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'cpp', label: 'C++' },
];

const DEFAULT_CODE = {
  javascript: "// Viết code tại đây",
  python: "# Viết code tại đây",
  cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Viết code tại đây\n    return 0;\n}",
};

const ExerciseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [code, setCode] = useState(DEFAULT_CODE['javascript']);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('javascript');
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    setCode(DEFAULT_CODE[language]);
  }, [language]);

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(user => {
        if (user) setUser(user);
        else setUser(null);
      });
  }, [navigate]);

  useEffect(() => {
    const fetchExercise = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/exercise/${id}`);
        if (!res.ok) throw new Error('Không tìm thấy bài tập');
        const data = await res.json();
        setExercise(data);
      } catch (err) {
        // error handling if needed
      }
      setLoading(false);
    };
    fetchExercise();
  }, [id]);

  useEffect(() => {
    fetch(`https://algofast-backend.onrender.com/api/exercise/${id}/comments`)
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(() => setComments([]));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentLoading(true);
    const res = await fetch(`/api/exercise/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ text: commentText })
    });
    if (res.ok) {
      const newComment = await res.json();
      setComments([newComment, ...comments]);
      setCommentText("");
    }
    setCommentLoading(false);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[40vh]">
      <span className="loader animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></span>
    </div>
  );

  if (!exercise) return <div className="text-center mt-10 text-white">Không có dữ liệu bài tập</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 text-white">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-blue-400 tracking-tight">
        {exercise?.title}
      </h1>
      <div className="mb-4 text-lg">{exercise?.description}</div>
      <div className="mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold
          text-white"
          style={{
            background: exercise?.difficulty === 'easy'
              ? 'linear-gradient(to right, #34d399, #059669)'
              : exercise?.difficulty === 'medium'
              ? 'linear-gradient(to right, #fbbf24, #f59e42)'
              : 'linear-gradient(to right, #f87171, #b91c1c)'
          }}
        >
          {exercise?.difficulty === 'easy' ? 'Dễ' : exercise?.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
        </span>
      </div>
      <div className="mb-8">
        <span className="font-semibold text-base">Test case mẫu</span>
        <ul className="mt-2 space-y-2">
          {(exercise?.testCases || []).filter(tc => tc.is_sample).map((tc, idx) => (
            <li key={idx} className="bg-gray-800 rounded-lg px-4 py-2 flex flex-col md:flex-row md:items-center gap-2">
              <span className="text-blue-400 font-semibold">Input:</span>
              <code className="bg-gray-900 px-2 py-1 rounded text-white">{tc.input}</code>
              <span className="text-green-400 font-semibold">Output:</span>
              <code className="bg-gray-900 px-2 py-1 rounded text-white">{tc.expected_output}</code>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <label className="font-semibold">Ngôn ngữ</label>
        <select value={language} onChange={e => setLanguage(e.target.value)}
          className="border rounded px-2 py-1 bg-gray-800 border-gray-700 text-white"
        >
          {LANGUAGES.map(lang => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
      </div>
      <div className="mb-2 rounded-lg border border-gray-700 overflow-hidden shadow">
        <MonacoEditor
          height="250px"
          language={language === "cpp" ? "cpp" : language}
          value={code}
          onChange={value => setCode(value)}
          theme="vs-dark"
          options={{ fontSize: 16 }}
        />
      </div>
      {/* Bình luận */}
      <div className="mt-10 bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 text-blue-300">Bình luận</h3>
        <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            className="flex-1 px-3 py-2 rounded bg-gray-900 text-white border border-gray-700"
            placeholder="Nhập bình luận..."
            disabled={commentLoading}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-bold"
            disabled={commentLoading}
          >
            Gửi
          </button>
        </form>
        <div className="space-y-3">
          {comments.length === 0 && <div className="text-gray-400">Chưa có bình luận nào.</div>}
          {comments.map((c, idx) => (
            <div key={idx} className="bg-gray-900 rounded p-3">
              <div className="font-semibold text-blue-400">{c.username || "Ẩn danh"}</div>
              <div className="text-white">{c.text}</div>
              <div className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
