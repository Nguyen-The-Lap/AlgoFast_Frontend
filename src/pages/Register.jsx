import React, { useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!validateEmail(form.email)) {
      setEmailError("Email không hợp lệ");
      return;
    }
    setEmailError("");
    try {
      await axios.post('/api/auth/register', { username: form.username, email: form.email, password: form.password });
      setSuccess('Đăng ký thành công! Hãy đăng nhập.');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 font-sans transition">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Đăng ký</h2>
        {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
        {success && <div className="text-green-600 mb-2 text-center">{success}</div>}
        {emailError && <div className="mb-2 text-red-500 text-center">{emailError}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            icon={<UserIcon className="w-5 h-5 text-gray-400" />}
            type="text"
            name="username"
            placeholder="Tên đăng nhập"
            value={form.username}
            onChange={handleChange}
          />
          <Input
            icon={<EnvelopeIcon className="w-5 h-5 text-gray-400" />}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            icon={<LockClosedIcon className="w-5 h-5 text-gray-400" />}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            rightIcon={
              <span
                className="cursor-pointer text-gray-400 hover:text-blue-500"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={0}
              >
                {showPassword ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
              </span>
            }
          />
          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 transition text-lg"
          >
            Đăng ký
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function Input({ icon, rightIcon, ...props }) {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-3">{icon}</span>
      <input
        {...props}
        className="w-full pl-10 pr-10 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none transition placeholder-gray-400 dark:placeholder-gray-500"
      />
      {rightIcon && <span className="absolute right-3">{rightIcon}</span>}
    </div>
  );
} 