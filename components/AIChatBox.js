import { useState } from 'react';

export default function AIChatBox() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    setResponse('');
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.result);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        style={{ width: '100%' }}
        placeholder="Type your prompt here..."
      />
      <button onClick={handleSubmit} style={{ marginTop: '0.5rem' }}>
        Send to AI
      </button>
      <div style={{ marginTop: '1rem' }}>
        {response && <p><strong>AI Response:</strong> {response}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}
