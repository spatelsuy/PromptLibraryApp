export default function AboutPrompts() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-900">
      <h2 className="text-4xl font-bold mb-6">About Prompts — A Simple Guide</h2>

      {/* What is a Prompt */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-3">What is a Prompt?</h3>
        <p className="mb-3">
          A prompt is the instruction you give to an AI tool. It can be a question, a task, or a message that tells the AI what you want. 
          Think of it like asking a friend for help, or setting expectations before a task. A clear prompt gives clear results. A vague prompt gives vague results.
        </p>
      </section>

      {/* How to Learn Prompting */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-3">How to Learn Prompting</h3>
        <p className="mb-3">You can learn prompting by focusing on three things:</p>

        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Be Clear:</strong> Tell the AI exactly what you want.</li>
          <li><strong>Add Context:</strong> More background means better output.</li>
          <li>
            <strong>Give an Example (Optional):</strong> Examples guide the AI toward your preferred style.
          </li>
        </ul>
      </section>

      {/* What Makes a Good Prompt */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-3">What Makes a Good Prompt?</h3>
        <p className="mb-3">A good prompt usually contains:</p>

        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Role:</strong> For example, “Act as a cybersecurity analyst...”</li>
          <li><strong>Goal:</strong> “Help me evaluate risks...”</li>
          <li><strong>Context:</strong> Information the AI needs.</li>
          <li><strong>Constraints:</strong> For example, “Keep it under 150 words.”</li>
          <li><strong>Output format:</strong> Bullets, table, summary, etc.</li>
        </ul>
      </section>

      {/* Types of Prompts */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-3">Types of Prompts</h3>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">1. Zero-Shot Prompt</h3>
            <p><strong>Simple Definition:</strong>A Zero-Shot Prompt is when you ask an AI to do a task without giving any examples or prior training. It is just a clear instructions.</p>
            <p>Example 1: Explain OAuth2.</p>
            <p>Example 2: Rewrite the paragraph below in a professional and empathetic tone suitable for a customer success manager.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">2. Few-Shot Prompt</h3>
            <p>You provide examples and ask the AI to follow them. Great for tone and style.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">3. Instruction Prompt</h3>
            <p>You give step-by-step instructions. Example: “Summarize in 5 bullets and highlight risks.”</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">4. Role-Based Prompt</h3>
            <p>Assign the AI a role. Example: “Act as a project manager and review this plan.”</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">5. Chain-of-Thought Prompt</h3>
            <p>Ask the AI to explain its reasoning. Useful for analysis and complex decisions.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">6. Rewrite / Transform Prompt</h3>
            <p>Ask the AI to improve or change something. Example: “Make this text more professional.”</p>
          </div>
        </div>
      </section>

      {/* How to Improve */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">How to Get Better at Prompting</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Practice with small tasks</li>
          <li>Refine prompts based on output</li>
          <li>Save your best prompts</li>
          <li>Experiment with different prompt types</li>
          <li>Break large tasks into smaller ones</li>
        </ul>
      </section>

      {/* Why Library Exists */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Why This Library Exists</h2>
        <p className="mb-3">Most people lose good prompts across chats, documents, and notes. This library helps you store, organize, improve, and reuse prompts easily.</p>
        <p>Simple. Clean. Effective.</p>
      </section>
    </div>
  );
}
