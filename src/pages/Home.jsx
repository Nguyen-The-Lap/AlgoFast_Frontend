import { BookOpenIcon, RocketLaunchIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import FeatureCard from "../components/FeatureCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const features = [
  {
    icon: <BookOpenIcon className="w-7 h-7" />,
    title: "Bài học lý thuyết",
    desc: "Nắm vững kiến thức thuật toán qua các bài học trực quan, dễ hiểu, cập nhật liên tục.",
  },
  {
    icon: <RocketLaunchIcon className="w-7 h-7" />,
    title: "Thực hành bài tập",
    desc: "Luyện tập với hệ thống chấm điểm tự động, test case thực tế, giao diện code editor hiện đại.",
  },
  {
    icon: <TrophyIcon className="w-7 h-7" />,
    title: "Bảng xếp hạng",
    desc: "So tài cùng bạn bè, leo top bảng xếp hạng, nhận badge thành tích và phần thưởng hấp dẫn.",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleStart = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/auth/me', { credentials: 'include' });
      navigate('/lessons');
    } catch {
      navigate('/login');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-12 px-4 md:py-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Học & Luyện Thuật Toán <br className="hidden md:block" /> Đỉnh Cao
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
        >
          Nền tảng học thuật toán thế hệ mới, giao diện tối giản, trải nghiệm mượt mà, hỗ trợ dark mode, mobile-first.
        </motion.p>
        {/* <form className="w-full max-w-md mx-auto mb-6" onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm kiếm bài học, bài tập..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </form> */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="inline-block px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-md hover:from-blue-600 hover:to-purple-600 transition text-lg"
          onClick={handleStart}
        >
          Bắt đầu ngay
        </motion.button>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 pb-16">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-gray-100 dark:border-gray-800 py-6 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 px-6 text-sm text-gray-400 dark:text-gray-500">
        <span>© {new Date().getFullYear()} Algorithm Learning. All rights reserved.</span>
        <span>
          Inspired by <a href="https://linear.app" className="underline hover:text-blue-500">Linear</a>,{" "}
          <a href="https://vercel.com" className="underline hover:text-blue-500">Vercel</a>,{" "}
          <a href="https://notion.so" className="underline hover:text-blue-500">Notion</a>
        </span>
      </footer>
    </div>
  );
} 