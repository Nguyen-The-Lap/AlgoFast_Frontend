import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Lessons from './pages/Lessons';
import Exercises from './pages/Exercises';
import ExerciseDetail from './pages/ExerciseDetail';
import ThemeToggle from './components/ThemeToggle';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import CodeEditorPage from './pages/Editor';
import { UserContext } from "./context/UserContext";
import LessonDetail from './pages/LessonDetail';
import SearchResults from './pages/SearchResults';
import AdminPanel from './pages/AdminPanel';
import Chat from './pages/Chat';
import LeaderboardProgress from './pages/LeaderboardProgress';

export default function App() {
  const [search, setSearch] = useState('');
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra đăng nhập khi load app
  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(user => {
        if (user) {
          setUser(user);
          if (location.pathname === "/login" || location.pathname === "/register") {
            navigate("/");
          }
        }
      })
      .catch(() => {
        setUser(null);
      });
  }, [location.pathname, setUser, navigate]);
  

  return (
    <div className="min-h-screen flex overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 font-sans transition">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4 w-full">
            <Link to="/" className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent select-none whitespace-nowrap">
              AlgoFast
            </Link>
            {/* Search Bar */}
            <form className="flex-1 mx-6" onSubmit={e => { e.preventDefault(); if (search.trim()) navigate(`/search?query=${encodeURIComponent(search)}`); }}>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </form>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lessons/:id" element={<LessonDetail />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/exercises/:id" element={<ExerciseDetail />} />
            <Route path="/editor" element={<CodeEditorPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/leaderboard-progress" element={<LeaderboardProgress />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}
