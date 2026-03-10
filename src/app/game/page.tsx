'use client';

import dynamic from 'next/dynamic';

const GameComponent = dynamic(() => import('@/components/GameComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <p className="text-white text-2xl font-bold animate-pulse">Loading Kitchen...</p>
    </div>
  ),
});

export default function GamePage() {
  return (
    <main className="w-screen h-screen bg-black overflow-hidden">
      <GameComponent />
    </main>
  );
}
