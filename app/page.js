'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function HomePage() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const isLoggedIn = !!session;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-600 mb-4">Welcome to Prompt Library</h1>
        
        <p className="text-lg text-gray-700 mb-6">
          Your centralized hub for building, storing, and managing AI prompts.<br />
          Whether you are experimenting, refining, or building production workflows, Prompt Library helps you keep everything organized and versioned, so you never lose track of your best ideas.<br />
          Add new prompts, revisit older versions, and browse your prompt collection - all in one simple interface.
        </p>

        {!isLoading && !isLoggedIn && (
          <p className="text-red-600 font-semibold mb-4">
            You need to <Link href="/"><span className="underline">login</span></Link> to create new prompts or update an existing.
          </p>
        )}

        {isLoggedIn && (
          <p className="text-green-600 font-semibold mb-4">
            Welcome back, {session.user.name}! You can start creating new prompts.
          </p>
        )}

        <a 
          href={isLoggedIn ? "/library" : "#"} 
          className={`inline-block px-6 py-3 rounded-xl shadow transition 
            ${isLoggedIn ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
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

