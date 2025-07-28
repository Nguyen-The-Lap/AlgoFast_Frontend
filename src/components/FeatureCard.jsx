import { motion } from "framer-motion";

export default function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03, boxShadow: "0 8px 32px 0 rgba(31, 41, 55, 0.12)" }}
      className="flex flex-col items-center bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-md p-6 gap-4 border border-gray-100 dark:border-gray-800 transition"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl shadow">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-center">{desc}</p>
    </motion.div>
  );
}
