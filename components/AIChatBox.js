// components/AIChatBox.js
import { useState } from 'react';

export default function AIChatBox() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

      setResponse(data.result);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        rows={4}
        style={{ width: '100%' }}
        placeholder="Say something to the AI..."
      />
      <button onClick={handleSubmit} disabled={loading} style={{ marginTop: '0.5rem' }}>
        {loading ? 'Thinking…' : 'Send to AI'}
      </button>

      <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
        {response && <p><strong>AI:</strong> {response}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}
