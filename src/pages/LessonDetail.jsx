import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function LessonDetail() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/lesson/${id}`)
      .then(res => res.json())
      .then(data => setLesson(data));
  }, [id]);

  if (!lesson) return <div className="flex justify-center items-center min-h-[40vh]"><span className="loader animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></span></div>;

  return (
    <div className="p-8 min-h-screen flex justify-center items-start bg-gradient-to-br from-blue-50/40 via-white/60 to-purple-50/40 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="w-full max-w-3xl mx-auto rounded-2xl shadow-xl bg-white/90 dark:bg-gray-900/90 p-8 dark:text-white">
        {lesson.image && (
          <img src={lesson.image} alt={lesson.title} className="mb-6 rounded-xl max-h-64 w-full object-contain bg-white dark:bg-gray-800" onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400?text=No+Image'; }} />
        )}
        {lesson.video && lesson.video.includes('youtube.com') && (
          <div className="mb-6 aspect-video w-full rounded-xl overflow-hidden">
            <iframe
              src={lesson.video.replace('watch?v=', 'embed/')}
              title="Video bài học"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        )}
        <h2 className="text-3xl font-extrabold mb-6 text-blue-700 dark:text-purple-300">{lesson.title}</h2>
        <div
          className="prose prose-blue dark:prose-invert prose-h1:text-blue-700 dark:prose-h1:text-purple-300 prose-h2:text-blue-600 dark:prose-h2:text-blue-200 prose-p:text-gray-800 dark:prose-p:text-white prose-li:text-gray-800 dark:prose-li:text-white prose-table:text-gray-800 dark:prose-table:text-white prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:text-gray-800 dark:prose-th:text-white prose-td:bg-white dark:prose-td:bg-gray-900 prose-td:text-gray-800 dark:prose-td:text-white prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:px-4 prose-pre:py-3 prose-pre:rounded-lg prose-pre:text-base prose-pre:text-black prose-code:text-black dark:prose-pre:text-white dark:prose-code:text-white dark:prose-pre:!opacity-100 dark:prose-code:!opacity-100"
          style={{ '--tw-prose-pre-code': '#fff', '--tw-prose-code': '#fff', color: undefined }}
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />
      </div>
    </div>
  );
}
