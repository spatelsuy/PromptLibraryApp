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
            <p>Zero-Shot Prompt is when you ask an AI to do a task without giving any examples or prior training. It is just a clear instructions.</p>
            <p>Example 1: Explain OAuth2.</p>
            <p>Example 2: Rewrite the paragraph below in a professional and empathetic tone suitable for a customer success manager.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">2. Few-Shot Prompt</h3>
            <p>Few-Shot Prompting is when you provide a small number of examples in the prompt to demonstrate the expected input-output pattern, and then ask the model to perform the require task.</p>
            <p>Rewrite the following messages in a professional tone. <br />

            Example 1:<br />
            Input: This is wrong. Fix it.<br />
            Output: There appears to be an issue. Could you please review and correct it?<br />
            <br />
            Example 2:<br />
            Input: I need this now.<br />
            Output: Could you please prioritize this request at your earliest convenience?<br />
            <br />
            Now rewrite this:<br />
            Input: Send the document today.<br />
            </p>

            <p>Note: Zero-Shot relies on instruction clarity; Few-Shot relies on example-driven guidance.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">3. Instruction Prompt</h3>
            <p>An Instruction Prompt is a prompt where you clearly tell the AI what to do and how to respond, by explicitely providing instructions.</p>
            <p>Explain Kubernetes to a non-technical person. Use bullet points only to explain. Limit the answer to 5 bullets. Avoid technical jargon.</p>
            <p>Note: Using the Zero-Shot concept, the prompt would be: Explain Kubernetes.
            When you add clarity by specifying the audience (non-technical person), format (bullet points), limit (5 bullets), and style (avoid technical jargon), 
              the prompt becomes an Instruction Prompt - it’s still Zero-Shot, but now it provides explicit instruction.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">4. Role-Based Prompt</h3>
            <p>A Role-Based Prompt is a prompt where you explicitly tell the AI to act as a specific role or persona while performing the task.</p>
            <p>Example: Act as a cybersecurity analyst. Explain the risks of using public Wi-Fi to a non-technical audience in 3 simple bullet points.</p>
            <p>Note: Zero-Shot Only: Explain phishing attacks.<br />
              Instruction Prompt + Zero-Shot: Explain phishing attacks to non-technical person in 3 bullet points. <br />
              Role-Based + Instruction + Zero-Shot: Act as a cybersecurity trainer. Explain phishing attacks to non-technical employees in 3 simple bullet points.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">5. Chain-of-Thought Prompt</h3>
            <p>A Chain-of-Thought (CoT) Prompt is a prompt where you explicitly ask the AI to reason step-by-step and show its intermediate thinking before providing the final answer.</p>
            <p>Example: Solve the math problem step by step: If a train travels 60 km in 1 hour and 90 km in 1.5 hours, what is its average speed? Show all calculations.</p>
            <p>Note with another example:<br />
            Zero-Shot + CoT: Solve this math problem step by step: 24 × 36<br />
            Can be Instruction + CoT: Explain the solution to 24 × 36 step by step and show all intermediate calculations.<br />
            Can be Role-Based + CoT: Act as a math tutor. Solve 24 × 36 step by step and explain each step clearly.<br />
            Can be Role-Based + Few-Shot + CoT: Act as a math tutor. Solve 24 × 36 and explain each step clearly. <br />
              Follow the example: Problem: 12 × 15<br />
              Step-by-step solution:<br />
              1. Break 15 into 10 + 5<br />
              2. Multiply 12 by 10 → 120<br />
              3. Multiply 12 by 5 → 60<br />
              4. Add the results → 120 + 60 = 180<br />
              Answer: 180
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">6. Rewrite / Transform Prompt</h3>
            <p>A Rewrite / Transform Prompt is a prompt where you explicitly ask the AI to change, reformat, or modify the input content according to a rule, style, or purpose.<br />
            - The AI does not generate new content from scratch, but transforms existing content.<br />
            - Can include instructions for tone, format, style, or constraints.<br />
            - Can also be combined with Zero-Shot, Few-Shot, Role-Based, or CoT.<br />
            Example: Rewrite this sentence in a more professional tone: I need this done now.<br />
            Note:<br />
              Role-Based + Instruction + Transform: Act as a project manager. Rewrite the following message to sound polite and professional: Send me the report today.<br />
              Few-Shot + Transform: Example 1: I need this done now. is written as Could you please prioritize this task at your earliest convenience?  <br />
              Example 2: Send me the report today. is written as Could you please send me the report today?<br />
              Now rewrite: Finish the project by Friday.
            </p>
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
