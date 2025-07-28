import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineBookOpen } from "react-icons/hi2";

export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://algofast-backend.onrender.com/api/lesson")
      .then(res => res.json())
      .then(data => setLessons(data))
      .finally(() => setLoading(false));

    fetch("https://algofast-backend.onrender.com/api/user/progress", { credentials: "include" })
      .then(res => {
        if (!res.ok) return [];
        return res.json();
      })
      .then(data => setProgress(Array.isArray(data) ? data : []));
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-[40vh]"><span className="loader animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></span></div>;

  const handleToggleProgress = async (lessonId, checked) => {
    if (checked) {
      await fetch("https://algofast-backend.onrender.com/api/user/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ lessonId }),
      });
      setProgress([...progress, lessonId]);
    } else {
      await fetch(`https://algofast-backend.onrender.com/api/user/progress/${lessonId}`, {
        method: "DELETE",
        credentials: "include",
      });
      setProgress(progress.filter(id => id !== lessonId));
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50/40 via-white/60 to-purple-50/40 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <h2 className="text-3xl font-extrabold mb-8 text-blue-700 dark:text-blue-200 flex items-center gap-3">
        <HiOutlineBookOpen className="w-8 h-8 text-blue-500 dark:text-blue-300" />
        Danh sách bài học
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {lessons.map(lesson => (
          <div
            key={lesson._id}
            className={`relative group p-6 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-3xl hover:-translate-y-1 transition-all duration-200
    ${progress.includes(lesson._id) ? "ring-2 ring-blue-400 dark:ring-blue-600" : ""}
  `}
            onClick={() => navigate(`/lessons/${lesson._id}`)}
          >
            <div className="flex items-center gap-3 mb-2">
              {/* Custom checkbox */}
              <input
                type="checkbox"
                checked={Array.isArray(progress) && progress.includes(lesson._id)}
                onChange={e => handleToggleProgress(lesson._id, e.target.checked)}
                onClick={e => e.stopPropagation()}
                className="accent-blue-500 w-5 h-5 rounded-lg border-2 border-blue-300 dark:border-blue-700 focus:ring-2 focus:ring-blue-400 transition"
                style={{ boxShadow: progress.includes(lesson._id) ? "0 0 0 2px #3b82f6" : undefined }}
              />
              <span className={`font-bold text-lg group-hover:underline transition
      ${progress.includes(lesson._id) ? "text-blue-700 dark:text-blue-300" : "text-gray-900 dark:text-white"}
    `}>
                {lesson.title}
              </span>
            </div>
            <div className="text-gray-700 dark:text-gray-200 text-sm line-clamp-3 mb-3">
              {lesson.summary}
            </div>
            <div className="flex items-center gap-2 mt-2">
              {progress.includes(lesson._id) ? (
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                  <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Đã học
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium">
                  Chưa học
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 