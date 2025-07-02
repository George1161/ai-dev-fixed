// pages/index.js
import Head from 'next/head';
import AIChatBox from '../components/AIChatBox';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Test AI Website</title>
      </Head>

      <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
        <h1>Welcome to Your Test AI Website</h1>
        <p>This is a simple site connected to an AI assistant. Try typing an instruction below!</p>
        <AIChatBox />
      </main>
    </div>
  );
}
