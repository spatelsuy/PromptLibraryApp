'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function SettingsPage() {
  const { data: session } = useSession();
  const isLoggedIn = true;
  const [apiUrl, setApiUrl] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  
  const handleSave = async () => {
    if (!isLoggedIn) {
      setStatusMessage('You need to login to save settings.');
      return;
    }
    if(!session){
      setStatusMessage("Please login");
      return;
    }		
    try {
      const res = await fetch('https://promptdbservice.onrender.com/api/ai/saveSettings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.idToken}` // send ID token for backend auth
            },
        body: JSON.stringify({ apiUrl }),
      });
      if (res.ok) {
        setStatusMessage('API URL saved successfully!');
      } else {
        const errorData = await res.json();
        setStatusMessage(`Error: ${errorData.error || 'Failed to save URL'}`);
      }
    } catch (err) {
      setStatusMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">API Configuration</h3>
            <p className="text-gray-600 mb-4">Configure your API endpoints and authentication settings.</p>

            <input type="text" placeholder="Enter API URL" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)}
              className="w-full border border-gray-300 text-gray-700 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

            <button onClick={handleSave} disabled={!isLoggedIn} className={`px-6 py-2 rounded-md text-white font-semibold transition 
                ${isLoggedIn ? 'bg-blue-700 hover:bg-blue-700' : 'bg-gray-900 cursor-not-allowed'}`}>Save</button>

            {statusMessage && (
              <p className="mt-4 text-sm text-gray-700">{statusMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
