```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║    ██╗     ███████╗████████╗███████╗     ██████╗ ██████╗ ██████╗ ██╗  ██╗   ██╗  ║
║    ██║     ██╔════╝╚══██╔══╝██╔════╝    ██╔════╝██╔═══██╗██╔══██╗██║ ██╔╝   ╚██╗██╔╝ ║
║    ██║     █████╗     ██║   ███████╗    ██║     ██║   ██║██║  ██║█████╔╝     ╚███╔╝  ║
║    ██║     ██╔══╝     ██║   ╚════██║    ██║     ██║   ██║██║  ██║██╔═██╗     ██╔██╗  ║
║    ███████╗███████╗   ██║   ███████║    ╚██████╗╚██████╔╝██████╔╝██║  ██╗██╗██╔╝ ██╗ ║
║    ╚══════╝╚══════╝   ╚═╝   ╚══════╝     ╚═════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝ ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

<div align="center">

# 🍳 LET'S COOK!

### *The kitchen is on fire. Can you handle the heat?*

**An Overcooked-inspired co-op cooking chaos game — built with Next.js & Phaser 3**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Phaser](https://img.shields.io/badge/Phaser-3.90-red?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyTDIgN2wxMCA1IDEwLTV6TTIgMTdsIDEwIDUgMTAtNXYtNWwtMTAgNS0xMC01eiIvPjwvc3ZnPg==)](https://phaser.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

---

```
🧑‍🍳  P1: WASD + F      🧑‍🍳  P2: Arrows + Enter      ⏱  3 Minutes      💰  Score Big!
```

</div>

---

## 🎮 What is Let's Cook?

**Let's Cook!** is a frantic, co-operative top-down cooking game where **two players** must work together in a chaotic kitchen to prep ingredients, assemble dishes, and serve orders — all against the clock.

No talking. No mercy. Only salads.

> *Inspired by the legendary Overcooked series, rebuilt from scratch using web technologies.*

---

## 🍽️ Gameplay Loop

```
 ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
 │  🥬 Pick Up   │────▶│  🔪 Chop It   │────▶│  🍽️ Plate It  │────▶│  ⭐ Serve It  │
 │  Ingredient  │     │  (hold key)  │     │  + Assemble  │     │  for Points! │
 └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

**The only recipe (for now):**

```
🥗  SALAD  =  Chopped Lettuce  +  Chopped Tomato  →  Plate  →  Serving Window
```

Every order has a countdown timer. Serve fast for bonus points. Let orders expire and cry.

---

## ⚡ Quick Start

```bash
# Clone the kitchen
git clone https://github.com/your-username/lets-cook.git
cd lets-cook

# Stock the pantry
npm install

# Fire up the stove
npm run dev
```

Then open **[http://localhost:3000](http://localhost:3000)** and start cooking.

---

## 🕹️ Controls

### 🔵 Player 1 (Blue Chef)

| Action | Key |
|--------|-----|
| Move | `W` `A` `S` `D` |
| Interact / Pick Up / Drop | `F` |
| Chop Ingredient | Hold `F` at chopping board |

### 🟠 Player 2 (Orange Chef)

| Action | Key |
|--------|-----|
| Move | `↑` `↓` `←` `→` |
| Interact / Pick Up / Drop | `Enter` |
| Chop Ingredient | Hold `Enter` at chopping board |

### 🔴 General

| Action | Key |
|--------|-----|
| Quit to Menu | `ESC` or **QUIT button** |
| Play Again (Game Over) | `Space` or **PLAY AGAIN button** |

---

## 📖 Rules

1. **Orders appear** on the right side — each has a countdown timer bar.
2. **Grab ingredients** from the colored stations (green = lettuce, red = tomato).
3. **Place on a chopping board**, then *hold* your interact key to chop. Let go = stops chopping.
4. **Pick up a plate** from the plate station, then **interact with counters** to add chopped ingredients.
5. **Run to a Serving Window** (★ SERVE ★) and interact to deliver.
6. **Score:** 100 pts per order + up to 50 speed bonus points.
7. **3 minutes** on the clock — then time's up!
8. If an order **expires**, you get nothing. Don't let that happen.

---

## 🏆 Score Ratings

| Score | Rating |
|-------|--------|
| 1000+ | ⭐⭐⭐ **Master Chef** |
| 500–999 | ⭐⭐ **Sous Chef** |
| 0–499 | ⭐ **Kitchen Apprentice** |

---

## 🏗️ Tech Stack

| Layer | Tech |
|-------|------|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Game Engine | [Phaser 3.90](https://phaser.io) |
| Language | [TypeScript 5](https://typescriptlang.org) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Physics | Phaser Arcade Physics |
| Graphics | Procedurally generated (canvas) |

---

## 📁 Project Structure

```
lets_cook/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Home / landing
│   │   └── game/page.tsx       # Game page
│   ├── components/
│   │   └── GameComponent.tsx   # Phaser ↔ React bridge
│   └── game/
│       ├── config.ts           # Phaser game config
│       ├── constants.ts        # Game constants & colors
│       ├── scenes/
│       │   ├── BootScene.ts    # Initialization
│       │   ├── MenuScene.ts    # Main menu + rules
│       │   ├── GameScene.ts    # Core gameplay
│       │   └── UIScene.ts      # HUD overlay
│       ├── objects/
│       │   ├── Chef.ts         # Player character
│       │   ├── Station.ts      # Kitchen stations
│       │   ├── ChoppingBoard.ts
│       │   └── Ingredient.ts
│       └── systems/
│           └── OrderSystem.ts  # Order & scoring logic
└── public/
```

---

## 🛠️ Development

```bash
npm run dev      # Dev server with hot reload (localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

---

## 🗺️ Kitchen Map

```
╔══════════════════════════════════════════════════════╗
║  [🥬] [ ] [🍅] [ ] [ ] [🔪] [ ] [🔪] [ ] [🍽️]     ║
║                                                      ║
║                                            [⭐SERVE]  ║
║                                                      ║
║             [ ][ ][ ][ ][ ][ ][ ][ ][ ]   [⭐SERVE]  ║
║                   COUNTER ISLAND                     ║
║                                                      ║
║  [🥬] [ ] [🍅] [ ] [ ] [🔪] [ ] [🔪] [ ] [🍽️]     ║
╚══════════════════════════════════════════════════════╝
  🔵 P1 spawns top-left   🟠 P2 spawns bottom-left
```

---

## 🚀 Deploy

The easiest way to deploy is with **[Vercel](https://vercel.com)**:

```bash
npx vercel
```

Or connect your GitHub repo to Vercel for automatic deploys on every push.

---

<div align="center">

**Made with 🔥 and way too much stress**

*The kitchen never sleeps. Neither should you.*

</div>
