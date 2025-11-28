'use client';
import { useState, useEffect } from 'react';
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">Prompt Library</h1>
        <p className="text-lg text-gray-700 mb-6">
          A simple, structured space to store, organize, version, and reuse your AI prompts. Built with React, Node.js, Supabase, and vibe coding.
        </p>

        <a
          href="/library"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
        >
          Open Prompt Library
        </a>

        <div className="mt-10 text-gray-600 text-sm">
          <p>Built by Sunil Patel • Powered by Vibe Coding + GenAI</p>
        </div>
      </div>
    </div>
  );
}
