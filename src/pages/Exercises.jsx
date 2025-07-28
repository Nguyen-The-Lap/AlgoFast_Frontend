import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DIFFICULTY_COLOR = {
  easy: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200",
  medium: "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200",
  hard: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200"
};

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("https://algofast-backend.onrender.com/api/exercise") // ✅ fixed endpoint
      .then((res) => setExercises(res.data))
      .catch((err) => console.error("Fetch error:", err)) // ✅ optional error handling
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[40vh]">
      <span className="loader animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></span>
    </div>
  );

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-blue-700 dark:text-blue-300">
        <RocketLaunchIcon className="w-8 h-8" /> Danh sách bài tập
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exercises.map((ex) => (
          <motion.div
            key={ex._id} // ✅ fixed key
            whileHover={{ y: -4, scale: 1.02, boxShadow: "0 8px 32px 0 rgba(31, 41, 55, 0.10)" }}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 transition"
          >
            <Link to={`/exercises/${ex._id}`} className="font-semibold text-blue-700 dark:text-blue-300 text-lg mb-1 hover:underline">
              {ex.title}
            </Link>
            <div className="text-gray-600 dark:text-gray-200 mb-2">{ex.description}</div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${DIFFICULTY_COLOR[ex.difficulty] || "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}>
              {ex.difficulty === "easy" && "Dễ"}
              {ex.difficulty === "medium" && "Trung bình"}
              {ex.difficulty === "hard" && "Khó"}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
