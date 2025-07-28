import React, { useEffect, useState } from "react";

export default function LeaderboardProgress() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://algofast-backend.onrender.com/api/leaderboard/progress")
      .then(res => res.json())
      .then(data => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-extrabold mb-8 text-blue-500 drop-shadow-lg text-center">🏆 Bảng xếp hạng</h2>
      <div className="overflow-x-auto rounded-2xl shadow-2xl bg-white/90 dark:bg-gray-900/90">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Số bài đã học</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">Đang tải...</td>
              </tr>
            ) : !Array.isArray(users) || users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">Không có dữ liệu.</td>
              </tr>
            ) : (
              users.map((u, idx) => (
                <tr
                  key={u.email}
                  className={
                    idx === 0
                      ? "bg-yellow-100 dark:bg-yellow-900 font-bold"
                      : idx === 1
                      ? "bg-gray-200 dark:bg-gray-800 font-semibold"
                      : idx === 2
                      ? "bg-orange-100 dark:bg-orange-900 font-semibold"
                      : ""
                  }
                >
                  <td className="px-4 py-3 text-center text-lg">
                    {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : idx + 1}
                  </td>
                  <td className="px-4 py-3 text-blue-700 dark:text-blue-300">{u.username}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-200">{u.email}</td>
                  <td className="px-4 py-3 text-center font-extrabold text-2xl text-blue-600 dark:text-blue-400">
                    {u.progressCount}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
