import React, { useState } from "react";

export default function CodeEditorPage() {
  const [mode, setMode] = useState("cpp");

  return (
    <section className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-blue-50/40 via-white/60 to-purple-50/40 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-8">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8">
        <h2 className="text-3xl font-extrabold text-blue-700 dark:text-blue-300 mb-6">Online Editor</h2>
        <div className="mb-6">
          <label className="font-medium text-gray-700 dark:text-gray-200 mr-4">Languages:</label>
          <select
            value={mode}
            onChange={e => setMode(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>
        <div className="w-full h-[700px] rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <iframe
            src={
              mode === "cpp"
                ? "https://ide.usaco.guide/OVZMewRypDKlo8vJUmc"
                : mode === "python"
                ? "https://ide.usaco.guide/OVZNf_wbmWSUfCqwBTk"
                : "https://ide.usaco.guide/OVZO7iQSLMDTBqbN3iT"
            }
            title={mode === "cpp" ? "C++" : mode === "python" ? "Python" : "Java"}
            width="100%"
            height="700"
            frameBorder="0"
            allow="clipboard-write"
            className="w-full h-full"
            style={{ minHeight: 700, borderRadius: 12, background: "#fff" }}
          />
        </div>
      </div>
    </section>
  );
}
