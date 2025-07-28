import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineHome, HiOutlineBookOpen, HiOutlineClipboardDocumentList, HiOutlineTrophy, HiOutlineKey, HiOutlinePencilSquare, HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineCodeBracket, HiOutlineChatBubbleLeftRight, HiOutlineBars3, HiOutlineXMark, HiOutlineCog6Tooth } from 'react-icons/hi2';
import { UserContext } from '../context/UserContext';

// CHỈ để các tab luôn hiển thị ở đây (KHÔNG để Login/Register ở navLinks)
const navLinks = [
  { to: '/', label: 'Home', icon: <HiOutlineHome size={24} /> },
  { to: '/lessons', label: 'Lessons', icon: <HiOutlineBookOpen size={24} /> },
  { to: '/exercises', label: 'Exercises', icon: <HiOutlineClipboardDocumentList size={24} /> },
  { to: '/editor', label: 'Editor', icon: <HiOutlineCodeBracket size={24} /> },
  { to: '/chat', label: 'Chat', icon: <HiOutlineChatBubbleLeftRight size={24} /> },
  { to: '/leaderboard-progress', label: 'Progress', icon: <HiOutlineTrophy size={24} /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(window.innerWidth >= 768);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(user => {
        setUser(user || null);
      })
      .catch(() => {
        setUser(null);
      });
  }, [setUser]);
  

  const isCollapsed = !open;

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-white dark:bg-gray-800 shadow"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        <span className="text-2xl">
          {mobileOpen ? <HiOutlineXMark size={24} /> : <HiOutlineBars3 size={24} />}
        </span>
      </button>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen ${open ? 'w-48' : 'w-14'} bg-white dark:bg-gray-900 shadow-lg z-40 transform transition-all duration-200
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block md:fixed md:h-screen`}
        style={{ minHeight: '100vh' }}
      >
        <div className="flex flex-col h-full p-3 gap-4 overflow-hidden">
          {/* Collapse/Expand button inside sidebar (chỉ hiện trên desktop) */}
          <button
            className={`mb-4 p-2 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition self-end hidden md:block ${open ? '' : 'mx-auto'}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <span className="text-xl">
              {open ? <HiOutlineChevronLeft size={22} /> : <HiOutlineChevronRight size={22} />}
            </span>
          </button>
          <nav className="flex flex-col gap-2 flex-1 mt-2">
            {/* Render các tab luôn hiển thị */}
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium text-base
                  ${location.pathname === link.to ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}
                  ${isCollapsed ? 'justify-center px-0' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="text-xl">{link.icon}</span> {!isCollapsed && <span>{link.label}</span>}
              </Link>
            ))}
            {/* Chỉ render Login/Register khi chưa đăng nhập */}
            {!user && (
              <>
                <Link
                  to="/login"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium text-base
                    ${location.pathname === '/login' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}
                    ${isCollapsed ? 'justify-center px-0' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-xl"><HiOutlineKey size={24} /></span> {!isCollapsed && <span>Login</span>}
                </Link>
                <Link
                  to="/register"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium text-base
                    ${location.pathname === '/register' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}
                    ${isCollapsed ? 'justify-center px-0' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-xl"><HiOutlinePencilSquare size={24} /></span> {!isCollapsed && <span>Register</span>}
                </Link>
              </>
            )}
            {user && user.username === "lerp245" && (
              <Link
                to="/admin"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium text-base
                  ${location.pathname === '/admin' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}
                  ${isCollapsed ? 'justify-center px-0' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="text-xl"><HiOutlineCog6Tooth size={24} /></span> {!isCollapsed && <span>Admin</span>}
              </Link>
            )}
          </nav>
          {/* Nút Đăng xuất */}
          {user && (
            <button
              onClick={async () => {
                await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
                window.location.href = '/login';
              }}
              className={`mt-4 px-3 py-2 rounded-lg bg-red-100 text-red-700 font-bold hover:bg-red-200 transition ${isCollapsed ? 'justify-center px-0 w-full' : ''}`}
            >
              {!isCollapsed && 'Đăng xuất'}
              {isCollapsed && <span className="text-xl"></span>}
            </button>
          )}
        </div>
      </aside>
      {/* Overlay for mobile */}
      {mobileOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden" onClick={() => setMobileOpen(false)}></div>}
    </>
  );
} 