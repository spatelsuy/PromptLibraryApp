'use client';
import { useState, useEffect } from 'react';
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-600 mb-4">Welcome to Prompt Librar</h1>
        <p className="text-lg text-gray-700 mb-6">your centralized hub for building, storing, and managing AI prompts. 
        Whether you are experimenting, refining, or building production workflows, Prompt Library helps you keep everything organized and versioned, so you never lose track of your best ideas. 
        Add new prompts, revisit older versions, and browse your growing prompt collection - all in one simple interface.
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
