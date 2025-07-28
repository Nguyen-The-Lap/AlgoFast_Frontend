import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    if (!validateEmail(email)) {
      setEmailError("Email không hợp lệ");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Đăng nhập thất bại");

      // Lấy lại user từ backend
      const userRes = await fetch("http://localhost:5000/api/auth/me", { credentials: "include" });
      if (userRes.ok) {
        const user = await userRes.json();
        setUser(user);
        navigate("/");
      } else {
        setError("Không lấy được thông tin user");
      }
    } catch {

    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md dark:text-white">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Đăng nhập</h2>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {emailError && <div className="mb-2 text-red-500 text-center">{emailError}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-semibold dark:text-white">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-6 relative">
          <label className="block mb-1 font-semibold dark:text-white">Mật khẩu</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border px-3 py-2 rounded pr-10 bg-blue-50"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 cursor-pointer text-gray-400 hover:text-blue-500"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={0}
            >
              {showPassword ? <HiOutlineEyeSlash size={22} /> : <HiOutlineEye size={22} />}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 mb-4"></div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 transition text-lg"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
