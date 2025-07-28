import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Hàm loại bỏ dấu tiếng Việt và chuyển về lowercase
function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function SearchResults() {
  const query = useQuery().get("query") || "";
  const [results, setResults] = useState({ lessons: [], exercises: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    Promise.all([
      fetch(`/api/lesson?search=${encodeURIComponent(query)}`).then(res => res.json()),
      fetch(`/api/exercise?search=${encodeURIComponent(query)}`).then(res => res.json())
    ]).then(([lessons, exercises]) => {
      setResults({ lessons, exercises });
      setLoading(false);
    });
  }, [query]);

  const normalizedQuery = normalize(query);

  const filteredLessons = !normalizedQuery
    ? results.lessons
    : results.lessons.filter(lesson =>
        normalize(lesson.title).includes(normalizedQuery) ||
        (lesson.description && normalize(lesson.description).includes(normalizedQuery))
      );

  const filteredExercises = !normalizedQuery
    ? results.exercises
    : results.exercises.filter(ex =>
        normalize(ex.title).includes(normalizedQuery) ||
        (ex.description && normalize(ex.description).includes(normalizedQuery))
      );

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-extrabold mb-8 text-gray-900 dark:text-white">
        Kết quả tìm kiếm cho: <span className="text-blue-500">"{query}"</span>
      </h2>
      {loading && <div>Đang tìm kiếm...</div>}
      {!loading && (
        <div className="space-y-10">
          <div>
            <h3 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-300">Bài học</h3>
            {filteredLessons.length === 0 ? (
              <div className="text-gray-500 dark:text-gray-400">Không có bài học phù hợp.</div>
            ) : (
              <ul className="space-y-1">
                {filteredLessons.map((lesson, idx) => (
                  <li key={lesson._id} className="flex items-center gap-2">
                    <span className="text-blue-400 font-bold">{idx + 1}.</span>
                    <Link
                      to={`/lessons/${lesson._id}`}
                      className="hover:underline text-blue-700 dark:text-blue-300 transition"
                    >
                      {lesson.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3 text-purple-700 dark:text-purple-300">Bài tập</h3>
            {filteredExercises.length === 0 ? (
              <div className="text-gray-500 dark:text-gray-400">Không có bài tập phù hợp.</div>
            ) : (
              <ul className="space-y-1">
                {filteredExercises.map((ex, idx) => (
                  <li key={ex._id} className="flex items-center gap-2">
                    <span className="text-purple-400 font-bold">{idx + 1}.</span>
                    <Link
                      to={`/exercises/${ex._id}`}
                      className="hover:underline text-purple-700 dark:text-purple-300 transition"
                    >
                      {ex.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 