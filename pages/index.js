// pages/index.js
import Head from 'next/head';
import AIChatBox from '../components/AIChatBox';

export default function Home() {
  return (
    <>
      <Head>
        <title>Test AI Website</title>
      </Head>

      <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
        <h1>Welcome to Your Test AI Website</h1>
        <p>Type a prompt below and hit “Send to AI”.</p>
        <AIChatBox />
      </main>
    </>
  );
}
