'use client';

import { useState, useEffect } from 'react';

export default function NewPrompt() {
	const [topic, setTopic] = useState('');
	const [category, setCategory] = useState('');
	const [prompt, setPrompt] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoadingSavePrompt] = useState(false);
	const [loadingImprovement, setLoadingImprovement] = useState(false);
	const [loadingTestPrompt, setLoadingTestPrompt] = useState(false);
	const [improvedData, setImprovedData] = useState(null);
	const [responseTestData, setResponseTestData] = useState(null);

	// New states for multi-provider testing
	const [showProviderSelection, setShowProviderSelection] = useState(false);
	const [selectedProviders, setSelectedProviders] = useState([]);
	const [testResults, setTestResults] = useState(null);
	const [loadingMultiTest, setLoadingMultiTest] = useState(false);

	const [availableProviders, setAvailableProviders] = useState([]);
	const [loadingProviders, setLoadingProviders] = useState(false);
  
	useEffect(() => {
		fetchProviders();
	},[]);
  
	// Add this function to fetch providers
	const fetchProviders = async () => {
	  setLoadingProviders(true);
	  try {
		  const response = await fetch('https://promptdbservice.onrender.com/api/db/getAllProviders');
		  const data = await response.json();
		if (data.success) {
		  setAvailableProviders(data.providers);
		} else {
		  console.error('Failed to fetch providers');
		  // Optional: fallback to hardcoded providers
		}
	  } catch (error) {
		console.error('Error fetching providers:', error);
	  } finally {
		  setLoadingProviders(false);
	  }
	};
	
	const handleImprovePrompt = async () => {
		if (!prompt.trim()) return;
		setLoadingImprovement(true);
		setImprovedData(null);
		try {
		const response = await fetch('https://promptdbservice.onrender.com/api/ai/format-prompt', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
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
		if (improvedData?.formattedPrompt) { 
		  setPrompt(improvedData.formattedPrompt);
		  setImprovedData(null);
		}
	};

	// New function to handle provider selection
	const handleProviderSelection = (providerId) => {
		setSelectedProviders(prev => {
		  if (prev.includes(providerId)) {
			// Remove if already selected
			return prev.filter(id => id !== providerId);
		  } else if (prev.length < 3) {
			// Add if less than 3 selected
			return [...prev, providerId];
		  }
		  return prev; // Max 3 reached
		});
	};

	// New function to test with multiple providers
	const handleMultiProviderTest = async () => {
		if (!prompt.trim() || selectedProviders.length === 0) return;
		
		setLoadingMultiTest(true);
		setTestResults(null);

		try {
		  const response = await fetch('https://promptdbservice.onrender.com/api/ai/test-with-multiple-providers', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  prompt: prompt,
			  providers: selectedProviders
			}),
		  });
		
		  if (!response.ok) {
			throw new Error('Failed to test with providers');
		  }
			
		  const data = await response.json();
		  setTestResults(data.results);
		  setShowProviderSelection(false);
		  
		} catch (error) {
		  console.error('Error testing with providers:', error);
		  alert('Failed to test with selected providers. Please try again.');
		} finally {
		  setLoadingMultiTest(false);
		}
	};

	const handleTestPrompt = async () => {
		if (!prompt.trim()) return;
		
		setLoadingTestPrompt(true);
		setResponseTestData(null);
		try {
		  const response = await fetch('https://promptdbservice.onrender.com/api/ai/generate', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  prompt: prompt
			}),
		  });
		
		  if (!response.ok) {
			throw new Error('Failed to improve prompt');
		  }
			
		  const data = await response.json();
		  setResponseTestData(data);
		  
		} catch (error) {
		  console.error('Error improving prompt:', error);
		  alert('Failed to improve prompt. Please try again.');
		} finally {
		  setLoadingTestPrompt(false);
		}	  
	};

	const handleTheResponsePrompt = () => {
		setResponseTestData(null);
	};

	const handleCloseTestResults = () => {
			setTestResults(null);
  };
	
	const handleSavePrompt = async () => {
		if (!topic.trim() || !prompt.trim()) {
			alert('Please fill in both topic and prompt fields');
			return;
		}
    
		setLoadingSavePrompt(true);
		try {
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
		  alert('Prompt saved successfully!');
		  console.log('Prompt saved:', result.prompt);
		  
		  setTopic('');
		  setPrompt('');
		  setImprovedData(null);
		  
		} catch (error) {
		  console.error('Error saving prompt:', error);
		  alert(`Failed to save prompt: ${error.message}`);
		} finally {
		  setLoadingSavePrompt(false);
		}
	};

return (
<div className="min-h-screen bg-gray-50 py-8">
   <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
         <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Prompt</h1>
         <p className="text-gray-600">Create, improve, and test your AI prompts before saving</p>
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
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-900"/>
         </div>
         {/* Topic Input */}
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Topic *</label>
            <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic for your prompt (e.g., Machine Learning, Resume Writing, etc.)"
            className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-900"/>
         </div>
         {/* Description Textarea */}
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description (Character count: {description.length})</label> 
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your prompt description here..."
            rows="2"
            className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400 text-gray-900"/>
         </div>
         {/* Prompt Textarea */}
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prompt * (Character count: {prompt.length})</label> 
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)}
            placeholder={'Enter your prompt here... (e.g., Explain machine learning to a beginner in simple terms)'}
            rows="4"
            className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400 text-gray-900"/>
         </div>
         {/* Improved Prompt Section */}
         {improvedData && (
         <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800 mb-3">Improved Prompt</h3>
            <div className="bg-white rounded p-4 border mb-3">
               <p className="text-gray-800 whitespace-pre-wrap">{improvedData.formattedPrompt}</p>
            </div>
            <button onClick={handleUseImprovedPrompt} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Use This Improved Prompt</button>
         </div>
         )}
         {showProviderSelection && (
         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
               Select AI Providers to Test With (Max 3)
               {loadingProviders && <span className="text-sm ml-2">Loading providers...</span>}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
               {availableProviders.map(provider => (
               <label key={provider.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input
                     type="checkbox"
                     checked={selectedProviders.includes(provider.id)}
                     onChange={() => handleProviderSelection(provider.id)}
                  disabled={selectedProviders.length >= 3 && !selectedProviders.includes(provider.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div>
                     <span className="text-sm font-medium text-gray-700 block">
                     {provider.name}
                     </span>
                     <span className="text-xs text-gray-500">
                     {provider.model}
                     </span>
                  </div>
               </label>
               ))}
            </div>
            {/* Rest of your provider selection UI remains the same */}
            <div className="flex justify-between items-center">
               <span className="text-sm text-blue-600">
               {selectedProviders.length} of 3 selected
               </span>
               <div className="space-x-3">
                  <button
                     onClick={() => setShowProviderSelection(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                  Cancel
                  </button>
                  <button
                  onClick={handleMultiProviderTest}
                  disabled={selectedProviders.length === 0 || loadingMultiTest}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                  {loadingMultiTest ? 'Testing...' : `Test with ${selectedProviders.length} Provider${selectedProviders.length !== 1 ? 's' : ''}`}
                  </button>
               </div>
            </div>
         </div>
         )}
         {/* Test Results Section */}
         {testResults && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
               <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                     <h2 className="text-2xl font-bold text-gray-900">
                        Test Results Comparison
                     </h2>
                     <button
                        onClick={handleCloseTestResults}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                        >
                     ×
                     </button>
                  </div>
                  <p className="text-gray-600 mt-1">Comparing responses from {testResults.length} AI providers</p>
               </div>
               <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols- gap-6">
                     {testResults.map((result, index) => (
                     <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                           <h3 className="font-semibold text-gray-900 capitalize">
                              {result.provider}
                           </h3>
                           <p className="text-sm text-gray-500">
                              {availableProviders.find(p => p.id === result.provider)?.model}
                           </p>
                        </div>
                        <div className="p-4 bg-white">
                           <div className="prose prose-sm max-w-none">
                              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
							  {result.response || 'No response generated'}
							</pre>
                           </div>
                           {result.usage && (
                           <div className="mt-4 pt-3 border-t border-gray-100">
                              <p className="text-xs text-gray-500">
                                 Tokens: {result.usage.total_tokens || 'N/A'}
                              </p>
                           </div>
                           )}
                        </div>
                     </div>
                     ))}
                  </div>
                  <div className="mt-6 flex justify-center">
                     <button
                        onClick={handleCloseTestResults}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                        >
                     Close Comparison
                     </button>
                  </div>
               </div>
            </div>
         </div>
         )}
         {/* Single Test Prompt Section */}
         {responseTestData && (
         <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800 mb-3">Prompt Response</h3>
            <div className="bg-white rounded p-4 border mb-3">
               <p className="text-gray-800 whitespace-pre-wrap">{responseTestData.generatedText}</p>
            </div>
            <button onClick={handleTheResponsePrompt} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Thanks, I liked it.</button>	
         </div>
         )}
         {/* Action Buttons */}
         <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
            onClick={handleImprovePrompt}
            disabled={loadingImprovement || !prompt.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center" >
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
               onClick={() => setShowProviderSelection(true)}
            disabled={!prompt.trim()}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition-colors">
            Test Prompt in Free Gen API
            </button>
            <button onClick={handleSavePrompt} disabled={loading || !topic.trim() || !prompt.trim()}
            className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition-colors">
            {loading ? 'Saving...' : 'Save Prompt'}</button>
         </div>
      </div>
      {/* Tips Section */}
   </div>
</div>
);
}
