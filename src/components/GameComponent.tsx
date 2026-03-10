'use client';

import { useEffect, useRef } from 'react';

export default function GameComponent() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let game: import('phaser').Game | null = null;

    (async () => {
      const Phaser = await import('phaser');
      const { gameConfig } = await import('@/game/config');
      game = new Phaser.Game(gameConfig);
    })();

    return () => {
      game?.destroy(true);
    };
  }, []);

  return (
    <div
      id="game-container"
      className="w-full h-full flex items-center justify-center bg-black"
    />
  );
}
