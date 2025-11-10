'use client';

import { useState } from 'react';

export default function NewPrompt() {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('');
  const [prompt, setPrompt] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoadingSavePrompt] = useState(false);
  const [loadingImprovement, setLoadingImprovement] = useState(false);
  const [loadingTestPrompt, setLoadingTestPrompt] = useState(false);
  const [improvedData, setImprovedData] = useState(null);

  const handleImprovePrompt = async () => {
    if (!prompt.trim()) return;
    
    setLoadingImprovement(true);
    setImprovedData(null);
    
    try {
      const response = await fetch('/api/improve-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic,
          prompt: prompt
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to improve prompt');
      }

      const data = await response.json();
      setImprovedData(data);
      
    } catch (error) {
      console.error('Error improving prompt:', error);
      alert('Failed to improve prompt. Please try again.');
    } finally {
      setLoadingImprovement(false);
    }
  };

  const handleUseImprovedPrompt = () => {
    if (improvedData?.improvedPrompt) {
      setPrompt(improvedData.improvedPrompt);
      setImprovedData(null); // Hide the improvement section after use
    }
  };

  const handleTestPrompt = async () => {
    if (!prompt.trim()) return;
    
    setLoadingTestPrompt(true);
    try {
      // TODO: Implement test prompt logic
      console.log('Testing prompt:', prompt);
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Test prompt feature will be implemented in next step!');
    } catch (error) {
      console.error('Error testing prompt:', error);
    } finally {
      setLoadingTestPrompt(false);
    }
  };

  const handleSavePrompt = async () => {
    if (!topic.trim() || !prompt.trim()) {
      alert('Please fill in both topic and prompt fields');
      return;
    }
    
    setLoadingSavePrompt(true);
    try {
      // Call the backend API to save the prompt
      const response = await fetch('https://promptdbservice.onrender.com/api/db/saveNewPrompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: category,
          title: topic,
          content: prompt,
          description: description || `Prompt about ${topic}`,
          created_by: 'user',
          metadata: {
            topic: topic,
            category: category,
            tags: []
          }
        }),
      });	
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save prompt');
      }

      const result = await response.json();
      
      // Success! Show message and reset form
      alert('Prompt saved successfully!');
      console.log('Prompt saved:', result.prompt);
      
      // Reset the form
      setTopic('');
      setPrompt('');
      setImprovedData(null);
      
      // Optional: Redirect to prompts list or show success message
      // window.location.href = '/'; // Uncomment to redirect to main page

    } catch (error) {
      console.error('Error saving prompt:', error);
      alert(`Failed to save prompt: ${error.message}`);
    } finally {
      setLoadingSavePrompt(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Prompt
          </h1>
          <p className="text-gray-600">
            Create, improve, and test your AI prompts before saving
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
		
          {/* Category Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <input 
              type="text" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter a category for your prompt (e.g., Machine Learning, Resume Writing, etc.)"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-900"
            />
          </div>
          
          {/* Topic Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Topic *</label>
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic for your prompt (e.g., Machine Learning, Resume Writing, etc.)"
              className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-900"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Character count: {description.length})
            </label> 
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your prompt description here..."
              rows="2"
              className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400 text-gray-900"
            />
          </div>

          {/* Prompt Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prompt * (Character count: {prompt.length})
            </label> 
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here... (e.g., Explain machine learning to a beginner in simple terms)"
              rows="4"
              className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400 text-gray-900"
            />
          </div>

          {/* Improved Prompt Section */}
          {improvedData && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-3">
                Improved Prompt
              </h3>
              <div className="bg-white rounded p-4 border mb-3">
                <p className="text-gray-800 whitespace-pre-wrap">
                  {improvedData.improvedPrompt}
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-green-700 mb-2">Improvements Made:</h4>
                <div className="flex flex-wrap gap-2">
                  {improvedData.suggestions.map((suggestion, index) => (
                    <span 
                      key={index} 
                      className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full"
                    >
                      {suggestion}
                    </span>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={handleUseImprovedPrompt}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Use This Improved Prompt
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleImprovePrompt}
              disabled={loadingImprovement || !prompt.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center"
            >
              {loadingImprovement ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Improving...
                </>
              ) : (
                'Improve the Prompt'
              )}
            </button>
            
            <button
              onClick={handleTestPrompt}
              disabled={loadingTestPrompt || !prompt.trim()}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              {loadingTestPrompt ? 'Testing...' : 'Test Prompt in Free Gen API'}
            </button>
            
            <button
              onClick={handleSavePrompt}
              disabled={loading || !topic.trim() || !prompt.trim()}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              {loading ? 'Saving...' : 'Save Prompt'}
            </button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            💡 Tips for Better Prompts
          </h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• <strong>Be specific:</strong> Instead of &quot;Explain AI&quot;, try &quot;Explain artificial intelligence to a 10-year-old using simple analogies&quot;</li>
            <li>• <strong>Provide context:</strong> Mention the audience, purpose, and desired format</li>
            <li>• <strong>Set constraints:</strong> Specify length, style, or any limitations</li>
            <li>• <strong>Use examples:</strong> Show what kind of response you&apos;re looking for</li>
            <li>• <strong>Iterate:</strong> Use the &quot;Improve&quot; button to refine your prompt</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
