# Looped - Family Chores & Allowance App

A gamified family task management app that turns chores into an engaging experience with XP, coins, achievements, and real allowance tracking.

![Looped Preview](https://img.shields.io/badge/React-18+-blue) ![Status](https://img.shields.io/badge/Status-Beta-yellow)

## ✨ Features

### 🎮 Gamification System
- **Dual Currency:** XP for leveling up, Coins for real money
- **15 Levels:** From "Rookie" to "Legend" with unlockable rewards
- **Weekly Tiers:** Bronze → Silver → Gold → Diamond based on weekly XP
- **26 Achievements:** Unlock badges for streaks, tasks, XP milestones, and more
- **Streaks:** Track daily consistency with visual progress

### 📋 Task Management
- **40+ Pre-built Task Suggestions** across 6 categories (Household, Kitchen, Pets, Outdoor, Learning, Health)
- **Custom Tasks:** Parents create tasks, kids can add personal tasks
- **Claimable Tasks:** Open tasks anyone can pick up
- **Recurring Tasks:** Daily, weekly, or custom repeat schedules
- **Task Comments:** Family discussion on tasks with @mentions

### 💰 Allowance System
- **Coin-based Earnings:** Mandatory chores earn coins (1 coin per 15 XP)
- **Request & Approve:** Kids request payouts, parents approve
- **Process Payouts:** Pay individual kids or everyone at once
- **Payment History:** Full tracking of all allowance payments
- **Configurable Settings:** Coin value, auto-approve threshold, perfect week bonus

### 👨‍👩‍👧‍👦 Family Features
- **Family Goals:** Shared XP goals (vacation, pizza night, etc.)
- **XP Bank:** Kids contribute saved XP to family goals
- **Family Wins Feed:** Celebrate achievements with reactions
- **Weekly Family Meeting:** Summary view for check-ins
- **Parent Dashboard:** Overview of all kids' progress

### 🛒 Reward Shop
- **10+ Built-in Rewards:** Screen time, treats, privileges
- **Custom Rewards:** Parents add family-specific rewards
- **Redemption Tracking:** Kids buy, parents fulfill

### 🚀 Onboarding
- **6-Step Setup Wizard:** Family name, kids, coin value, first goal
- **Demo Mode:** Skip setup to explore

## 🛠️ Tech Stack

- **React 18** with Hooks
- **Tailwind CSS** (inline styles)
- **No backend required** (state-based demo)

## 📦 Installation

### Option 1: Use in Claude Artifacts
1. Copy the contents of `looped-preview.jsx`
2. Paste into a Claude.ai artifact
3. It will render immediately

### Option 2: Create React App
```bash
npx create-react-app looped-app
cd looped-app
```

Replace `src/App.js` with:
```javascript
import LoopedApp from './LoopedApp';

function App() {
  return <LoopedApp />;
}

export default App;
```

Copy `looped-preview.jsx` to `src/LoopedApp.jsx` and run:
```bash
npm start
```

### Option 3: Vite
```bash
npm create vite@latest looped-app -- --template react
cd looped-app
npm install
```

Copy `looped-preview.jsx` to `src/LoopedApp.jsx`, update `src/App.jsx`:
```javascript
import LoopedApp from './LoopedApp';

function App() {
  return <LoopedApp />;
}

export default App;
```

Run:
```bash
npm run dev
```

## 🎯 Usage

### Demo Accounts
The app comes with pre-configured demo accounts:
- **Mom** (Parent) - Full access to all parent features
- **Dad** (Parent) - Full access to all parent features  
- **Alex** (Kid) - Level 7, 1,847 XP, sample tasks
- **Sam** (Kid) - Level 4, 892 XP, sample tasks

### Quick Start
1. Click the user badge (top right) to switch users
2. As a **Parent**: Create tasks, manage allowance, view dashboard
3. As a **Kid**: Complete tasks, earn XP/coins, buy rewards

### Key Workflows

**Creating a Task (Parent):**
1. Go to Tasks tab → Click "+ Add"
2. Choose from suggestions or create custom
3. Assign to kid, set XP value, optional repeat

**Completing a Task (Kid):**
1. Go to Tasks tab
2. Tap the circle next to a task
3. Earn XP and coins!

**Processing Allowance (Parent):**
1. Go to Wallet tab
2. Click "💸 Process Payouts"
3. Pay individual kids or "Pay All"

**Buying a Reward (Kid):**
1. Go to Wallet → Shop tab
2. Browse rewards you can afford (green border)
3. Tap to purchase with coins

## 📁 File Structure

```
looped-preview.jsx    # Main app component (single file)
README.md             # This file
```

## 🔧 Customization

### Changing Coin Value
Parent → Wallet → ⚙️ Settings → Coin Value

### Adding Custom Rewards
Parent → Wallet → Shop → "+ Add Reward"

### Modifying Level Definitions
Edit the `levelDefinitions` array at the top of the file

### Adding Achievement Types
Edit the `achievementDefinitions` array

## 🚧 Roadmap

- [ ] Backend integration (Firebase/Supabase)
- [ ] Push notifications
- [ ] Multiple family support
- [ ] Calendar integration
- [ ] Photo proof for tasks
- [ ] Sibling task trading

## 📄 License

MIT License - Feel free to use and modify for your family!

## 🙏 Credits

Built with ❤️ for families who want to make chores fun.

---

**Questions?** Open an issue or reach out!
