import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const API_BASE = "https://algofast-backend.onrender.com";

export default function AdminPanel() {
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState({ total: "-", admin: "-", student: "-" });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    // Lấy thống kê tổng quan
    fetch(`${API_BASE}/api/admin/user-stats`, { credentials: "include" })
      .then(res => {
        if (res.status === 403) {
          setForbidden(true);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) setStats(data);
      })
      .catch(() => setStats({ total: "-", admin: "-", student: "-" }));

    // Lấy danh sách user
    fetch(`${API_BASE}/api/admin/users`, { credentials: "include" })
      .then(res => {
        if (res.status === 403) {
          setForbidden(true);
          return null;
        }
        return res.json();
      })
      .then(data => {
        // Nếu backend trả về mảng
        if (data && Array.isArray(data)) setUsers(data);
        // Nếu backend trả về object có key users
        else if (data && Array.isArray(data.users)) setUsers(data.users);
        else setUsers([]);
      })
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  if (forbidden) {
    return <div className="text-center text-red-600 font-bold text-xl py-20">Bạn không có quyền truy cập trang này.</div>;
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
    const res = await fetch(`${API_BASE}/api/users/${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) {
      // Xóa thành công, cập nhật lại danh sách user
      setUsers(users.filter(u => u._id !== id));
    } else {
      alert("Xóa thất bại!");
    }
  };

  const handleChangeRole = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "student" : "admin";
    if (!window.confirm(`Bạn có chắc muốn đổi role thành ${newRole}?`)) return;
    const res = await fetch(`${API_BASE}/api/admin/users/${id}/role`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ role: newRole }),
    });
    if (res.ok) {
      // Cập nhật lại danh sách user
      setUsers(users.map(u => u._id === id ? { ...u, role: newRole } : u));
    } else {
      alert("Đổi role thất bại!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-extrabold mb-10 text-blue-500 dark:text-blue-300 drop-shadow-lg">Admin Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Card Thống kê tổng quan */}
        <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-200">Thống kê tổng quan</h3>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between text-lg font-medium text-black dark:text-white">
              <span>Tổng số user:</span> <span className="font-bold text-blue-600">{stats.total}</span>
            </div>
            <div className="flex justify-between text-lg font-medium text-black dark:text-white">
              <span>Admin:</span> <span className="font-bold text-purple-600">{stats.admin}</span>
            </div>
            <div className="flex justify-between text-lg font-medium text-black dark:text-white">
              <span>Student:</span> <span className="font-bold text-green-600">{stats.student}</span>
            </div>
          </div>
          <div className="mt-4 text-gray-400 text-sm">(Sẽ cập nhật khi có API)</div>
        </div>
        {/* Card Hướng dẫn quản trị */}
        <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-200">Hướng dẫn quản trị</h3>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 text-base space-y-2 w-full">
            <li>Xem, quản lý user (sẽ cập nhật)</li>
            <li>Xóa user (sẽ cập nhật)</li>
            <li>Xem thống kê hệ thống</li>
            <li>Chỉ admin mới truy cập được trang này</li>
          </ul>
        </div>
      </div>
      {/* Bảng danh sách user (placeholder) */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mt-8 overflow-x-auto">
        <h3 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-200">Danh sách user</h3>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400">Đang tải...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400">Không có user nào.</td>
              </tr>
            ) : (
              users.map(u => (
                <tr key={u._id}>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-200">{u.username}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-200">{u.email}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                    {u.role}
                    <button
                      className="ml-2 px-2 py-1 rounded bg-blue-500 text-white text-xs hover:bg-blue-600"
                      onClick={() => handleChangeRole(u._id, u.role)}
                      disabled={u._id === user._id}
                      title="Đổi role"
                    >
                      Đổi role
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600" onClick={() => handleDelete(u._id)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="text-gray-400 text-sm mt-4">Chức năng quản lý user sẽ hiển thị khi có API.</div>
      </div>
    </div>
  );
}