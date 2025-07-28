import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4 mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
      <div className="flex flex-col md:flex-row justify-center items-center gap-2">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">GitHub</a>
        <a href="https://about.google/" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">About</a>
        <a href="/privacy" className="hover:underline mx-2">Privacy</a>
        <a href="/terms" className="hover:underline mx-2">Terms</a>
      </div>
      <div className="mt-2">&copy; {new Date().getFullYear()} Algorithm Learning. All rights reserved.</div>
    </footer>
  );
} 