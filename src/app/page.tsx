import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl font-extrabold mb-4 text-yellow-400 drop-shadow-lg">
        LET&apos;S COOK!
      </h1>
      <p className="text-xl text-gray-300 mb-2">A cooperative cooking game</p>
      <p className="text-gray-400 mb-10 text-center max-w-md">
        Work together to chop ingredients, build plates, and serve orders before time runs out!
      </p>

      <div className="flex gap-8 mb-12 text-sm text-gray-300">
        <div className="bg-blue-900/60 rounded-xl px-6 py-4 border border-blue-700">
          <p className="font-bold text-blue-300 text-base mb-2">Player 1</p>
          <p>Move: <kbd className="bg-gray-700 px-1 rounded">WASD</kbd></p>
          <p>Interact: <kbd className="bg-gray-700 px-1 rounded">F</kbd></p>
        </div>
        <div className="bg-orange-900/60 rounded-xl px-6 py-4 border border-orange-700">
          <p className="font-bold text-orange-300 text-base mb-2">Player 2</p>
          <p>Move: <kbd className="bg-gray-700 px-1 rounded">Arrow Keys</kbd></p>
          <p>Interact: <kbd className="bg-gray-700 px-1 rounded">Enter</kbd></p>
        </div>
      </div>

      <div className="bg-green-900/40 rounded-xl px-8 py-4 mb-10 border border-green-700 text-center">
        <p className="text-green-300 font-bold mb-1">Recipe: Salad</p>
        <p className="text-gray-300 text-sm">Chopped Lettuce + Chopped Tomato → Plate → Serve</p>
      </div>

      <Link
        href="/game"
        className="bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-2xl px-12 py-4 rounded-2xl shadow-lg transition-colors"
      >
        PLAY NOW
      </Link>
    </main>
  );
}
