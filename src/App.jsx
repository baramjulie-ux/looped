import React, { useState } from 'react';

// ========== LEVEL & TIER SYSTEM ==========
const levelDefinitions = [
  { level: 1, xpRequired: 0, title: 'Beginner', coinBonus: 0, unlocks: [] },
  { level: 2, xpRequired: 200, title: 'Beginner', coinBonus: 5, unlocks: ['avatar_cat', 'avatar_dog'] },
  { level: 3, xpRequired: 500, title: 'Helper', coinBonus: 0, unlocks: ['shop_movie_night'] },
  { level: 4, xpRequired: 900, title: 'Helper', coinBonus: 10, unlocks: ['avatar_fox', 'avatar_panda'] },
  { level: 5, xpRequired: 1400, title: 'Rising Star', coinBonus: 15, unlocks: ['perk_weekend_bonus'] },
  { level: 6, xpRequired: 2000, title: 'Rising Star', coinBonus: 0, unlocks: ['shop_game_time', 'avatar_unicorn'] },
  { level: 7, xpRequired: 2800, title: 'Rising Star', coinBonus: 20, unlocks: [] },
  { level: 8, xpRequired: 3800, title: 'Superstar', coinBonus: 0, unlocks: ['shop_friend_day'] },
  { level: 9, xpRequired: 5000, title: 'Superstar', coinBonus: 25, unlocks: ['avatar_dragon', 'avatar_rocket'] },
  { level: 10, xpRequired: 6500, title: 'Family MVP', coinBonus: 50, unlocks: ['milestone_reward', 'badge_mvp'] },
];

const weeklyTiers = [
  { id: 'bronze', name: 'Bronze', icon: '🥉', minXp: 0, maxXp: 99, coinBonus: 0, allowanceBonus: 0 },
  { id: 'silver', name: 'Silver', icon: '🥈', minXp: 100, maxXp: 199, coinBonus: 5, allowanceBonus: 0 },
  { id: 'gold', name: 'Gold', icon: '🥇', minXp: 200, maxXp: 349, coinBonus: 15, allowanceBonus: 5 },
  { id: 'platinum', name: 'Platinum', icon: '💎', minXp: 350, maxXp: 499, coinBonus: 30, allowanceBonus: 10 },
  { id: 'diamond', name: 'Diamond', icon: '👑', minXp: 500, maxXp: Infinity, coinBonus: 50, allowanceBonus: 15 },
];

const avatarOptions = [
  { id: 'boy', emoji: '👦', name: 'Boy', unlockedAt: 1 },
  { id: 'girl', emoji: '👧', name: 'Girl', unlockedAt: 1 },
  { id: 'avatar_cat', emoji: '🐱', name: 'Cat', unlockedAt: 2 },
  { id: 'avatar_dog', emoji: '🐶', name: 'Dog', unlockedAt: 2 },
  { id: 'avatar_fox', emoji: '🦊', name: 'Fox', unlockedAt: 4 },
  { id: 'avatar_unicorn', emoji: '🦄', name: 'Unicorn', unlockedAt: 6 },
  { id: 'avatar_dragon', emoji: '🐲', name: 'Dragon', unlockedAt: 9 },
];

// Initial data
const initialTasks = [
  { id: 1, title: 'Take out the trash', xp: 15, assignedTo: 'Alex', status: 'open', category: 'chore', dueDate: 'Today', isMandatory: true },
  { id: 2, title: 'Walk the dog', xp: 20, assignedTo: null, status: 'claimable', category: 'chore', dueDate: 'Today', isFamily: true, isMandatory: false },
  { id: 3, title: 'Do homework', xp: 25, assignedTo: 'Alex', status: 'open', category: 'responsibility', dueDate: 'Today', isMandatory: true },
  { id: 4, title: 'Clean your room', xp: 30, assignedTo: 'Alex', status: 'completed', category: 'chore', dueDate: 'Yesterday', isMandatory: true },
];

const initialRewardShopItems = [
  { id: 1, name: 'Extra 30 min screen time', icon: '📱', price: 50, category: 'privilege', description: 'Add 30 minutes', levelRequired: 1 },
  { id: 2, name: 'Small treat', icon: '🍬', price: 30, category: 'item', description: 'Candy or snack', levelRequired: 1 },
  { id: 3, name: 'Stay up 1 hour late', icon: '🌙', price: 100, category: 'privilege', description: 'Weekend only', levelRequired: 3 },
  { id: 4, name: 'Skip one chore', icon: '🎫', price: 150, category: 'privilege', description: 'Parent approval', levelRequired: 5 },
  { id: 5, name: 'Friend sleepover', icon: '🛏️', price: 300, category: 'experience', description: 'Invite a friend', levelRequired: 8 },
];

const initialSettings = {
  coinConversionRate: 10,
  coinValue: 0.10,
  currencySymbol: '₪',
  weeklyMinimumCoins: 10,
  baseAllowanceAmount: 20,
  level10MilestoneReward: 'Special day out - your choice!',
  level10MilestoneIcon: '🎁',
};

const initialWeeklyProgress = [
  { childName: 'Alex', xpThisWeek: 220, coinsThisWeek: 14, mandatoryTasksCompleted: 3, mandatoryTasksTotal: 4 },
];

const growthThemes = [
  { id: 1, name: 'Gratitude', icon: '🙏', color: '#f59e0b', description: 'Practice thankfulness daily', suggestedTasks: ['Write 3 things you\'re grateful for', 'Thank someone today', 'Gratitude meditation'] },
  { id: 2, name: 'Creativity', icon: '🎨', color: '#ec4899', description: 'Express yourself creatively', suggestedTasks: ['Draw or paint something', 'Write a short story', 'Learn a new song'] },
  { id: 3, name: 'Kindness', icon: '💜', color: '#8b5cf6', description: 'Spread kindness to others', suggestedTasks: ['Do something nice for a sibling', 'Help a neighbor', 'Write an encouraging note'] },
  { id: 4, name: 'Responsibility', icon: '⭐', color: '#10b981', description: 'Own your commitments', suggestedTasks: ['Complete chores without reminders', 'Be on time all day', 'Keep your space clean'] },
  { id: 5, name: 'Wellness', icon: '🌿', color: '#06b6d4', description: 'Take care of mind & body', suggestedTasks: ['Exercise for 30 minutes', 'Drink 8 glasses of water', 'Get 8 hours of sleep'] },
  { id: 6, name: 'Learning', icon: '📚', color: '#6366f1', description: 'Grow your knowledge', suggestedTasks: ['Read for 30 minutes', 'Learn something new online', 'Practice a skill'] },
];

// Achievement definitions
const achievementDefinitions = [
  // Streak achievements
  { id: 'streak_3', name: 'Getting Started', icon: '🔥', description: '3 day streak', category: 'streak', requirement: 3, color: '#f59e0b' },
  { id: 'streak_7', name: 'Week Warrior', icon: '⚡', description: '7 day streak', category: 'streak', requirement: 7, color: '#f59e0b' },
  { id: 'streak_14', name: 'Fortnight Fighter', icon: '💪', description: '14 day streak', category: 'streak', requirement: 14, color: '#f59e0b' },
  { id: 'streak_30', name: 'Monthly Master', icon: '🏆', description: '30 day streak', category: 'streak', requirement: 30, color: '#f59e0b' },
  { id: 'streak_100', name: 'Unstoppable', icon: '👑', description: '100 day streak', category: 'streak', requirement: 100, color: '#f59e0b' },
  
  // Task achievements
  { id: 'tasks_1', name: 'First Step', icon: '👣', description: 'Complete first task', category: 'tasks', requirement: 1, color: '#10b981' },
  { id: 'tasks_10', name: 'Getting Things Done', icon: '✅', description: 'Complete 10 tasks', category: 'tasks', requirement: 10, color: '#10b981' },
  { id: 'tasks_50', name: 'Task Tackler', icon: '🎯', description: 'Complete 50 tasks', category: 'tasks', requirement: 50, color: '#10b981' },
  { id: 'tasks_100', name: 'Century Club', icon: '💯', description: 'Complete 100 tasks', category: 'tasks', requirement: 100, color: '#10b981' },
  { id: 'tasks_500', name: 'Task Legend', icon: '🌟', description: 'Complete 500 tasks', category: 'tasks', requirement: 500, color: '#10b981' },
  
  // XP achievements
  { id: 'xp_500', name: 'XP Explorer', icon: '🗺️', description: 'Earn 500 XP', category: 'xp', requirement: 500, color: '#7c3aed' },
  { id: 'xp_1000', name: 'XP Adventurer', icon: '⛰️', description: 'Earn 1,000 XP', category: 'xp', requirement: 1000, color: '#7c3aed' },
  { id: 'xp_5000', name: 'XP Champion', icon: '🏅', description: 'Earn 5,000 XP', category: 'xp', requirement: 5000, color: '#7c3aed' },
  { id: 'xp_10000', name: 'XP Hero', icon: '🦸', description: 'Earn 10,000 XP', category: 'xp', requirement: 10000, color: '#7c3aed' },
  
  // Level achievements
  { id: 'level_5', name: 'Rising Star', icon: '⭐', description: 'Reach Level 5', category: 'level', requirement: 5, color: '#ec4899' },
  { id: 'level_10', name: 'Shining Bright', icon: '🌟', description: 'Reach Level 10', category: 'level', requirement: 10, color: '#ec4899' },
  { id: 'level_15', name: 'Super Star', icon: '💫', description: 'Reach Level 15', category: 'level', requirement: 15, color: '#ec4899' },
  
  // Coins achievements
  { id: 'coins_50', name: 'Piggy Bank', icon: '🐷', description: 'Earn 50 coins total', category: 'coins', requirement: 50, color: '#d97706' },
  { id: 'coins_100', name: 'Coin Collector', icon: '🪙', description: 'Earn 100 coins total', category: 'coins', requirement: 100, color: '#d97706' },
  { id: 'coins_500', name: 'Money Maker', icon: '💰', description: 'Earn 500 coins total', category: 'coins', requirement: 500, color: '#d97706' },
  
  // Special achievements
  { id: 'early_bird', name: 'Early Bird', icon: '🐦', description: 'Complete task before 8am', category: 'special', requirement: 1, color: '#06b6d4' },
  { id: 'perfect_week', name: 'Perfect Week', icon: '🌈', description: 'All tasks done for 7 days', category: 'special', requirement: 1, color: '#06b6d4' },
  { id: 'helper', name: 'Helping Hand', icon: '🤝', description: 'Claim 5 available tasks', category: 'special', requirement: 5, color: '#06b6d4' },
  { id: 'contributor', name: 'Team Player', icon: '🎁', description: 'Contribute to family goal', category: 'special', requirement: 1, color: '#06b6d4' },
  { id: 'big_spender', name: 'Treat Yourself', icon: '🛍️', description: 'Redeem shop reward', category: 'special', requirement: 1, color: '#06b6d4' },
  { id: 'saver', name: 'Super Saver', icon: '🏦', description: 'Save 100 coins', category: 'special', requirement: 100, color: '#06b6d4' },
];

const initialThemeActivities = [
  { id: 1, themeId: 1, title: 'Write 3 things I am grateful for', xp: 15, todayCount: 0, todayNotes: [] },
  { id: 2, themeId: 1, title: 'Thank someone today', xp: 20, todayCount: 0, todayNotes: [] },
  { id: 3, themeId: 2, title: 'Draw something creative', xp: 20, todayCount: 0, todayNotes: [] },
  { id: 4, themeId: 2, title: 'Practice an instrument', xp: 15, todayCount: 0, todayNotes: [] },
];

const initialSelfCareActivities = [
  { id: 1, name: '30 min exercise', xp: 25, icon: '🏃', prompt: 'What exercise did you do?', todayCount: 0, todayNotes: [] },
  { id: 2, name: 'Read for 20 mins', xp: 15, icon: '📚', prompt: 'What did you read?', todayCount: 0, todayNotes: [] },
  { id: 3, name: 'Meditate', xp: 20, icon: '🧘', prompt: 'How do you feel?', todayCount: 0, todayNotes: [] },
  { id: 4, name: 'Get 8hrs sleep', xp: 30, icon: '😴', prompt: 'How did you sleep?', todayCount: 0, todayNotes: [] },
  { id: 5, name: 'Social time', xp: 15, icon: '👥', prompt: 'Who did you spend time with?', todayCount: 0, todayNotes: [] },
  { id: 6, name: 'Creative hobby', xp: 20, icon: '🎨', prompt: 'What did you create?', todayCount: 0, todayNotes: [] },
];

const initialRecognitions = [
  { id: 1, from: 'Mom', to: 'Alex', reason: 'Helped with dishes without being asked!', xp: 10 },
  { id: 2, from: 'Dad', to: 'Sam', reason: 'Great attitude today!', xp: 10 },
  { id: 3, from: 'Alex', to: 'Sam', reason: 'Shared the TV remote 😂', xp: 10 },
];

const initialFamilyMembers = [
  { name: 'Alex', avatar: '👦', role: 'teen', xp: 1250, xpBank: 340, level: 5, coins: 45, savings: 128, streak: 12 },
  { name: 'Sam', avatar: '👧', role: 'teen', xp: 980, xpBank: 180, level: 4, coins: 32, savings: 50, streak: 8 },
  { name: 'Mom', avatar: '👩', role: 'parent', xp: 450, xpBank: 75, level: 3, coins: 20, savings: 0, streak: 5 },
  { name: 'Dad', avatar: '👨', role: 'parent', xp: 320, xpBank: 45, level: 2, coins: 15, savings: 0, streak: 3 },
];

export default function LoopedApp() {
  const [familyMembers, setFamilyMembers] = useState(initialFamilyMembers);
  const [currentUser, setCurrentUser] = useState({ 
    id: 1, name: 'Alex', role: 'teen', xp: 1250, xpBank: 340, coins: 45, savings: 128, level: 5, streak: 12, avatar: '👦'
  });
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTab, setActiveTab] = useState('home');
  const [walletTab, setWalletTab] = useState('overview');
  const [notification, setNotification] = useState(null);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [levelUpInfo, setLevelUpInfo] = useState(null);
  const [weeklyProgress] = useState(initialWeeklyProgress);
  const [settings, setSettings] = useState(initialSettings);
  
  // Onboarding state
  const [showOnboarding, setShowOnboarding] = useState(false); // Set to true to test
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({
    familyName: '',
    parentName: '',
    parentAvatar: '👩',
    kids: [],
    coinValue: 0.10,
    currencySymbol: '$',
    firstGoalName: '',
    firstGoalIcon: '🏖️',
    firstGoalXp: 10000,
    selectedChores: []
  });
  const [tempKidName, setTempKidName] = useState('');
  const [tempKidAvatar, setTempKidAvatar] = useState('👦');
  
  // Allowance request state
  const [allowanceRequests, setAllowanceRequests] = useState([
    // { id: 1, from: 'Alex', coins: 45, amount: 4.50, status: 'pending', requestedAt: '2 hours ago' }
  ]);
  const [allowanceHistory, setAllowanceHistory] = useState([
    { id: 1, user: 'Alex', coins: 30, amount: 3.00, paidAt: 'Dec 20', paidBy: 'Mom' },
    { id: 2, user: 'Sam', coins: 25, amount: 2.50, paidAt: 'Dec 20', paidBy: 'Mom' },
    { id: 3, user: 'Alex', coins: 40, amount: 4.00, paidAt: 'Dec 13', paidBy: 'Dad' },
  ]);
  
  // Allowance automation settings
  const [allowanceAutomation, setAllowanceAutomation] = useState({
    enabled: true,
    payoutDay: 'Sunday', // Day of the week for auto-payout reminder
    autoApproveUnder: 10, // Auto-approve requests under this amount in real currency
    bonusForPerfectWeek: 5, // Bonus coins for completing all assigned tasks
    kidSettings: {
      'Alex': { enabled: true, weeklyBonus: 0 },
      'Sam': { enabled: true, weeklyBonus: 0 }
    }
  });
  const [showAllowanceSettingsModal, setShowAllowanceSettingsModal] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  
  // Shop state
  const [shopItems, setShopItems] = useState([
    { id: 1, name: '30 Min Screen Time', icon: '📱', price: 15, category: 'screen', description: 'Extra device time' },
    { id: 2, name: '1 Hour Gaming', icon: '🎮', price: 25, category: 'screen', description: 'Video game session' },
    { id: 3, name: 'Movie Night Pick', icon: '🎬', price: 30, category: 'experience', description: 'You choose the movie' },
    { id: 4, name: 'Ice Cream Trip', icon: '🍦', price: 40, category: 'treat', description: 'Trip to ice cream shop' },
    { id: 5, name: 'Skip a Chore', icon: '🎟️', price: 50, category: 'privilege', description: 'Free pass on one chore' },
    { id: 6, name: 'Stay Up Late', icon: '🌙', price: 35, category: 'privilege', description: '+30 min before bed' },
    { id: 7, name: 'Friend Sleepover', icon: '🏠', price: 75, category: 'experience', description: 'Have a friend stay over' },
    { id: 8, name: 'Restaurant Pick', icon: '🍕', price: 60, category: 'treat', description: 'Choose dinner spot' },
    { id: 9, name: 'Small Toy/Item', icon: '🎁', price: 100, category: 'treat', description: 'Up to $10 value' },
    { id: 10, name: 'Day Trip Choice', icon: '🚗', price: 150, category: 'experience', description: 'Pick a family outing' },
  ]);
  const [shopPurchases, setShopPurchases] = useState([
    { id: 1, itemId: 1, itemName: '30 Min Screen Time', icon: '📱', user: 'Alex', price: 15, purchasedAt: 'Dec 22', status: 'redeemed' },
    { id: 2, itemId: 3, itemName: 'Movie Night Pick', icon: '🎬', user: 'Sam', price: 30, purchasedAt: 'Dec 21', status: 'pending' },
  ]);
  const [showAddShopItemModal, setShowAddShopItemModal] = useState(false);
  const [newShopItem, setNewShopItem] = useState({ name: '', icon: '🎁', price: 20, category: 'treat', description: '' });
  const [shopFilter, setShopFilter] = useState('all');
  
  // Achievements state
  const [userAchievements, setUserAchievements] = useState({
    'Alex': {
      unlockedAchievements: ['tasks_1', 'tasks_10', 'xp_500', 'xp_1000', 'streak_3', 'streak_7', 'level_5', 'contributor'],
      stats: { tasksCompleted: 47, totalCoinsEarned: 89, claimedTasks: 3, bestStreak: 12 }
    },
    'Sam': {
      unlockedAchievements: ['tasks_1', 'tasks_10', 'xp_500', 'streak_3'],
      stats: { tasksCompleted: 23, totalCoinsEarned: 45, claimedTasks: 1, bestStreak: 5 }
    },
    'Mom': { unlockedAchievements: [], stats: { tasksCompleted: 0, totalCoinsEarned: 0, claimedTasks: 0, bestStreak: 0 } },
    'Dad': { unlockedAchievements: [], stats: { tasksCompleted: 0, totalCoinsEarned: 0, claimedTasks: 0, bestStreak: 0 } }
  });
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [newAchievement, setNewAchievement] = useState(null);
  
  // Weekly Family Meeting state
  const [showWeeklyMeetingModal, setShowWeeklyMeetingModal] = useState(false);
  const [showFamilyMeetingModal, setShowFamilyMeetingModal] = useState(false);
  const [showParentDashboard, setShowParentDashboard] = useState(false);
  const [weeklyMeetingNotes, setWeeklyMeetingNotes] = useState('');
  const [weeklyHighlights, setWeeklyHighlights] = useState([
    { id: 1, date: 'Dec 22', attendees: ['Mom', 'Dad', 'Alex', 'Sam'], highlights: ['Alex reached Level 5!', 'Sam completed all chores', 'Family goal 50% done'], notes: 'Great week! Kids are really engaging with the app.' },
  ]);
  
  // Get weekly stats for family meeting
  const getWeeklyFamilyStats = () => {
    const kidMembers = familyMembers.filter(m => m.role !== 'parent');
    return {
      totalTasksCompleted: kidMembers.reduce((sum, m) => {
        const stats = userAchievements[m.name]?.stats || {};
        return sum + (stats.tasksCompleted || 0);
      }, 0),
      totalXpEarned: kidMembers.reduce((sum, m) => sum + (m.xp || 0), 0),
      totalCoinsEarned: kidMembers.reduce((sum, m) => {
        const stats = userAchievements[m.name]?.stats || {};
        return sum + (stats.totalCoinsEarned || 0);
      }, 0),
      topPerformer: kidMembers.sort((a, b) => (b.xp || 0) - (a.xp || 0))[0],
      longestStreak: kidMembers.sort((a, b) => (b.streak || 0) - (a.streak || 0))[0],
      goalProgress: familyGoals.length > 0 ? Math.round((familyGoals[0].currentXp / familyGoals[0].targetXp) * 100) : 0
    };
  };
  
  // Check and unlock achievements
  const checkAchievements = (userName, stats) => {
    const userAch = userAchievements[userName] || { unlockedAchievements: [], stats: {} };
    const newUnlocks = [];
    
    achievementDefinitions.forEach(achievement => {
      if (userAch.unlockedAchievements.includes(achievement.id)) return;
      
      let unlocked = false;
      switch (achievement.category) {
        case 'streak':
          unlocked = (stats.currentStreak || currentUser.streak || 0) >= achievement.requirement;
          break;
        case 'tasks':
          unlocked = (stats.tasksCompleted || userAch.stats.tasksCompleted || 0) >= achievement.requirement;
          break;
        case 'xp':
          unlocked = (stats.totalXp || currentUser.xp || 0) >= achievement.requirement;
          break;
        case 'level':
          unlocked = getLevelFromXp(stats.totalXp || currentUser.xp || 0) >= achievement.requirement;
          break;
        case 'coins':
          unlocked = (stats.totalCoinsEarned || userAch.stats.totalCoinsEarned || 0) >= achievement.requirement;
          break;
        case 'special':
          if (achievement.id === 'helper') unlocked = (stats.claimedTasks || userAch.stats.claimedTasks || 0) >= achievement.requirement;
          if (achievement.id === 'contributor') unlocked = stats.hasContributed;
          if (achievement.id === 'big_spender') unlocked = stats.hasRedeemed;
          if (achievement.id === 'saver') unlocked = (stats.savings || currentUser.savings || 0) >= achievement.requirement;
          break;
      }
      
      if (unlocked) {
        newUnlocks.push(achievement);
      }
    });
    
    if (newUnlocks.length > 0) {
      setUserAchievements(prev => ({
        ...prev,
        [userName]: {
          ...prev[userName],
          unlockedAchievements: [...(prev[userName]?.unlockedAchievements || []), ...newUnlocks.map(a => a.id)],
          stats: { ...prev[userName]?.stats, ...stats }
        }
      }));
      
      // Show first new achievement
      setNewAchievement(newUnlocks[0]);
      setTimeout(() => setNewAchievement(null), 3000);
    }
  };
  
  // Balance (Self-Care) state
  const [selfCareActivities, setSelfCareActivities] = useState(initialSelfCareActivities);
  const [showSelfCareModal, setShowSelfCareModal] = useState(false);
  const [selectedSelfCareActivity, setSelectedSelfCareActivity] = useState(null);
  const [selfCareNote, setSelfCareNote] = useState('');
  
  // Growth state
  const [currentTheme, setCurrentTheme] = useState(growthThemes[0]);
  const [themeActivities, setThemeActivities] = useState(initialThemeActivities);
  const [showThemeActivityModal, setShowThemeActivityModal] = useState(false);
  const [selectedThemeActivity, setSelectedThemeActivity] = useState(null);
  const [themeActivityNote, setThemeActivityNote] = useState('');
  const [showAddActivityInput, setShowAddActivityInput] = useState(false);
  const [newActivityTitle, setNewActivityTitle] = useState('');
  
  // Family/Recognition state
  const [recentRecognitions, setRecentRecognitions] = useState(initialRecognitions);
  const [selectedRecognitionMember, setSelectedRecognitionMember] = useState(null);
  const [recognitionMessage, setRecognitionMessage] = useState('');
  
  // Journal and Reflection state
  const [showGratitudeModal, setShowGratitudeModal] = useState(false);
  const [gratitudeEntry, setGratitudeEntry] = useState('');
  const [showReflectionModal, setShowReflectionModal] = useState(false);
  const [reflectionEntry, setReflectionEntry] = useState('');
  
  // Add Member state
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberAvatar, setNewMemberAvatar] = useState('😊');
  const [newMemberRole, setNewMemberRole] = useState('child');
  
  // Edit Member state
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [editMemberName, setEditMemberName] = useState('');
  const [editMemberAvatar, setEditMemberAvatar] = useState('');
  const [editMemberRole, setEditMemberRole] = useState('');
  
  // Task completion with photo proof
  const [showCompleteTaskModal, setShowCompleteTaskModal] = useState(false);
  const [taskToComplete, setTaskToComplete] = useState(null);
  const [photoProofData, setPhotoProofData] = useState(null);
  
  // Pending approvals
  const [showPendingApprovalsModal, setShowPendingApprovalsModal] = useState(false);
  const [viewingPhotoProof, setViewingPhotoProof] = useState(null);
  
  // Add Task state
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskXp, setNewTaskXp] = useState(25);
  const [newTaskAssignee, setNewTaskAssignee] = useState('');
  const [newTaskMandatory, setNewTaskMandatory] = useState(false);
  const [newTaskDueDate, setNewTaskDueDate] = useState('Today');
  const [newTaskRepeat, setNewTaskRepeat] = useState('none');
  
  // Task suggestions - pre-built + custom history
  const [customTaskHistory, setCustomTaskHistory] = useState([]);
  const suggestedTasks = [
    { category: '🏠 Household', tasks: [
      { title: 'Make bed', xp: 15, mandatory: true },
      { title: 'Clean room', xp: 30, mandatory: true },
      { title: 'Do laundry', xp: 35, mandatory: true },
      { title: 'Fold clothes', xp: 25, mandatory: true },
      { title: 'Vacuum', xp: 30, mandatory: true },
      { title: 'Dust furniture', xp: 25, mandatory: true },
      { title: 'Mop floors', xp: 35, mandatory: true },
    ]},
    { category: '🍽️ Kitchen', tasks: [
      { title: 'Wash dishes', xp: 25, mandatory: true },
      { title: 'Load dishwasher', xp: 20, mandatory: true },
      { title: 'Unload dishwasher', xp: 20, mandatory: true },
      { title: 'Wipe counters', xp: 15, mandatory: true },
      { title: 'Set the table', xp: 15, mandatory: true },
      { title: 'Clear the table', xp: 15, mandatory: true },
      { title: 'Take out trash', xp: 20, mandatory: true },
    ]},
    { category: '🐕 Pets', tasks: [
      { title: 'Feed pets', xp: 15, mandatory: true },
      { title: 'Walk the dog', xp: 30, mandatory: true },
      { title: 'Clean litter box', xp: 25, mandatory: true },
      { title: 'Brush pet', xp: 20, mandatory: false },
    ]},
    { category: '🌿 Outdoor', tasks: [
      { title: 'Water plants', xp: 15, mandatory: false },
      { title: 'Mow lawn', xp: 50, mandatory: true },
      { title: 'Rake leaves', xp: 40, mandatory: true },
      { title: 'Shovel snow', xp: 50, mandatory: true },
      { title: 'Take out recycling', xp: 20, mandatory: true },
    ]},
    { category: '📚 Learning', tasks: [
      { title: 'Do homework', xp: 30, mandatory: false },
      { title: 'Read for 30 mins', xp: 25, mandatory: false },
      { title: 'Practice instrument', xp: 30, mandatory: false },
      { title: 'Study for test', xp: 35, mandatory: false },
    ]},
    { category: '💪 Health', tasks: [
      { title: 'Exercise', xp: 30, mandatory: false },
      { title: 'Drink 8 glasses of water', xp: 15, mandatory: false },
      { title: 'Go to bed on time', xp: 20, mandatory: false },
    ]},
  ];
  const [showTaskSuggestions, setShowTaskSuggestions] = useState(true);
  
  // Personal Task state (for kids)
  const [showAddPersonalTaskModal, setShowAddPersonalTaskModal] = useState(false);
  const [personalTaskTitle, setPersonalTaskTitle] = useState('');
  const [personalTaskXp, setPersonalTaskXp] = useState(20);
  
  // Task Comments state
  const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [taskComments, setTaskComments] = useState({
    // taskId: [{ id, from, text, timestamp }]
  });
  
  // Family Wins/Celebrations state
  const [familyWins, setFamilyWins] = useState([
    { id: 1, from: 'Alex', avatar: '👦', text: 'Got an A on my math test! 📝', timestamp: '2 hours ago', reactions: [{emoji: '🎉', user: 'Mom'}, {emoji: '❤️', user: 'Dad'}, {emoji: '⭐', user: 'Sam'}], status: 'approved' },
    { id: 2, from: 'Mom', avatar: '👩', text: 'Finally finished that big work project!', timestamp: 'Yesterday', reactions: [{emoji: '❤️', user: 'Alex'}, {emoji: '💪', user: 'Dad'}], status: 'approved' },
    { id: 3, from: 'Sam', avatar: '👧', text: 'Made the soccer team! ⚽', timestamp: '2 days ago', reactions: [{emoji: '🎉', user: 'Mom'}, {emoji: '🎉', user: 'Dad'}, {emoji: '❤️', user: 'Alex'}], status: 'approved' },
  ]);
  const [showAddWinModal, setShowAddWinModal] = useState(false);
  const [newWinText, setNewWinText] = useState('');
  
  // Family Goals state (multiple)
  const [familyGoals, setFamilyGoals] = useState([
    { id: 1, name: 'Beach Day Trip', icon: '🏖️', targetXp: 15000, currentXp: 9400, contributions: { 'Alex': 3200, 'Sam': 2800, 'Mom': 2000, 'Dad': 1400 } },
    { id: 2, name: 'Pizza Night', icon: '🍕', targetXp: 5000, currentXp: 3200, contributions: { 'Alex': 1200, 'Sam': 1000, 'Mom': 500, 'Dad': 500 } }
  ]);
  const [showEditGoalModal, setShowEditGoalModal] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [editGoalName, setEditGoalName] = useState('');
  const [editGoalIcon, setEditGoalIcon] = useState('🎯');
  const [editGoalTarget, setEditGoalTarget] = useState(10000);
  
  // Contribute state
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [contributeGoal, setContributeGoal] = useState(null);
  const [contributeAmount, setContributeAmount] = useState(0);
  
  // Notifications state
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  const [notifications, setNotifications] = useState({
    'Alex': [
      { id: 1, type: 'comment', from: 'Mom', text: 'commented on "Walk the dog"', taskId: 3, read: false, timestamp: '5 min ago' },
      { id: 2, type: 'mention', from: 'Dad', text: 'mentioned you: "@Alex can you help with this?"', taskId: 5, read: false, timestamp: '1 hour ago' },
      { id: 3, type: 'reaction', from: 'Sam', text: 'reacted 🎉 to your win', read: true, timestamp: '2 hours ago' },
    ],
    'Sam': [
      { id: 4, type: 'recognition', from: 'Mom', text: 'sent you recognition: "Great job on your homework!"', read: false, timestamp: '3 hours ago' },
    ],
    'Mom': [
      { id: 5, type: 'task', from: 'System', text: 'Alex completed "Make bed"', read: true, timestamp: 'Yesterday' },
    ],
    'Dad': []
  });
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);
  const [mentionFilter, setMentionFilter] = useState('');
  
  // Get unread count for current user
  const getUnreadCount = () => {
    const userNotifs = notifications[currentUser.name] || [];
    return userNotifs.filter(n => !n.read).length;
  };
  
  // Add notification helper
  const addNotification = (toUser, notif) => {
    if (toUser === currentUser.name) return; // Don't notify yourself
    setNotifications(prev => ({
      ...prev,
      [toUser]: [{ ...notif, id: Date.now(), read: false, timestamp: 'Just now' }, ...(prev[toUser] || [])]
    }));
  };
  
  // Mark all as read
  const markAllRead = () => {
    setNotifications(prev => ({
      ...prev,
      [currentUser.name]: (prev[currentUser.name] || []).map(n => ({ ...n, read: true }))
    }));
  };

  // Helper functions
  const getLevelFromXp = (xp) => {
    for (let i = levelDefinitions.length - 1; i >= 0; i--) {
      if (xp >= levelDefinitions[i].xpRequired) return levelDefinitions[i].level;
    }
    return 1;
  };

  const getLevelDef = (level) => levelDefinitions.find(l => l.level === level) || levelDefinitions[0];
  
  const getLevelProgress = (xp) => {
    const currentLevel = getLevelFromXp(xp);
    const currentLevelDef = getLevelDef(currentLevel);
    const nextLevelDef = getLevelDef(currentLevel + 1);
    const nextLevelXp = nextLevelDef ? nextLevelDef.xpRequired : currentLevelDef.xpRequired + 2000;
    const xpIntoLevel = xp - currentLevelDef.xpRequired;
    const xpNeededForLevel = nextLevelXp - currentLevelDef.xpRequired;
    return { current: xpIntoLevel, needed: xpNeededForLevel, percent: Math.min(100, (xpIntoLevel / xpNeededForLevel) * 100) };
  };

  const getLevelTitle = (level) => {
    if (level >= 10) return 'Family MVP';
    return getLevelDef(level)?.title || 'Beginner';
  };

  const getWeeklyXp = (childName) => weeklyProgress.find(p => p.childName === childName)?.xpThisWeek || 0;
  const getWeeklyCoins = (childName) => weeklyProgress.find(p => p.childName === childName)?.coinsThisWeek || 0;
  
  const getWeeklyTier = (weeklyXp) => {
    for (let i = weeklyTiers.length - 1; i >= 0; i--) {
      if (weeklyXp >= weeklyTiers[i].minXp) return weeklyTiers[i];
    }
    return weeklyTiers[0];
  };

  const getTierProgress = (weeklyXp) => {
    const currentTier = getWeeklyTier(weeklyXp);
    const currentIndex = weeklyTiers.findIndex(t => t.id === currentTier.id);
    const nextTier = weeklyTiers[currentIndex + 1];
    if (!nextTier) return { current: 0, needed: 100, percent: 100, nextTier: null };
    const xpIntoTier = weeklyXp - currentTier.minXp;
    const xpNeededForTier = nextTier.minXp - currentTier.minXp;
    return { current: xpIntoTier, needed: xpNeededForTier, percent: (xpIntoTier / xpNeededForTier) * 100, nextTier };
  };

  const coinsToCurrency = (coins) => ((coins || 0) / (settings.coinConversionRate || 10)).toFixed(2);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const completeTask = (taskId, photoProof = null) => {
    const task = tasks.find(t => t.id === taskId);
    
    // If user is a parent, complete immediately (parents don't need approval)
    if (currentUser.role === 'parent') {
      actuallyCompleteTask(taskId);
      return;
    }
    
    // For kids, send to pending approval
    setTasks(tasks.map(t => t.id === taskId ? { 
      ...t, 
      status: 'pending_approval',
      completedBy: currentUser.name,
      completedAt: new Date().toISOString(),
      photoProof: photoProof
    } : t));
    
    // Notify parents
    familyMembers.filter(m => m.role === 'parent').forEach(parent => {
      addNotification(parent.name, {
        type: 'approval',
        from: currentUser.name,
        text: `completed "${task.title}" - needs approval${photoProof ? ' 📷' : ''}`
      });
    });
    
    showNotification('Task submitted for approval! ⏳');
  };
  
  const actuallyCompleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    const completedBy = task.completedBy || task.assignedTo;
    const member = familyMembers.find(m => m.name === completedBy) || currentUser;
    
    const xpEarned = task.xp;
    const isChore = ['chore', 'responsibility'].includes(task.category) || task.isMandatory;
    const coinsEarned = isChore ? Math.floor(xpEarned / 15) : 0;
    
    const oldLevel = getLevelFromXp(member.xp || 0);
    const newXp = (member.xp || 0) + xpEarned;
    const newLevel = getLevelFromXp(newXp);
    
    // Update stats for achievements
    const currentStats = userAchievements[completedBy]?.stats || {};
    const newTasksCompleted = (currentStats.tasksCompleted || 0) + 1;
    const newTotalCoinsEarned = (currentStats.totalCoinsEarned || 0) + coinsEarned;
    
    // Update the family member who completed the task
    if (completedBy === currentUser.name) {
      if (newLevel > oldLevel) {
        const levelDef = getLevelDef(newLevel);
        setLevelUpInfo({ newLevel, title: getLevelTitle(newLevel), coinBonus: levelDef.coinBonus, unlocks: levelDef.unlocks });
        setShowLevelUpModal(true);
        setCurrentUser(prev => ({ ...prev, xp: newXp, xpBank: prev.xpBank + xpEarned, coins: prev.coins + coinsEarned + levelDef.coinBonus, level: newLevel }));
      } else {
        setCurrentUser(prev => ({ ...prev, xp: newXp, xpBank: prev.xpBank + xpEarned, coins: prev.coins + coinsEarned }));
      }
    } else {
      // Update another family member
      setFamilyMembers(prev => prev.map(m => 
        m.name === completedBy 
          ? { ...m, xp: newXp, xpBank: (m.xpBank || 0) + xpEarned, coins: (m.coins || 0) + coinsEarned }
          : m
      ));
    }
    
    // Handle recurring tasks
    if (task.repeat && task.repeat !== 'none') {
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'completed', lastCompleted: new Date().toISOString() } : t));
    } else {
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'completed' } : t));
    }
    
    // Update achievement stats
    setUserAchievements(prev => ({
      ...prev,
      [completedBy]: {
        ...prev[completedBy],
        stats: {
          ...prev[completedBy]?.stats,
          tasksCompleted: newTasksCompleted,
          totalCoinsEarned: newTotalCoinsEarned,
          bestStreak: Math.max(prev[completedBy]?.stats?.bestStreak || 0, member.streak || 0)
        }
      }
    }));
    
    // Check for new achievements
    setTimeout(() => {
      checkAchievements(completedBy, {
        tasksCompleted: newTasksCompleted,
        totalXp: newXp,
        currentStreak: member.streak,
        totalCoinsEarned: newTotalCoinsEarned
      });
    }, 500);
    
    // Notify the kid that their task was approved
    if (completedBy !== currentUser.name) {
      addNotification(completedBy, {
        type: 'approval',
        from: currentUser.name,
        text: `approved "${task.title}"! +${xpEarned} XP${coinsEarned > 0 ? ` +${coinsEarned} coins` : ''} 🎉`
      });
    }
  };
  
  const rejectTask = (taskId, reason = '') => {
    const task = tasks.find(t => t.id === taskId);
    setTasks(tasks.map(t => t.id === taskId ? { 
      ...t, 
      status: 'open',
      completedBy: null,
      completedAt: null,
      photoProof: null
    } : t));
    
    // Notify the kid
    if (task.completedBy) {
      addNotification(task.completedBy, {
        type: 'approval',
        from: currentUser.name,
        text: `returned "${task.title}" - ${reason || 'needs redo'}`
      });
    }
    showNotification('Task returned for redo');
  };
  };

  const levelProgress = getLevelProgress(currentUser.xp);
  const currentWeeklyTier = getWeeklyTier(getWeeklyXp(currentUser.name));
  const tierProgress = getTierProgress(getWeeklyXp(currentUser.name));

  const styles = {
    container: { fontFamily: "'Nunito', sans-serif", background: 'linear-gradient(180deg, #faf5ff 0%, #f0e7ff 50%, #e0f2fe 100%)', minHeight: '100vh', maxWidth: '430px', margin: '0 auto', position: 'relative' },
    notification: { position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)', color: 'white', padding: '14px 28px', borderRadius: '50px', fontWeight: '700', fontSize: '15px', boxShadow: '0 8px 30px rgba(124, 58, 237, 0.4)', zIndex: 1000 },
    header: { background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(20px)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(124, 58, 237, 0.1)' },
    logo: { fontSize: '24px', fontWeight: '800', color: '#7c3aed' },
    userBadge: { display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '8px 12px', borderRadius: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    main: { padding: '20px', paddingBottom: '100px' },
    card: { background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '16px', boxShadow: '0 4px 20px rgba(124, 58, 237, 0.08)' },
    navBar: { position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', background: 'white', display: 'flex', justifyContent: 'space-around', padding: '12px 0 20px', borderTop: '1px solid #e5e7eb', zIndex: 100 },
    navItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#9ca3af', cursor: 'pointer', border: 'none', background: 'none' },
    navItemActive: { color: '#7c3aed' },
    modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' },
    modal: { background: 'white', borderRadius: '24px', padding: '24px', width: '100%', maxWidth: '360px' },
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes slideDown {
          from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `}</style>
      
      {notification && <div style={styles.notification}>{notification}</div>}

      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.svg" alt="Looped Life" style={{ height: '36px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Notification Bell */}
          <div 
            onClick={() => setShowNotificationsPanel(!showNotificationsPanel)}
            style={{ 
              position: 'relative', 
              cursor: 'pointer',
              background: 'white',
              padding: '8px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}
          >
            <span style={{ fontSize: '20px' }}>🔔</span>
            {getUnreadCount() > 0 && (
              <div style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                background: '#ef4444',
                color: 'white',
                fontSize: '10px',
                fontWeight: '700',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {getUnreadCount()}
              </div>
            )}
          </div>
          <div style={styles.userBadge}>
            <span style={{ fontSize: '20px' }}>{currentUser.avatar}</span>
            <span style={{ fontWeight: '700', color: '#1e1b4b' }}>{currentUser.name}</span>
            <span style={{ fontSize: '12px' }}>🔥 {currentUser.streak}</span>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotificationsPanel && (
        <div style={{
          position: 'absolute',
          top: '70px',
          right: '16px',
          width: '320px',
          maxHeight: '400px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          zIndex: 100,
          overflow: 'hidden'
        }}>
          <div style={{ 
            padding: '14px 16px', 
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: '800', color: '#1e1b4b', fontSize: '16px' }}>Notifications</span>
            {getUnreadCount() > 0 && (
              <button
                onClick={markAllRead}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#7c3aed',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Mark all read
              </button>
            )}
          </div>
          <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
            {(!notifications[currentUser.name] || notifications[currentUser.name].length === 0) ? (
              <div style={{ padding: '32px 16px', textAlign: 'center', color: '#6b7280' }}>
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>🔔</span>
                No notifications yet
              </div>
            ) : (
              notifications[currentUser.name].map(notif => (
                <div 
                  key={notif.id}
                  onClick={() => {
                    // Mark as read
                    setNotifications(prev => ({
                      ...prev,
                      [currentUser.name]: prev[currentUser.name].map(n => 
                        n.id === notif.id ? { ...n, read: true } : n
                      )
                    }));
                    // If it's a task notification, open that task
                    if (notif.taskId) {
                      const task = tasks.find(t => t.id === notif.taskId);
                      if (task) {
                        setSelectedTask(task);
                        setShowTaskDetailModal(true);
                        setShowNotificationsPanel(false);
                      }
                    }
                  }}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f9fafb',
                    background: notif.read ? 'white' : '#f3e8ff',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>
                      {notif.type === 'comment' && '💬'}
                      {notif.type === 'mention' && '📢'}
                      {notif.type === 'reaction' && '🎉'}
                      {notif.type === 'task' && '✅'}
                      {notif.type === 'recognition' && '💜'}
                      {notif.type === 'allowance' && '💰'}
                      {notif.type === 'shop' && '🛒'}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', color: '#1e1b4b' }}>
                        <span style={{ fontWeight: '700' }}>{notif.from}</span> {notif.text}
                      </div>
                      <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>{notif.timestamp}</div>
                    </div>
                    {!notif.read && (
                      <div style={{ width: '8px', height: '8px', background: '#7c3aed', borderRadius: '50%' }}></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={styles.main}>
        {activeTab === 'home' && (
          <>
            {/* Progress Card */}
            <div style={{ 
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)', 
              borderRadius: '20px', 
              padding: '20px',
              marginBottom: '16px', 
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)' 
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '18px', fontWeight: '800', color: 'white' }}>⚡ My Progress</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ background: 'rgba(255,255,255,0.25)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700', color: 'white' }}>
                    Lvl {getLevelFromXp(currentUser.xp)}
                  </span>
                  <span style={{ background: 'rgba(255,255,255,0.25)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700', color: 'white' }}>
                    {getLevelTitle(getLevelFromXp(currentUser.xp))}
                  </span>
                </div>
              </div>

              {/* XP and Coins - These are primary, so more opaque */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.9)', borderRadius: '14px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#7c3aed' }}>{currentUser.xp.toLocaleString()}</div>
                  <div style={{ fontSize: '12px', color: '#9333ea', fontWeight: '600' }}>⚡ Lifetime XP</div>
                  <div style={{ marginTop: '8px', background: 'rgba(124,58,237,0.2)', borderRadius: '6px', height: '6px', overflow: 'hidden' }}>
                    <div style={{ background: '#7c3aed', height: '100%', width: `${levelProgress.percent}%`, borderRadius: '6px' }}></div>
                  </div>
                  <div style={{ fontSize: '10px', color: '#a78bfa', marginTop: '4px' }}>{levelProgress.current}/{levelProgress.needed} to Lvl {getLevelFromXp(currentUser.xp) + 1}</div>
                </div>
                
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.9)', borderRadius: '14px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#d97706' }}>{currentUser.coins || 0}</div>
                  <div style={{ fontSize: '12px', color: '#b45309', fontWeight: '600' }}>🪙 Coins</div>
                  <div style={{ marginTop: '8px', fontSize: '11px', color: '#92400e' }}>
                    = {settings.currencySymbol}{coinsToCurrency(currentUser.coins)}
                  </div>
                </div>
              </div>

              {/* XP Bank - Available to contribute */}
              <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '14px', padding: '12px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '20px' }}>🎁</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e1b4b' }}>XP Bank</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>Available to give to family goals</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: '#10b981' }}>{currentUser.xpBank}</div>
                  <div style={{ fontSize: '11px', color: '#059669', fontWeight: '600' }}>XP</div>
                </div>
                <button
                  onClick={() => setActiveTab('family')}
                  style={{
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Give
                </button>
              </div>

              {/* Weekly Tier - Secondary, more transparent */}
              <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: '14px', padding: '12px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '20px' }}>{currentWeeklyTier.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: 'white' }}>{currentWeeklyTier.name}</span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>
                    {getWeeklyXp(currentUser.name)} XP this week
                  </span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '6px', height: '8px', overflow: 'hidden' }}>
                  <div style={{ background: 'white', height: '100%', width: `${tierProgress.percent}%`, borderRadius: '6px' }}></div>
                </div>
                {tierProgress.nextTier && (
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', marginTop: '6px', textAlign: 'center' }}>
                    {tierProgress.nextTier.minXp - getWeeklyXp(currentUser.name)} XP to {tierProgress.nextTier.icon} {tierProgress.nextTier.name}
                  </div>
                )}
              </div>

              {/* Savings Goal - Secondary, more transparent */}
              <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: '14px', padding: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px' }}>🎮</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>Saving for: New Video Game</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>20 / 60 coins</div>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>33%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '6px', height: '8px', overflow: 'hidden' }}>
                  <div style={{ background: 'white', height: '100%', width: '33%', borderRadius: '6px' }}></div>
                </div>
              </div>

              {/* Quick Actions - Colorful buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => setActiveTab('wallet')}
                  style={{ flex: 1, padding: '12px', background: 'white', border: 'none', borderRadius: '12px', color: '#7c3aed', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  🛒 Shop
                </button>
                <button 
                  onClick={() => setActiveTab('wallet')}
                  style={{ flex: 1, padding: '12px', background: 'white', border: 'none', borderRadius: '12px', color: '#7c3aed', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  🎯 Save
                </button>
                <button 
                  onClick={() => setActiveTab('wallet')}
                  style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', border: 'none', borderRadius: '12px', color: 'white', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  💰 Wallet
                </button>
              </div>
            </div>

            {/* Streak & Achievements Card */}
            <div style={{ 
              background: 'white', 
              borderRadius: '16px', 
              padding: '16px',
              marginBottom: '16px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
            }}>
              {/* Streak Display */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '16px', 
                  background: currentUser.streak > 0 ? 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' : '#f3f4f6',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '24px' }}>🔥</span>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: currentUser.streak > 0 ? 'white' : '#9ca3af' }}>{currentUser.streak || 0}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b' }}>
                    {currentUser.streak > 0 ? `${currentUser.streak} Day Streak!` : 'Start Your Streak!'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    {currentUser.streak >= 7 ? 'Amazing consistency! 🌟' : currentUser.streak > 0 ? 'Keep it going!' : 'Complete a task today'}
                  </div>
                  {currentUser.streak > 0 && (
                    <div style={{ marginTop: '6px', display: 'flex', gap: '4px' }}>
                      {[...Array(Math.min(currentUser.streak, 7))].map((_, i) => (
                        <div key={i} style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#f59e0b' }} />
                      ))}
                      {currentUser.streak < 7 && [...Array(7 - currentUser.streak)].map((_, i) => (
                        <div key={i} style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#e5e7eb' }} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Achievements */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e1b4b' }}>🏆 Achievements</span>
                <button 
                  onClick={() => setShowAchievementsModal(true)}
                  style={{ background: 'none', border: 'none', color: '#7c3aed', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}
                >
                  View All →
                </button>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                {achievementDefinitions
                  .filter(a => userAchievements[currentUser.name]?.unlockedAchievements?.includes(a.id))
                  .slice(0, 6)
                  .map(achievement => (
                    <div 
                      key={achievement.id}
                      style={{
                        minWidth: '60px',
                        padding: '10px',
                        background: `${achievement.color}15`,
                        borderRadius: '12px',
                        textAlign: 'center',
                        border: `2px solid ${achievement.color}30`
                      }}
                    >
                      <div style={{ fontSize: '24px', marginBottom: '2px' }}>{achievement.icon}</div>
                      <div style={{ fontSize: '9px', fontWeight: '600', color: achievement.color, lineHeight: '1.2' }}>{achievement.name}</div>
                    </div>
                  ))}
                {(userAchievements[currentUser.name]?.unlockedAchievements?.length || 0) === 0 && (
                  <div style={{ flex: 1, textAlign: 'center', padding: '16px', color: '#9ca3af', fontSize: '13px' }}>
                    Complete tasks to earn badges! 🎯
                  </div>
                )}
              </div>
            </div>

            {/* Current Focus */}
            {currentTheme && (
              <div 
                style={{ 
                  background: 'white',
                  borderRadius: '16px', 
                  padding: '16px',
                  marginBottom: '16px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                  borderLeft: `4px solid ${currentTheme.color}`
                }}
                onClick={() => setActiveTab('growth')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '46px', 
                    height: '46px', 
                    borderRadius: '12px', 
                    background: `${currentTheme.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '24px' }}>{currentTheme.icon}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Focus</div>
                    <div style={{ fontSize: '17px', fontWeight: '800', color: '#1e1b4b' }}>{currentTheme.name}</div>
                  </div>
                  <div style={{ 
                    color: currentTheme.color, 
                    fontSize: '13px', 
                    fontWeight: '700' 
                  }}>
                    View →
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions Row: Journal, Balance, Reflection */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              <div 
                style={{ 
                  flex: 1, 
                  background: 'white', 
                  borderRadius: '14px', 
                  padding: '14px 10px', 
                  textAlign: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setShowGratitudeModal(true);
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                  <span style={{ fontSize: '20px' }}>📝</span>
                </div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#1e1b4b' }}>Journal</div>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>+15 XP</div>
              </div>
              <div 
                style={{ 
                  flex: 1, 
                  background: 'white', 
                  borderRadius: '14px', 
                  padding: '14px 10px', 
                  textAlign: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  cursor: 'pointer'
                }}
                onClick={() => setActiveTab('selfcare')}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                  <span style={{ fontSize: '20px' }}>🌿</span>
                </div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#1e1b4b' }}>Balance</div>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>Self-care</div>
              </div>
              <div 
                style={{ 
                  flex: 1, 
                  background: 'white', 
                  borderRadius: '14px', 
                  padding: '14px 10px', 
                  textAlign: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setShowReflectionModal(true);
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                  <span style={{ fontSize: '20px' }}>✨</span>
                </div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#1e1b4b' }}>Reflection</div>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>Daily</div>
              </div>
            </div>

            {/* Tasks */}
            <div style={{ ...styles.card }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#1e1b4b' }}>📋 Today's Tasks</span>
                <span style={{ background: '#7c3aed', color: 'white', padding: '4px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>
                  {tasks.filter(t => t.status !== 'completed').length} left
                </span>
              </div>
              
              {tasks.filter(t => t.status !== 'completed').map(task => (
                <div 
                  key={task.id} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    padding: '12px', 
                    background: task.status === 'pending_approval' ? '#fef3c7' : '#f9fafb', 
                    borderRadius: '12px', 
                    marginBottom: '8px',
                    borderLeft: task.isMandatory ? '4px solid #f59e0b' : '4px solid transparent'
                  }}
                >
                  <button 
                    onClick={() => {
                      if (task.status === 'open') {
                        if (currentUser.role === 'parent') {
                          completeTask(task.id);
                        } else {
                          setTaskToComplete(task);
                          setPhotoProofData(null);
                          setShowCompleteTaskModal(true);
                        }
                      }
                    }}
                    disabled={task.status === 'pending_approval'}
                    style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '10px', 
                      border: task.status === 'pending_approval' ? '2px solid #f59e0b' : '2px solid #d1d5db', 
                      background: task.status === 'pending_approval' ? '#fef3c7' : task.status === 'claimable' ? '#fef3c7' : 'white',
                      cursor: task.status === 'pending_approval' ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px'
                    }}
                  >
                    {task.status === 'pending_approval' ? '⏳' : task.status === 'claimable' ? '?' : ''}
                  </button>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', color: '#1e1b4b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {task.isMandatory && <span style={{ fontSize: '12px' }}>⭐</span>}
                      {task.title}
                      {task.repeat && task.repeat !== 'none' && (
                        <span style={{ fontSize: '10px', background: '#e0e7ff', color: '#4f46e5', padding: '2px 6px', borderRadius: '6px' }}>
                          🔄 {task.repeat}
                        </span>
                      )}
                      {task.status === 'pending_approval' && (
                        <span style={{ fontSize: '10px', background: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '6px' }}>
                          ⏳ Pending
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', display: 'flex', gap: '8px', marginTop: '2px' }}>
                      <span style={{ color: '#7c3aed', fontWeight: '600' }}>+{task.xp} XP</span>
                      {['chore', 'responsibility'].includes(task.category) && (
                        <span style={{ color: '#d97706', fontWeight: '600' }}>+{Math.floor(task.xp / 15)} 🪙</span>
                      )}
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>{task.dueDate}</span>
                </div>
              ))}

              {/* Completed */}
              {tasks.filter(t => t.status === 'completed').length > 0 && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#10b981', marginBottom: '8px' }}>
                    ✓ Completed ({tasks.filter(t => t.status === 'completed').length})
                  </div>
                  {tasks.filter(t => t.status === 'completed').map(task => (
                    <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', opacity: 0.6 }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '8px', background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✓</div>
                      <span style={{ textDecoration: 'line-through', color: '#6b7280' }}>{task.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Family Love Section */}
            <div style={{ 
              background: 'white', 
              borderRadius: '16px', 
              padding: '16px',
              marginBottom: '16px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '17px', fontWeight: '800', color: '#1e1b4b' }}>💜 Family Love</span>
                <button 
                  onClick={() => setActiveTab('family')}
                  style={{ background: '#fdf2f8', border: 'none', color: '#be185d', fontWeight: '700', fontSize: '13px', cursor: 'pointer', padding: '8px 12px', borderRadius: '10px' }}
                >
                  Send →
                </button>
              </div>
              
              {recentRecognitions.slice(0, 3).map(rec => (
                <div key={rec.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#fdf2f8', borderRadius: '10px', marginBottom: '8px' }}>
                  <div style={{ fontSize: '18px' }}>💜</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e1b4b' }}>{rec.from} → {rec.to}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{rec.reason}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'wallet' && (
          <>
            {/* Wallet Header */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>💰</div>
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#7c3aed' }}>{currentUser.xp.toLocaleString()} XP</div>
              <div style={{ fontSize: '18px', color: '#d97706', fontWeight: '700' }}>🪙 {currentUser.coins || 0} coins</div>
            </div>

            {/* Wallet Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', justifyContent: 'center' }}>
              {['overview', 'shop'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setWalletTab(tab)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: 'none',
                    background: walletTab === tab ? '#7c3aed' : '#f3f4f6',
                    color: walletTab === tab ? 'white' : '#6b7280',
                    fontWeight: '700',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {walletTab === 'shop' && (
              <div>
                {/* Coin Balance */}
                <div style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', borderRadius: '16px', padding: '16px', marginBottom: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', color: '#92400e', marginBottom: '4px' }}>Your Coins</div>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#d97706' }}>🪙 {currentUser.coins || 0}</div>
                  <div style={{ fontSize: '13px', color: '#a16207' }}>= {settings.currencySymbol}{((currentUser.coins || 0) * (settings.coinValue || 0.10)).toFixed(2)}</div>
                </div>

                {/* Parent: Add Item Button */}
                {currentUser.role === 'parent' && (
                  <button
                    onClick={() => setShowAddShopItemModal(true)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#7c3aed',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: '700',
                      fontSize: '14px',
                      cursor: 'pointer',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    ➕ Add Reward
                  </button>
                )}

                {/* Category Filter */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {[
                    { id: 'all', label: 'All', icon: '✨' },
                    { id: 'screen', label: 'Screen', icon: '📱' },
                    { id: 'treat', label: 'Treats', icon: '🍦' },
                    { id: 'experience', label: 'Experience', icon: '🎬' },
                    { id: 'privilege', label: 'Privilege', icon: '🎟️' },
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setShopFilter(cat.id)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '20px',
                        border: 'none',
                        background: shopFilter === cat.id ? '#7c3aed' : '#f3f4f6',
                        color: shopFilter === cat.id ? 'white' : '#6b7280',
                        fontWeight: '600',
                        fontSize: '12px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {cat.icon} {cat.label}
                    </button>
                  ))}
                </div>

                {/* Shop Items Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                  {shopItems
                    .filter(item => shopFilter === 'all' || item.category === shopFilter)
                    .map(item => {
                      const canAfford = (currentUser.coins || 0) >= item.price;
                      return (
                        <div 
                          key={item.id}
                          style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '16px',
                            textAlign: 'center',
                            position: 'relative',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                            border: canAfford ? '2px solid #10b981' : '2px solid transparent'
                          }}
                        >
                          {/* Parent: Delete button */}
                          {currentUser.role === 'parent' && (
                            <button
                              onClick={() => {
                                if (window.confirm(`Remove "${item.name}" from shop?`)) {
                                  setShopItems(prev => prev.filter(i => i.id !== item.id));
                                }
                              }}
                              style={{
                                position: 'absolute',
                                top: '6px',
                                right: '6px',
                                background: '#fef2f2',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '4px 6px',
                                fontSize: '10px',
                                color: '#dc2626',
                                cursor: 'pointer'
                              }}
                            >
                              ✕
                            </button>
                          )}
                          
                          <div style={{ fontSize: '36px', marginBottom: '8px' }}>{item.icon}</div>
                          <div style={{ fontWeight: '700', color: '#1e1b4b', fontSize: '13px', marginBottom: '4px' }}>{item.name}</div>
                          <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '10px', minHeight: '28px' }}>{item.description}</div>
                          
                          <button
                            onClick={() => {
                              if (canAfford && currentUser.role !== 'parent') {
                                // Purchase item
                                setCurrentUser(prev => ({ ...prev, coins: prev.coins - item.price }));
                                setShopPurchases(prev => [{
                                  id: Date.now(),
                                  itemId: item.id,
                                  itemName: item.name,
                                  icon: item.icon,
                                  user: currentUser.name,
                                  price: item.price,
                                  purchasedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                                  status: 'pending'
                                }, ...prev]);
                                // Notify parents
                                familyMembers.filter(m => m.role === 'parent').forEach(parent => {
                                  addNotification(parent.name, {
                                    type: 'shop',
                                    from: currentUser.name,
                                    text: `redeemed "${item.name}" for ${item.price} coins`
                                  });
                                });
                                // Check for big_spender achievement
                                checkAchievements(currentUser.name, { hasRedeemed: true });
                                showNotification(`You got ${item.name}! 🎉`);
                              }
                            }}
                            disabled={!canAfford || currentUser.role === 'parent'}
                            style={{
                              width: '100%',
                              padding: '10px',
                              borderRadius: '10px',
                              border: 'none',
                              background: canAfford && currentUser.role !== 'parent' 
                                ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' 
                                : '#e5e7eb',
                              color: canAfford && currentUser.role !== 'parent' ? 'white' : '#9ca3af',
                              fontWeight: '700',
                              fontSize: '13px',
                              cursor: canAfford && currentUser.role !== 'parent' ? 'pointer' : 'not-allowed'
                            }}
                          >
                            🪙 {item.price} coins
                          </button>
                        </div>
                      );
                    })}
                </div>

                {/* Pending Redemptions (for parents) */}
                {currentUser.role === 'parent' && shopPurchases.filter(p => p.status === 'pending').length > 0 && (
                  <div style={styles.card}>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', marginBottom: '12px' }}>📋 Pending Redemptions</div>
                    {shopPurchases.filter(p => p.status === 'pending').map(purchase => {
                      const member = familyMembers.find(m => m.name === purchase.user);
                      return (
                        <div 
                          key={purchase.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px',
                            background: '#fef3c7',
                            borderRadius: '12px',
                            marginBottom: '8px'
                          }}
                        >
                          <span style={{ fontSize: '28px' }}>{purchase.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '700', color: '#1e1b4b', fontSize: '14px' }}>{purchase.itemName}</div>
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>
                              {member?.avatar} {purchase.user} • {purchase.purchasedAt}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setShopPurchases(prev => prev.map(p => 
                                p.id === purchase.id ? { ...p, status: 'redeemed' } : p
                              ));
                              addNotification(purchase.user, {
                                type: 'shop',
                                from: currentUser.name,
                                text: `approved your "${purchase.itemName}" reward! 🎉`
                              });
                              showNotification(`Marked ${purchase.itemName} as redeemed! ✅`);
                            }}
                            style={{
                              padding: '8px 12px',
                              background: '#10b981',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              fontWeight: '700',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            ✅ Done
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* My Rewards (for kids) */}
                {currentUser.role !== 'parent' && shopPurchases.filter(p => p.user === currentUser.name).length > 0 && (
                  <div style={styles.card}>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', marginBottom: '12px' }}>🎁 My Rewards</div>
                    {shopPurchases
                      .filter(p => p.user === currentUser.name)
                      .slice(0, 5)
                      .map(purchase => (
                        <div 
                          key={purchase.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px',
                            background: purchase.status === 'pending' ? '#fef3c7' : '#f0fdf4',
                            borderRadius: '10px',
                            marginBottom: '8px'
                          }}
                        >
                          <span style={{ fontSize: '24px' }}>{purchase.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', color: '#1e1b4b', fontSize: '13px' }}>{purchase.itemName}</div>
                            <div style={{ fontSize: '11px', color: '#6b7280' }}>{purchase.purchasedAt}</div>
                          </div>
                          <span style={{ 
                            padding: '4px 8px', 
                            borderRadius: '8px', 
                            fontSize: '11px', 
                            fontWeight: '600',
                            background: purchase.status === 'pending' ? '#fef3c7' : '#d1fae5',
                            color: purchase.status === 'pending' ? '#92400e' : '#065f46'
                          }}>
                            {purchase.status === 'pending' ? '⏳ Pending' : '✅ Redeemed'}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {walletTab === 'overview' && (
              <div>
                <div style={styles.card}>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', marginBottom: '12px' }}>📊 This Week</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ background: '#f3e8ff', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: '800', color: '#7c3aed' }}>{getWeeklyXp(currentUser.name)}</div>
                      <div style={{ fontSize: '12px', color: '#9333ea' }}>XP earned</div>
                    </div>
                    <div style={{ background: '#fef3c7', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: '800', color: '#d97706' }}>{getWeeklyCoins(currentUser.name)}</div>
                      <div style={{ fontSize: '12px', color: '#b45309' }}>Coins earned</div>
                    </div>
                  </div>
                </div>

                {/* Allowance Section - Different for kids vs parents */}
                <div style={styles.card}>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', marginBottom: '12px' }}>💵 Allowance</div>
                  
                  {currentUser.role !== 'parent' ? (
                    /* Kid View */
                    <div>
                      {/* Current Balance */}
                      <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: '13px', color: '#166534' }}>Your coins</div>
                            <div style={{ fontSize: '28px', fontWeight: '800', color: '#d97706' }}>🪙 {currentUser.coins || 0}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '13px', color: '#166534' }}>Worth</div>
                            <div style={{ fontSize: '28px', fontWeight: '800', color: '#10b981' }}>{settings.currencySymbol}{((currentUser.coins || 0) * (settings.coinValue || 0.10)).toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Pending Request Status */}
                      {allowanceRequests.some(r => r.from === currentUser.name && r.status === 'pending') ? (
                        <div style={{ background: '#fef3c7', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
                          <div style={{ fontWeight: '700', color: '#92400e', marginBottom: '4px' }}>Request Pending</div>
                          <div style={{ fontSize: '13px', color: '#a16207' }}>
                            Waiting for parent to pay {settings.currencySymbol}{(allowanceRequests.find(r => r.from === currentUser.name && r.status === 'pending')?.amount || 0).toFixed(2)}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            if (currentUser.coins > 0) {
                              const amount = (currentUser.coins || 0) * (settings.coinValue || 0.10);
                              const newRequest = {
                                id: Date.now(),
                                from: currentUser.name,
                                avatar: currentUser.avatar,
                                coins: currentUser.coins,
                                amount: amount,
                                status: 'pending',
                                requestedAt: 'Just now'
                              };
                              setAllowanceRequests(prev => [...prev, newRequest]);
                              // Notify parents
                              familyMembers.filter(m => m.role === 'parent').forEach(parent => {
                                addNotification(parent.name, {
                                  type: 'allowance',
                                  from: currentUser.name,
                                  text: `requested ${settings.currencySymbol}${amount.toFixed(2)} allowance (${currentUser.coins || 0} coins)`
                                });
                              });
                              showNotification('Allowance request sent to parents! 💰');
                            }
                          }}
                          disabled={currentUser.coins === 0}
                          style={{
                            width: '100%',
                            padding: '16px',
                            background: currentUser.coins > 0 ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' : '#e5e7eb',
                            color: currentUser.coins > 0 ? 'white' : '#9ca3af',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: '800',
                            fontSize: '16px',
                            cursor: currentUser.coins > 0 ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                        >
                          💸 Request {settings.currencySymbol}{((currentUser.coins || 0) * (settings.coinValue || 0.10)).toFixed(2)} Allowance
                        </button>
                      )}
                    </div>
                  ) : (
                    /* Parent View - Pending Requests */
                    <div>
                      {/* Automation Controls */}
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                        <button
                          onClick={() => setShowPayoutModal(true)}
                          style={{
                            flex: 1,
                            padding: '12px',
                            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontWeight: '700',
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          💸 Process Payouts
                        </button>
                        <button
                          onClick={() => setShowAllowanceSettingsModal(true)}
                          style={{
                            padding: '12px',
                            background: '#f3f4f6',
                            color: '#6b7280',
                            border: 'none',
                            borderRadius: '10px',
                            fontWeight: '700',
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}
                        >
                          ⚙️
                        </button>
                      </div>

                      {/* Quick Summary */}
                      <div style={{ 
                        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', 
                        borderRadius: '12px', 
                        padding: '14px', 
                        marginBottom: '16px',
                        border: '1px solid #bbf7d0'
                      }}>
                        <div style={{ fontSize: '12px', fontWeight: '600', color: '#166534', marginBottom: '8px' }}>💰 Ready to Pay Out</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: '24px', fontWeight: '800', color: '#10b981' }}>
                              {settings.currencySymbol}{familyMembers
                                .filter(m => m.role !== 'parent')
                                .reduce((sum, m) => sum + ((m.coins || 0) * (settings.coinValue || 0.10)), 0)
                                .toFixed(2)}
                            </div>
                            <div style={{ fontSize: '11px', color: '#166534' }}>
                              {familyMembers.filter(m => m.role !== 'parent').reduce((sum, m) => sum + (m.coins || 0), 0)} total coins
                            </div>
                          </div>
                          <div style={{ textAlign: 'right', fontSize: '12px', color: '#166534' }}>
                            {familyMembers.filter(m => m.role !== 'parent' && (m.coins || 0) > 0).length} kid(s)<br/>with coins
                          </div>
                        </div>
                      </div>

                      {allowanceRequests.filter(r => r.status === 'pending').length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '20px', background: '#f9fafb', borderRadius: '12px' }}>
                          <div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
                          <div style={{ color: '#6b7280', fontSize: '14px' }}>No pending allowance requests</div>
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>
                            {allowanceRequests.filter(r => r.status === 'pending').length} pending request(s)
                          </div>
                          {allowanceRequests.filter(r => r.status === 'pending').map(request => {
                            const member = familyMembers.find(m => m.name === request.from);
                            return (
                              <div 
                                key={request.id}
                                style={{
                                  background: '#fef3c7',
                                  borderRadius: '12px',
                                  padding: '16px',
                                  marginBottom: '12px',
                                  border: '2px solid #f59e0b'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                  <span style={{ fontSize: '32px' }}>{member?.avatar || '👤'}</span>
                                  <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '700', color: '#1e1b4b' }}>{request.from}</div>
                                    <div style={{ fontSize: '12px', color: '#92400e' }}>{request.requestedAt}</div>
                                  </div>
                                  <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: '800', color: '#d97706', fontSize: '18px' }}>🪙 {request.coins}</div>
                                    <div style={{ fontWeight: '800', color: '#10b981', fontSize: '18px' }}>{settings.currencySymbol}{request.amount.toFixed(2)}</div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    // Mark as paid
                                    setAllowanceRequests(prev => prev.filter(r => r.id !== request.id));
                                    // Add to history
                                    setAllowanceHistory(prev => [{
                                      id: Date.now(),
                                      user: request.from,
                                      coins: request.coins,
                                      amount: request.amount,
                                      paidAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                                      paidBy: currentUser.name
                                    }, ...prev]);
                                    // Reset the kid's coins
                                    setFamilyMembers(prev => prev.map(m => 
                                      m.name === request.from ? { ...m, coins: 0 } : m
                                    ));
                                    // If the current display is that kid, update too
                                    if (currentUser.name === request.from) {
                                      setCurrentUser(prev => ({ ...prev, coins: 0 }));
                                    }
                                    // Notify the kid
                                    addNotification(request.from, {
                                      type: 'allowance',
                                      from: currentUser.name,
                                      text: `paid your allowance! ${settings.currencySymbol}${request.amount.toFixed(2)} 💰`
                                    });
                                    showNotification(`Paid ${request.from} ${settings.currencySymbol}${request.amount.toFixed(2)}! ✅`);
                                  }}
                                  style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: '#10b981',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '10px',
                                    fontWeight: '700',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px'
                                  }}
                                >
                                  ✅ Mark as Paid
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Allowance History */}
                <div style={styles.card}>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', marginBottom: '12px' }}>📜 Payment History</div>
                  {allowanceHistory.filter(h => currentUser.role === 'parent' || h.user === currentUser.name).length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '16px', color: '#6b7280', fontSize: '14px' }}>
                      No payment history yet
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {allowanceHistory
                        .filter(h => currentUser.role === 'parent' || h.user === currentUser.name)
                        .slice(0, 5)
                        .map(payment => {
                          const member = familyMembers.find(m => m.name === payment.user);
                          return (
                            <div 
                              key={payment.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px',
                                background: '#f9fafb',
                                borderRadius: '10px'
                              }}
                            >
                              <span style={{ fontSize: '24px' }}>{member?.avatar || '👤'}</span>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', color: '#1e1b4b', fontSize: '13px' }}>
                                  {currentUser.role === 'parent' ? payment.user : 'You'} received
                                </div>
                                <div style={{ fontSize: '11px', color: '#6b7280' }}>{payment.paidAt} • Paid by {payment.paidBy}</div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: '700', color: '#10b981', fontSize: '14px' }}>{settings.currencySymbol}{payment.amount.toFixed(2)}</div>
                                <div style={{ fontSize: '11px', color: '#d97706' }}>{payment.coins} coins</div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>

                {/* Weekly Allowance Info (moved below) */}
                <div style={styles.card}>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', marginBottom: '12px' }}>📅 Weekly Allowance Bonus</div>
                  <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#166534' }}>Base allowance</span>
                      <span style={{ fontWeight: '700', color: '#166534' }}>{settings.currencySymbol}{settings.baseAllowanceAmount}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#166534' }}>Tier bonus ({currentWeeklyTier.name})</span>
                      <span style={{ fontWeight: '700', color: '#10b981' }}>+{settings.currencySymbol}{currentWeeklyTier.allowanceBonus}</span>
                    </div>
                    <div style={{ borderTop: '1px solid #d1fae5', paddingTop: '8px', marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '800', color: '#166534' }}>Potential Total</span>
                      <span style={{ fontWeight: '900', color: '#10b981', fontSize: '18px' }}>{settings.currencySymbol}{settings.baseAllowanceAmount + currentWeeklyTier.allowanceBonus}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '8px', textAlign: 'center' }}>
                    💡 Earn more by reaching higher weekly tiers!
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1e1b4b' }}>📋 Tasks & Chores</h1>
              <div style={{ display: 'flex', gap: '8px' }}>
                {currentUser.role !== 'parent' && (
                  <button
                    onClick={() => setShowAddPersonalTaskModal(true)}
                    style={{
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    + My Task
                  </button>
                )}
                {currentUser.role === 'parent' && (
                  <>
                    {(tasks.filter(t => t.status === 'pending_approval').length + familyWins.filter(w => w.status === 'pending').length) > 0 && (
                      <button
                        onClick={() => setShowPendingApprovalsModal(true)}
                        style={{
                          background: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px',
                          padding: '8px 14px',
                          fontSize: '13px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        ⏳ {tasks.filter(t => t.status === 'pending_approval').length + familyWins.filter(w => w.status === 'pending').length}
                      </button>
                    )}
                    <button
                      onClick={() => setShowAddTaskModal(true)}
                      style={{
                        background: '#7c3aed',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '8px 14px',
                        fontSize: '13px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      + Add Task
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* My Tasks */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1e1b4b' }}>My Tasks</h2>
                <span style={{ background: '#7c3aed', color: 'white', padding: '4px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>
                  {tasks.filter(t => t.status === 'open' && t.assignedTo === currentUser.name).length} to do
                </span>
              </div>
              
              {tasks.filter(t => (t.status === 'open' || t.status === 'pending_approval') && t.assignedTo === currentUser.name).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px', background: 'white', borderRadius: '16px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '32px' }}>✨</span>
                  <div style={{ fontWeight: '600', color: '#6b7280', marginTop: '8px', fontSize: '14px' }}>No tasks assigned to you</div>
                </div>
              ) : (
                tasks.filter(t => (t.status === 'open' || t.status === 'pending_approval') && t.assignedTo === currentUser.name).map(task => (
                  <div 
                    key={task.id} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      padding: '14px', 
                      background: task.status === 'pending_approval' ? '#fef3c7' : 'white', 
                      borderRadius: '14px', 
                      marginBottom: '10px',
                      borderLeft: task.isMandatory ? '4px solid #f59e0b' : '4px solid transparent',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
                    }}
                  >
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if (task.status === 'open') {
                          if (currentUser.role === 'parent') {
                            completeTask(task.id);
                          } else {
                            setTaskToComplete(task);
                            setPhotoProofData(null);
                            setShowCompleteTaskModal(true);
                          }
                        }
                      }}
                      disabled={task.status === 'pending_approval'}
                      style={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '12px', 
                        border: task.status === 'pending_approval' ? '2px solid #f59e0b' : '2px solid #7c3aed', 
                        background: task.status === 'pending_approval' ? '#fef3c7' : 'white',
                        cursor: task.status === 'pending_approval' ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '700'
                      }}
                    >
                      {task.status === 'pending_approval' ? '⏳' : ''}
                    </button>
                    <div 
                      onClick={() => { setSelectedTask(task); setShowTaskDetailModal(true); }}
                      style={{ flex: 1, cursor: 'pointer' }}
                    >
                      <div style={{ fontWeight: '700', color: '#1e1b4b', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        {task.isMandatory && <span style={{ fontSize: '12px' }}>⭐</span>}
                        {task.title}
                        {task.repeat && task.repeat !== 'none' && (
                          <span style={{ fontSize: '10px', background: '#e0e7ff', color: '#4f46e5', padding: '2px 6px', borderRadius: '6px' }}>
                            🔄 {task.repeat}
                          </span>
                        )}
                        {task.status === 'pending_approval' && (
                          <span style={{ fontSize: '10px', background: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '6px' }}>
                            ⏳ Awaiting approval
                          </span>
                        )}
                        {task.photoProof && (
                          <span style={{ fontSize: '10px', background: '#dbeafe', color: '#1d4ed8', padding: '2px 6px', borderRadius: '6px' }}>
                            📷
                          </span>
                        )}
                        {taskComments[task.id]?.length > 0 && (
                          <span style={{ fontSize: '11px', background: '#e0e7ff', color: '#4f46e5', padding: '2px 6px', borderRadius: '6px' }}>
                            💬 {taskComments[task.id].length}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280', display: 'flex', gap: '8px', marginTop: '4px' }}>
                        <span style={{ color: '#7c3aed', fontWeight: '600' }}>+{task.xp} XP</span>
                        {task.isMandatory && (
                          <span style={{ color: '#d97706', fontWeight: '600' }}>+{Math.floor(task.xp / 15)} 🪙</span>
                        )}
                      </div>
                    </div>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{task.dueDate}</span>
                  </div>
                ))
              )}
            </div>

            {/* Claimable Tasks */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1e1b4b' }}>Claimable</h2>
                <span style={{ background: '#f59e0b', color: 'white', padding: '4px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>
                  {tasks.filter(t => t.status === 'claimable').length} available
                </span>
              </div>
              
              {tasks.filter(t => t.status === 'claimable').length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px', background: 'white', borderRadius: '16px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '32px' }}>🎯</span>
                  <div style={{ fontWeight: '600', color: '#6b7280', marginTop: '8px', fontSize: '14px' }}>No tasks to claim right now</div>
                </div>
              ) : (
                tasks.filter(t => t.status === 'claimable').map(task => (
                  <div 
                    key={task.id} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      padding: '14px', 
                      background: 'white', 
                      borderRadius: '14px', 
                      marginBottom: '10px',
                      borderLeft: '4px solid #f59e0b',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
                    }}
                  >
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setTasks(tasks.map(t => t.id === task.id ? { ...t, status: 'open', assignedTo: currentUser.name } : t));
                        // Update claimed tasks count for achievements
                        const currentStats = userAchievements[currentUser.name]?.stats || {};
                        const newClaimedTasks = (currentStats.claimedTasks || 0) + 1;
                        setUserAchievements(prev => ({
                          ...prev,
                          [currentUser.name]: {
                            ...prev[currentUser.name],
                            stats: { ...prev[currentUser.name]?.stats, claimedTasks: newClaimedTasks }
                          }
                        }));
                        checkAchievements(currentUser.name, { claimedTasks: newClaimedTasks });
                        showNotification('Task claimed! 💪');
                      }}
                      style={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '12px', 
                        border: '2px solid #f59e0b', 
                        background: '#fef3c7',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#d97706'
                      }}
                    >
                      ?
                    </button>
                    <div 
                      onClick={() => { setSelectedTask(task); setShowTaskDetailModal(true); }}
                      style={{ flex: 1, cursor: 'pointer' }}
                    >
                      <div style={{ fontWeight: '700', color: '#1e1b4b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {task.isFamily && <span style={{ fontSize: '12px' }}>👨‍👩‍👧‍👦</span>}
                        {task.title}
                        {taskComments[task.id]?.length > 0 && (
                          <span style={{ fontSize: '11px', background: '#e0e7ff', color: '#4f46e5', padding: '2px 6px', borderRadius: '6px', marginLeft: '4px' }}>
                            💬 {taskComments[task.id].length}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280', display: 'flex', gap: '8px', marginTop: '4px' }}>
                        <span style={{ color: '#7c3aed', fontWeight: '600' }}>+{task.xp} XP</span>
                        {['chore', 'responsibility'].includes(task.category) && (
                          <span style={{ color: '#d97706', fontWeight: '600' }}>+{Math.floor(task.xp / 15)} 🪙</span>
                        )}
                      </div>
                    </div>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{task.dueDate}</span>
                  </div>
                ))
              )}
            </div>

            {/* Completed Tasks - This Week */}
            {tasks.filter(t => t.status === 'completed' && ['Today', 'Yesterday'].includes(t.dueDate)).length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1e1b4b' }}>Completed This Week</h2>
                  <span style={{ fontSize: '13px', color: '#10b981', fontWeight: '600' }}>✓ {tasks.filter(t => t.status === 'completed' && ['Today', 'Yesterday'].includes(t.dueDate)).length} done</span>
                </div>
                {tasks.filter(t => t.status === 'completed' && ['Today', 'Yesterday'].includes(t.dueDate)).map(task => (
                  <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'white', borderRadius: '12px', marginBottom: '8px', opacity: 0.7 }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '10px', background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✓</div>
                    <span style={{ textDecoration: 'line-through', color: '#6b7280', flex: 1 }}>{task.title}</span>
                    <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '600' }}>+{task.xp} XP</span>
                  </div>
                ))}
              </div>
            )}

            {/* Completed Tasks - Past */}
            {tasks.filter(t => t.status === 'completed' && !['Today', 'Yesterday'].includes(t.dueDate)).length > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#9ca3af' }}>Past</h2>
                  <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '600' }}>{tasks.filter(t => t.status === 'completed' && !['Today', 'Yesterday'].includes(t.dueDate)).length} tasks</span>
                </div>
                {tasks.filter(t => t.status === 'completed' && !['Today', 'Yesterday'].includes(t.dueDate)).map(task => (
                  <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'white', borderRadius: '12px', marginBottom: '8px', opacity: 0.5 }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '10px', background: '#9ca3af', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✓</div>
                    <span style={{ textDecoration: 'line-through', color: '#9ca3af', flex: 1 }}>{task.title}</span>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>{task.dueDate}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Balance (Self-Care) Tab */}
        {activeTab === 'selfcare' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1e1b4b' }}>🌿 Balance</h1>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>Take care of yourself today</p>
            </div>

            {/* Today's Stats */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <div style={{ flex: 1, background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#059669' }}>
                  {selfCareActivities.reduce((sum, a) => sum + a.todayCount, 0)}
                </div>
                <div style={{ fontSize: '12px', color: '#047857', fontWeight: '600' }}>Activities Today</div>
              </div>
              <div style={{ flex: 1, background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#7c3aed' }}>
                  {selfCareActivities.reduce((sum, a) => sum + (a.todayCount * a.xp), 0)}
                </div>
                <div style={{ fontSize: '12px', color: '#6d28d9', fontWeight: '600' }}>XP Earned</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {selfCareActivities.map(activity => (
                <div 
                  key={activity.id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    cursor: 'pointer',
                    position: 'relative',
                    border: activity.todayCount > 0 ? '2px solid #10b981' : '2px solid transparent'
                  }}
                  onClick={() => {
                    setSelectedSelfCareActivity(activity);
                    setShowSelfCareModal(true);
                  }}
                >
                  {activity.todayCount > 0 && (
                    <div style={{ 
                      position: 'absolute', 
                      top: '-8px', 
                      right: '-8px', 
                      background: '#10b981', 
                      color: 'white', 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '12px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '800'
                    }}>
                      {activity.todayCount}
                    </div>
                  )}
                  <div style={{ fontSize: '36px', marginBottom: '8px' }}>{activity.icon}</div>
                  <div style={{ fontWeight: '700', color: '#1e1b4b', fontSize: '13px', marginBottom: '4px' }}>{activity.name}</div>
                  <div style={{ background: '#d1fae5', borderRadius: '8px', padding: '4px 8px', display: 'inline-block' }}>
                    <span style={{ color: '#10b981', fontWeight: '700', fontSize: '12px' }}>+{activity.xp} XP</span>
                  </div>
                  {activity.todayCount > 0 && (
                    <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '6px' }}>
                      Tap to log again
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Growth Tab */}
        {activeTab === 'growth' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1e1b4b' }}>🌱 Growth</h1>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>Focus on what matters to you</p>
            </div>

            {/* Theme Selector Icons */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              background: 'white', 
              borderRadius: '16px', 
              padding: '12px 16px', 
              marginBottom: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              {growthThemes.map(theme => (
                <div 
                  key={theme.id}
                  onClick={() => setCurrentTheme(theme)}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    cursor: 'pointer',
                    background: currentTheme?.id === theme.id ? theme.color + '20' : 'transparent',
                    border: currentTheme?.id === theme.id ? `2px solid ${theme.color}` : '2px solid transparent',
                    transition: 'all 0.2s'
                  }}
                  title={theme.name}
                >
                  {theme.icon}
                </div>
              ))}
            </div>

            {/* Current Theme Details */}
            {currentTheme && (
              <>
                <div style={{ 
                  background: 'white', 
                  borderRadius: '20px', 
                  padding: '20px', 
                  marginBottom: '20px',
                  borderLeft: `4px solid ${currentTheme.color}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '36px' }}>{currentTheme.icon}</span>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: '800', color: currentTheme.color }}>{currentTheme.name}</div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>{currentTheme.description}</div>
                    </div>
                  </div>
                </div>

                {/* Theme Activities */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b' }}>Today's Activities</div>
                  <div style={{ fontSize: '13px', color: '#10b981', fontWeight: '600' }}>
                    {themeActivities.filter(a => a.themeId === currentTheme.id && a.todayCount > 0).length}/{themeActivities.filter(a => a.themeId === currentTheme.id).length} done
                  </div>
                </div>
                
                {themeActivities.filter(a => a.themeId === currentTheme.id).map(activity => (
                  <div 
                    key={activity.id}
                    style={{
                      background: 'white',
                      borderRadius: '14px',
                      padding: '14px',
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
                    }}
                  >
                    <div 
                      onClick={() => {
                        setSelectedThemeActivity(activity);
                        setShowThemeActivityModal(true);
                      }}
                      style={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '10px', 
                        border: `2px solid ${currentTheme.color}`,
                        background: activity.todayCount > 0 ? currentTheme.color : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: activity.todayCount > 0 ? 'white' : currentTheme.color,
                        fontWeight: '800',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      {activity.todayCount > 0 ? '✓' : ''}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', color: activity.todayCount > 0 ? '#9ca3af' : '#1e1b4b', textDecoration: activity.todayCount > 0 ? 'line-through' : 'none' }}>{activity.title}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>+{activity.xp} XP</div>
                    </div>
                    {activity.todayCount > 0 && (
                      <button
                        onClick={() => {
                          setSelectedThemeActivity(activity);
                          setShowThemeActivityModal(true);
                        }}
                        style={{
                          background: currentTheme.color + '20',
                          color: currentTheme.color,
                          border: 'none',
                          borderRadius: '8px',
                          padding: '6px 10px',
                          fontWeight: '700',
                          fontSize: '16px',
                          cursor: 'pointer'
                        }}
                      >
                        +
                      </button>
                    )}
                    {activity.todayCount === 0 && (
                      <button
                        onClick={() => {
                          setSelectedThemeActivity(activity);
                          setShowThemeActivityModal(true);
                        }}
                        style={{
                          background: currentTheme.color,
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px',
                          padding: '8px 14px',
                          fontWeight: '700',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        Do
                      </button>
                    )}
                  </div>
                ))}

                {/* Add New Activity */}
                {!showAddActivityInput ? (
                  <button
                    onClick={() => setShowAddActivityInput(true)}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: '#f9fafb',
                      border: '2px dashed #d1d5db',
                      borderRadius: '14px',
                      fontWeight: '700',
                      fontSize: '14px',
                      color: '#6b7280',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginBottom: '20px'
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>+</span> Add Custom Activity
                  </button>
                ) : (
                  <div style={{ background: 'white', borderRadius: '14px', padding: '14px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <input
                      type="text"
                      placeholder="Activity name..."
                      value={newActivityTitle}
                      onChange={(e) => setNewActivityTitle(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '10px',
                        border: '2px solid #e5e7eb',
                        fontSize: '14px',
                        marginBottom: '10px',
                        outline: 'none'
                      }}
                      autoFocus
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => { setShowAddActivityInput(false); setNewActivityTitle(''); }}
                        style={{ flex: 1, padding: '10px', background: '#f3f4f6', border: 'none', borderRadius: '10px', fontWeight: '600', color: '#6b7280', cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (newActivityTitle.trim()) {
                            setThemeActivities([...themeActivities, {
                              id: Date.now(),
                              themeId: currentTheme.id,
                              title: newActivityTitle,
                              xp: 15,
                              todayCount: 0,
                              todayNotes: []
                            }]);
                            setNewActivityTitle('');
                            setShowAddActivityInput(false);
                            showNotification('Activity added! 🎯');
                          }
                        }}
                        style={{ flex: 1, padding: '10px', background: currentTheme.color, border: 'none', borderRadius: '10px', fontWeight: '600', color: 'white', cursor: 'pointer' }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}

                {/* Suggested Activities */}
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#6b7280', marginBottom: '12px' }}>💡 Suggested Activities</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {currentTheme.suggestedTasks.map((task, i) => (
                    <div 
                      key={i}
                      style={{
                        background: '#f3f4f6',
                        borderRadius: '20px',
                        padding: '8px 14px',
                        fontSize: '13px',
                        color: '#4b5563',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                      onClick={() => {
                        // Check if already exists
                        const exists = themeActivities.some(a => a.themeId === currentTheme.id && a.title === task);
                        if (!exists) {
                          setThemeActivities([...themeActivities, {
                            id: Date.now(),
                            themeId: currentTheme.id,
                            title: task,
                            xp: 15,
                            todayCount: 0,
                            todayNotes: []
                          }]);
                          showNotification('Activity added! 🎯');
                        } else {
                          showNotification('Already in your list!');
                        }
                      }}
                    >
                      <span style={{ color: currentTheme.color }}>+</span> {task}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Family Tab */}
        {activeTab === 'family' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1e1b4b' }}>👨‍👩‍👧‍👦 Family</h1>
            </div>

            {/* Parent Controls - Family Meeting & Dashboard */}
            {currentUser.role === 'parent' && (
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                <button
                  onClick={() => setShowFamilyMeetingModal(true)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '14px',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)'
                  }}
                >
                  📋 Weekly Meeting
                </button>
                <button
                  onClick={() => setShowParentDashboard(true)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '14px',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  📊 Dashboard
                </button>
              </div>
            )}

            {/* Family Goals */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b' }}>🎯 Family Goals</div>
                {currentUser.role === 'parent' && (
                  <button
                    onClick={() => {
                      setEditGoalName('');
                      setEditGoalIcon('🎯');
                      setEditGoalTarget(10000);
                      setEditingGoal(null);
                      setShowAddGoalModal(true);
                    }}
                    style={{
                      background: '#f59e0b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    + Add Goal
                  </button>
                )}
              </div>
              
              {familyGoals.map(goal => (
                <div 
                  key={goal.id}
                  style={{ 
                    ...styles.card, 
                    background: goal.currentXp >= goal.targetXp 
                      ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' 
                      : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', 
                    border: goal.currentXp >= goal.targetXp 
                      ? '2px solid #10b981'
                      : '2px solid #f59e0b', 
                    position: 'relative',
                    marginBottom: '12px'
                  }}
                >
                  {goal.currentXp >= goal.targetXp && (
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: '700'
                    }}>
                      🎉 REACHED!
                    </div>
                  )}
                  {currentUser.role === 'parent' && (
                    <button
                      onClick={() => {
                        setEditingGoal(goal);
                        setEditGoalName(goal.name);
                        setEditGoalIcon(goal.icon);
                        setEditGoalTarget(goal.targetXp);
                        setShowEditGoalModal(true);
                      }}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(255,255,255,0.7)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '4px 8px',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}
                    >
                      ✏️
                    </button>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '32px' }}>{goal.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '15px', fontWeight: '800', color: '#78350f' }}>{goal.name}</div>
                      <div style={{ fontSize: '12px', color: '#92400e' }}>
                        {goal.currentXp.toLocaleString()} / {goal.targetXp.toLocaleString()} XP
                      </div>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: goal.currentXp >= goal.targetXp ? '#10b981' : '#92400e' }}>
                      {Math.min(100, Math.round((goal.currentXp / goal.targetXp) * 100))}%
                    </span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '6px', height: '8px', overflow: 'hidden', marginBottom: '12px' }}>
                    <div style={{ 
                      background: goal.currentXp >= goal.targetXp ? '#10b981' : '#f59e0b', 
                      height: '100%', 
                      width: `${Math.min(100, (goal.currentXp / goal.targetXp) * 100)}%`, 
                      borderRadius: '6px' 
                    }}></div>
                  </div>
                  
                  {/* Contributors */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                    {Object.entries(goal.contributions || {}).filter(([_, xp]) => xp > 0).map(([name, xp]) => {
                      const member = familyMembers.find(m => m.name === name);
                      return (
                        <div 
                          key={name}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: 'rgba(255,255,255,0.7)',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '11px'
                          }}
                        >
                          <span>{member?.avatar || '👤'}</span>
                          <span style={{ color: '#78350f', fontWeight: '600' }}>{xp.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Contribute Button */}
                  {goal.currentXp < goal.targetXp && (
                    <button
                      onClick={() => {
                        setContributeGoal(goal);
                        setContributeAmount(Math.min(currentUser.xpBank, 50));
                        setShowContributeModal(true);
                      }}
                      disabled={currentUser.xpBank === 0}
                      style={{
                        width: '100%',
                        padding: '10px',
                        background: currentUser.xpBank > 0 ? '#10b981' : '#d1d5db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: currentUser.xpBank > 0 ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      🎁 Contribute ({currentUser.xpBank} XP available)
                    </button>
                  )}
                </div>
              ))}
              
              {familyGoals.length === 0 && (
                <div style={{ textAlign: 'center', padding: '24px', background: '#fef3c7', borderRadius: '16px', color: '#92400e' }}>
                  No family goals yet. {currentUser.role === 'parent' ? 'Add one!' : 'Ask a parent to add one!'}
                </div>
              )}
            </div>

            {/* Family Wins / Celebrations */}
            <div style={{ ...styles.card }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b' }}>🎉 Family Wins</div>
                <button
                  onClick={() => setShowAddWinModal(true)}
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  + Share Win
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {familyWins
                  .filter(win => win.status === 'approved' || win.from === currentUser.name || currentUser.role === 'parent')
                  .slice(0, 4).map(win => {
                  const userAlreadyReacted = win.reactions.some(r => r.user === currentUser.name);
                  const isPending = win.status === 'pending';
                  return (
                  <div key={win.id} style={{ 
                    background: isPending ? '#fef3c7' : '#fffbeb', 
                    borderRadius: '12px', 
                    padding: '12px', 
                    border: isPending ? '2px solid #f59e0b' : '1px solid #fde68a',
                    opacity: isPending && win.from !== currentUser.name ? 0.8 : 1
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '28px' }}>{win.avatar}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '700', color: '#1e1b4b', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {win.from}
                          {isPending && (
                            <span style={{ fontSize: '10px', background: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '6px', fontWeight: '600' }}>
                              ⏳ Pending
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '11px', color: '#92400e' }}>{win.timestamp}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#1e1b4b', marginBottom: '8px' }}>{win.text}</div>
                    {!isPending && (
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      {['🎉', '❤️', '⭐', '💪'].map(emoji => {
                        const emojiCount = win.reactions.filter(r => r.emoji === emoji).length;
                        const userReactedWithThis = win.reactions.some(r => r.emoji === emoji && r.user === currentUser.name);
                        return (
                        <button
                          key={emoji}
                          onClick={() => {
                            if (userAlreadyReacted || win.from === currentUser.name) return;
                            setFamilyWins(familyWins.map(w => 
                              w.id === win.id 
                                ? { ...w, reactions: [...w.reactions, {emoji, user: currentUser.name}] }
                                : w
                            ));
                            addNotification(win.from, {
                              type: 'reaction',
                              from: currentUser.name,
                              text: `reacted ${emoji} to your win`
                            });
                          }}
                          disabled={userAlreadyReacted || win.from === currentUser.name}
                          style={{
                            background: userReactedWithThis ? '#fde68a' : emojiCount > 0 ? '#fef3c7' : '#f9fafb',
                            border: userReactedWithThis ? '2px solid #f59e0b' : 'none',
                            borderRadius: '8px',
                            padding: '4px 8px',
                            cursor: (userAlreadyReacted || win.from === currentUser.name) ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            opacity: (userAlreadyReacted && !userReactedWithThis) ? 0.5 : 1
                          }}
                        >
                          {emoji}
                          {emojiCount > 0 && (
                            <span style={{ fontSize: '11px', color: '#92400e', fontWeight: '600' }}>
                              {emojiCount}
                            </span>
                          )}
                        </button>
                        );
                      })}
                      {userAlreadyReacted && (
                        <span style={{ fontSize: '10px', color: '#9ca3af', marginLeft: '4px' }}>✓ reacted</span>
                      )}
                    </div>
                    )}
                    {isPending && win.from === currentUser.name && (
                      <div style={{ fontSize: '12px', color: '#92400e', fontStyle: 'italic' }}>
                        Waiting for parent approval...
                      </div>
                    )}
                  </div>
                ))}
              </div>
              </div>
            </div>

            {/* Send Recognition */}
            <div style={{ ...styles.card }}>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', marginBottom: '12px' }}>💜 Send Recognition</div>
              <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>Appreciate a family member for something they did!</p>
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                {familyMembers.filter(m => m.name !== currentUser.name).map(member => (
                  <div 
                    key={member.name}
                    onClick={() => setSelectedRecognitionMember(selectedRecognitionMember?.name === member.name ? null : member)}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '12px 8px',
                      background: selectedRecognitionMember?.name === member.name ? '#f3e8ff' : '#f9fafb',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      border: selectedRecognitionMember?.name === member.name ? '2px solid #7c3aed' : '2px solid transparent'
                    }}
                  >
                    <div style={{ fontSize: '28px' }}>{member.avatar}</div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e1b4b', marginTop: '4px' }}>{member.name}</div>
                  </div>
                ))}
              </div>
              
              {selectedRecognitionMember && (
                <>
                  <input
                    type="text"
                    placeholder={`What did ${selectedRecognitionMember.name} do well?`}
                    value={recognitionMessage}
                    onChange={(e) => setRecognitionMessage(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '2px solid #e5e7eb',
                      fontSize: '14px',
                      marginBottom: '12px',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={() => {
                      if (recognitionMessage.trim()) {
                        setRecentRecognitions([
                          { id: Date.now(), from: currentUser.name, to: selectedRecognitionMember.name, reason: recognitionMessage, xp: 10 },
                          ...recentRecognitions
                        ]);
                        setCurrentUser(prev => ({ ...prev, xp: prev.xp + 10 }));
                        
                        // Notify the recipient
                        addNotification(selectedRecognitionMember.name, {
                          type: 'recognition',
                          from: currentUser.name,
                          text: `sent you recognition: "${recognitionMessage.trim().substring(0, 40)}${recognitionMessage.length > 40 ? '...' : ''}"`
                        });
                        
                        showNotification(`💜 Recognition sent to ${selectedRecognitionMember.name}! +10 XP`);
                        setRecognitionMessage('');
                        setSelectedRecognitionMember(null);
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: '700',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    Send Recognition (+10 XP)
                  </button>
                </>
              )}
            </div>

            {/* Recent Recognitions */}
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', marginBottom: '12px' }}>Recent Love 💕</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {recentRecognitions.slice(0, 5).map(rec => (
                <div key={rec.id} style={{ background: 'white', borderRadius: '12px', padding: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#7c3aed' }}>{rec.from} → {rec.to}</span>
                    <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>+{rec.xp} XP</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#4b5563' }}>{rec.reason}</div>
                </div>
              ))}
            </div>

            {/* Family Members */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b' }}>Family Members</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {currentUser.role === 'parent' && (
                  <button
                    onClick={() => {
                      setOnboardingStep(1);
                      setOnboardingData({
                        familyName: '',
                        parentName: '',
                        parentAvatar: '👩',
                        kids: [],
                        coinValue: 0.10,
                        currencySymbol: '$',
                        firstGoalName: '',
                        firstGoalIcon: '🏖️',
                        firstGoalXp: 10000,
                        selectedChores: []
                      });
                      setShowOnboarding(true);
                    }}
                    style={{
                      background: '#f3f4f6',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '8px 10px',
                      fontSize: '11px',
                      color: '#6b7280',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    🔄 Setup
                  </button>
                )}
                <button
                  onClick={() => setShowAddMemberModal(true)}
                  style={{
                    background: '#7c3aed',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  + Add
                </button>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>Tap a member to switch users</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {familyMembers.map(member => (
                <div 
                  key={member.name} 
                  style={{ 
                    background: currentUser.name === member.name ? 'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%)' : 'white', 
                    borderRadius: '14px', 
                    padding: '14px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                    border: currentUser.name === member.name ? '2px solid #7c3aed' : '2px solid transparent'
                  }}
                >
                  <div 
                    onClick={() => {
                      // Save current user's state back to familyMembers
                      setFamilyMembers(prev => prev.map(m => 
                        m.name === currentUser.name 
                          ? { ...m, xp: currentUser.xp, xpBank: currentUser.xpBank, coins: currentUser.coins, savings: currentUser.savings, level: currentUser.level, streak: currentUser.streak }
                          : m
                      ));
                      setCurrentUser({...member, coins: member.coins || 0, xpBank: member.xpBank || 0, savings: member.savings || 0, streak: member.streak || 0});
                      showNotification(`Switched to ${member.name} 👋`);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, cursor: 'pointer' }}
                  >
                    <span style={{ fontSize: '36px' }}>{member.avatar}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', color: '#1e1b4b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {member.name}
                        {currentUser.name === member.name && (
                          <span style={{ fontSize: '10px', background: '#7c3aed', color: 'white', padding: '2px 6px', borderRadius: '6px' }}>YOU</span>
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Level {member.level} • {member.xp} XP</div>
                    </div>
                  </div>
                  <div style={{ background: '#f3e8ff', padding: '4px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: '700', color: '#7c3aed' }}>
                    {member.role}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingMember(member);
                      setEditMemberName(member.name);
                      setEditMemberAvatar(member.avatar);
                      setEditMemberRole(member.role);
                      setShowEditMemberModal(true);
                    }}
                    style={{
                      background: '#f3f4f6',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    ✏️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Navigation */}
      <nav style={styles.navBar}>
        {[
          { id: 'home', icon: '🏠', label: 'Home' },
          { id: 'tasks', icon: '📋', label: 'Tasks' },
          { id: 'selfcare', icon: '🌿', label: 'Balance' },
          { id: 'growth', icon: '🌱', label: 'Growth' },
          { id: 'family', icon: '👨‍👩‍👧‍👦', label: 'Family' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{ ...styles.navItem, ...(activeTab === item.id ? styles.navItemActive : {}) }}
          >
            <span style={{ fontSize: '24px' }}>{item.icon}</span>
            <span style={{ fontWeight: activeTab === item.id ? '700' : '400' }}>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Gratitude Journal Modal */}
      {showGratitudeModal && (
        <div style={styles.modalOverlay} onClick={() => setShowGratitudeModal(false)}>
          <div style={{ ...styles.modal, textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📝</div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e1b4b', marginBottom: '8px' }}>Gratitude Journal</h2>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>What are you grateful for today?</p>
            
            <textarea
              placeholder="Write 3 things you're grateful for..."
              value={gratitudeEntry}
              onChange={(e) => setGratitudeEntry(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                fontSize: '14px',
                minHeight: '120px',
                resize: 'none',
                marginBottom: '16px',
                outline: 'none'
              }}
            />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => { setShowGratitudeModal(false); setGratitudeEntry(''); }}
                style={{ flex: 1, padding: '12px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (gratitudeEntry.trim()) {
                    setCurrentUser(prev => ({ ...prev, xp: prev.xp + 15 }));
                    showNotification('+15 XP for gratitude journal! 🙏');
                    setShowGratitudeModal(false);
                    setGratitudeEntry('');
                  }
                }}
                style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)', border: 'none', borderRadius: '12px', fontWeight: '700', color: 'white', cursor: 'pointer' }}
              >
                Save (+15 XP)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Daily Reflection Modal */}
      {showReflectionModal && (
        <div style={styles.modalOverlay} onClick={() => setShowReflectionModal(false)}>
          <div style={{ ...styles.modal, textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>✨</div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e1b4b', marginBottom: '8px' }}>Daily Reflection</h2>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>How was your day? What did you learn?</p>
            
            <textarea
              placeholder="Reflect on your day..."
              value={reflectionEntry}
              onChange={(e) => setReflectionEntry(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                fontSize: '14px',
                minHeight: '120px',
                resize: 'none',
                marginBottom: '16px',
                outline: 'none'
              }}
            />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => { setShowReflectionModal(false); setReflectionEntry(''); }}
                style={{ flex: 1, padding: '12px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (reflectionEntry.trim()) {
                    setCurrentUser(prev => ({ ...prev, xp: prev.xp + 10 }));
                    showNotification('+10 XP for daily reflection! ✨');
                    setShowReflectionModal(false);
                    setReflectionEntry('');
                  }
                }}
                style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)', border: 'none', borderRadius: '12px', fontWeight: '700', color: 'white', cursor: 'pointer' }}
              >
                Save (+10 XP)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Family Member Modal */}
      {showAddMemberModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddMemberModal(false)}>
          <div style={{ ...styles.modal, textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>👨‍👩‍👧‍👦</div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e1b4b', marginBottom: '16px' }}>Add Family Member</h2>
            
            {/* Avatar Picker */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>Choose Avatar</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {['😊', '😎', '🦊', '🐱', '🐶', '🦁', '🐼', '🐨', '🦄', '🐸', '🤖', '👧', '👦', '👩', '👨'].map(emoji => (
                  <div
                    key={emoji}
                    onClick={() => setNewMemberAvatar(emoji)}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: newMemberAvatar === emoji ? '#f3e8ff' : '#f9fafb',
                      border: newMemberAvatar === emoji ? '2px solid #7c3aed' : '2px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      cursor: 'pointer'
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Name Input */}
            <input
              type="text"
              placeholder="Name"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                fontSize: '14px',
                marginBottom: '12px',
                outline: 'none',
                textAlign: 'center'
              }}
            />
            
            {/* Role Picker */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>Role</div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {[
                  { id: 'child', label: 'Child' },
                  { id: 'parent', label: 'Parent' },
                  { id: 'teen', label: 'Teen' }
                ].map(role => (
                  <button
                    key={role.id}
                    onClick={() => setNewMemberRole(role.id)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '10px',
                      border: 'none',
                      background: newMemberRole === role.id ? '#7c3aed' : '#f3f4f6',
                      color: newMemberRole === role.id ? 'white' : '#6b7280',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => { 
                  setShowAddMemberModal(false); 
                  setNewMemberName('');
                  setNewMemberAvatar('😊');
                  setNewMemberRole('child');
                }}
                style={{ flex: 1, padding: '12px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newMemberName.trim()) {
                    const newMember = {
                      name: newMemberName.trim(),
                      avatar: newMemberAvatar,
                      role: newMemberRole,
                      xp: 0,
                      level: 1,
                      coins: 0,
                      streak: 0
                    };
                    setFamilyMembers([...familyMembers, newMember]);
                    showNotification(`${newMemberName} added to the family! 🎉`);
                    setShowAddMemberModal(false);
                    setNewMemberName('');
                    setNewMemberAvatar('😊');
                    setNewMemberRole('child');
                  }
                }}
                style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', border: 'none', borderRadius: '12px', fontWeight: '700', color: 'white', cursor: 'pointer' }}
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Family Member Modal */}
      {showEditMemberModal && editingMember && (
        <div style={styles.modalOverlay} onClick={() => setShowEditMemberModal(false)}>
          <div style={{ ...styles.modal, textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>{editMemberAvatar}</div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e1b4b', marginBottom: '16px' }}>Edit {editingMember.name}</h2>
            
            {/* Avatar Picker */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>Choose Avatar</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {['😊', '😎', '🦊', '🐱', '🐶', '🦁', '🐼', '🐨', '🦄', '🐸', '🤖', '👧', '👦', '👩', '👨'].map(emoji => (
                  <div
                    key={emoji}
                    onClick={() => setEditMemberAvatar(emoji)}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: editMemberAvatar === emoji ? '#f3e8ff' : '#f9fafb',
                      border: editMemberAvatar === emoji ? '2px solid #7c3aed' : '2px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      cursor: 'pointer'
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Name Input */}
            <input
              type="text"
              placeholder="Name"
              value={editMemberName}
              onChange={(e) => setEditMemberName(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                fontSize: '14px',
                marginBottom: '12px',
                outline: 'none',
                textAlign: 'center'
              }}
            />
            
            {/* Role Picker */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>Role</div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {[
                  { id: 'child', label: 'Child' },
                  { id: 'parent', label: 'Parent' },
                  { id: 'teen', label: 'Teen' }
                ].map(role => (
                  <button
                    key={role.id}
                    onClick={() => setEditMemberRole(role.id)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '10px',
                      border: 'none',
                      background: editMemberRole === role.id ? '#7c3aed' : '#f3f4f6',
                      color: editMemberRole === role.id ? 'white' : '#6b7280',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Save / Cancel Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
              <button
                onClick={() => { 
                  setShowEditMemberModal(false); 
                  setEditingMember(null);
                }}
                style={{ flex: 1, padding: '12px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (editMemberName.trim()) {
                    setFamilyMembers(familyMembers.map(m => 
                      m.name === editingMember.name 
                        ? { ...m, name: editMemberName.trim(), avatar: editMemberAvatar, role: editMemberRole }
                        : m
                    ));
                    if (currentUser.name === editingMember.name) {
                      setCurrentUser(prev => ({ ...prev, name: editMemberName.trim(), avatar: editMemberAvatar, role: editMemberRole }));
                    }
                    showNotification(`${editMemberName} updated! ✨`);
                    setShowEditMemberModal(false);
                    setEditingMember(null);
                  }
                }}
                style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', border: 'none', borderRadius: '12px', fontWeight: '700', color: 'white', cursor: 'pointer' }}
              >
                Save Changes
              </button>
            </div>
            
            {/* Delete Button */}
            {familyMembers.length > 1 && (
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to remove ${editingMember.name} from the family?`)) {
                    const updatedMembers = familyMembers.filter(m => m.name !== editingMember.name);
                    setFamilyMembers(updatedMembers);
                    if (currentUser.name === editingMember.name) {
                      setCurrentUser({...updatedMembers[0], coins: updatedMembers[0].coins || 0, streak: updatedMembers[0].streak || 0});
                    }
                    showNotification(`${editingMember.name} removed from family`);
                    setShowEditMemberModal(false);
                    setEditingMember(null);
                  }
                }}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  background: 'white', 
                  border: '2px solid #ef4444', 
                  borderRadius: '12px', 
                  fontWeight: '700', 
                  color: '#ef4444', 
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                🗑️ Remove from Family
              </button>
            )}
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div style={styles.modalOverlay} onClick={() => { setShowAddTaskModal(false); setShowTaskSuggestions(true); }}>
          <div style={{ ...styles.modal, maxHeight: '85vh', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>📋</div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e1b4b' }}>Add New Task</h2>
            </div>
            
            {/* Toggle: Suggestions vs Custom */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button
                onClick={() => setShowTaskSuggestions(true)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  background: showTaskSuggestions ? '#7c3aed' : '#f3f4f6',
                  color: showTaskSuggestions ? 'white' : '#6b7280',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                📚 Suggestions
              </button>
              <button
                onClick={() => setShowTaskSuggestions(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  background: !showTaskSuggestions ? '#7c3aed' : '#f3f4f6',
                  color: !showTaskSuggestions ? 'white' : '#6b7280',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                ✏️ Custom
              </button>
            </div>
            
            {showTaskSuggestions ? (
              /* Suggestions View */
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {/* Recent/Custom Tasks */}
                {customTaskHistory.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#6b7280', marginBottom: '8px' }}>⏱️ Recent</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {customTaskHistory.slice(0, 6).map((task, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setNewTaskTitle(task.title);
                            setNewTaskXp(task.xp);
                            setNewTaskMandatory(task.mandatory);
                            setShowTaskSuggestions(false);
                          }}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '20px',
                            border: '2px solid #e5e7eb',
                            background: 'white',
                            color: '#1e1b4b',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          {task.title}
                          <span style={{ color: '#7c3aed', fontSize: '11px' }}>+{task.xp}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Categorized Suggestions */}
                {suggestedTasks.map(category => (
                  <div key={category.category} style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#6b7280', marginBottom: '8px' }}>{category.category}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {category.tasks.map((task, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setNewTaskTitle(task.title);
                            setNewTaskXp(task.xp);
                            setNewTaskMandatory(task.mandatory);
                            setShowTaskSuggestions(false);
                          }}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '20px',
                            border: 'none',
                            background: task.mandatory ? '#fef3c7' : '#f3f4f6',
                            color: '#1e1b4b',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          {task.mandatory && <span style={{ fontSize: '10px' }}>⭐</span>}
                          {task.title}
                          <span style={{ color: '#7c3aed', fontSize: '11px' }}>+{task.xp}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Custom Task Form */
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {/* Task Title */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Task Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Clean your room"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '2px solid #e5e7eb',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
                
                {/* Assign To */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Assign To</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <div
                      onClick={() => setNewTaskAssignee('claimable')}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '10px',
                        background: newTaskAssignee === 'claimable' ? '#fef3c7' : '#f9fafb',
                        border: newTaskAssignee === 'claimable' ? '2px solid #f59e0b' : '2px solid transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>🎯</span>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e1b4b' }}>Anyone</span>
                    </div>
                    {familyMembers.map(member => (
                      <div
                        key={member.name}
                        onClick={() => setNewTaskAssignee(member.name)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '10px',
                          background: newTaskAssignee === member.name ? '#f3e8ff' : '#f9fafb',
                          border: newTaskAssignee === member.name ? '2px solid #7c3aed' : '2px solid transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span style={{ fontSize: '18px' }}>{member.avatar}</span>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e1b4b' }}>{member.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* XP Reward */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '6px' }}>XP Reward</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[15, 25, 35, 50, 75].map(xp => (
                      <button
                        key={xp}
                        onClick={() => setNewTaskXp(xp)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: '10px',
                          border: 'none',
                          background: newTaskXp === xp ? '#7c3aed' : '#f3f4f6',
                          color: newTaskXp === xp ? 'white' : '#6b7280',
                          fontWeight: '700',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        +{xp}
                      </button>
                    ))}
                  </div>
                </div>
            
                {/* Due Date */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Due</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['Today', 'Tomorrow', 'This Week'].map(due => (
                  <button
                    key={due}
                    onClick={() => setNewTaskDueDate(due)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '10px',
                      border: 'none',
                      background: newTaskDueDate === due ? '#7c3aed' : '#f3f4f6',
                      color: newTaskDueDate === due ? 'white' : '#6b7280',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    {due}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Repeat Option */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Repeat</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { id: 'none', label: 'One-time' },
                  { id: 'daily', label: 'Daily' },
                  { id: 'weekly', label: 'Weekly' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setNewTaskRepeat(opt.id)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '10px',
                      border: 'none',
                      background: newTaskRepeat === opt.id ? '#7c3aed' : '#f3f4f6',
                      color: newTaskRepeat === opt.id ? 'white' : '#6b7280',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Mandatory Toggle */}
            <div 
              onClick={() => setNewTaskMandatory(!newTaskMandatory)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '14px 16px', 
                background: newTaskMandatory ? '#fef3c7' : '#f9fafb', 
                borderRadius: '12px', 
                marginBottom: '20px',
                cursor: 'pointer',
                border: newTaskMandatory ? '2px solid #f59e0b' : '2px solid transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>⭐</span>
                <div>
                  <div style={{ fontWeight: '700', color: '#1e1b4b', fontSize: '14px' }}>Required Chore</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Must complete for allowance + earns coins</div>
                </div>
              </div>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                border: newTaskMandatory ? '2px solid #f59e0b' : '2px solid #d1d5db',
                background: newTaskMandatory ? '#f59e0b' : 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px'
              }}>
                {newTaskMandatory && '✓'}
              </div>
            </div>
            
                {/* Buttons inside custom form */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                  <button
                    onClick={() => {
                      setShowAddTaskModal(false);
                      setShowTaskSuggestions(true);
                      setNewTaskTitle('');
                      setNewTaskAssignee('');
                      setNewTaskXp(25);
                      setNewTaskMandatory(false);
                      setNewTaskDueDate('Today');
                      setNewTaskRepeat('none');
                    }}
                    style={{ flex: 1, padding: '14px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (newTaskTitle.trim() && newTaskAssignee) {
                        const isClaimable = newTaskAssignee === 'claimable';
                        const newTask = {
                          id: Date.now(),
                          title: newTaskTitle.trim(),
                          xp: newTaskXp,
                          status: isClaimable ? 'claimable' : 'open',
                          assignedTo: isClaimable ? null : newTaskAssignee,
                          isMandatory: newTaskMandatory,
                          dueDate: newTaskDueDate,
                          category: newTaskMandatory ? 'chore' : 'task',
                          repeat: newTaskRepeat
                        };
                        setTasks([...tasks, newTask]);
                        
                        // Add to custom task history (if not already a suggested task)
                        const isBuiltInTask = suggestedTasks.some(cat => 
                          cat.tasks.some(t => t.title.toLowerCase() === newTaskTitle.trim().toLowerCase())
                        );
                        if (!isBuiltInTask) {
                          setCustomTaskHistory(prev => {
                            const filtered = prev.filter(t => t.title.toLowerCase() !== newTaskTitle.trim().toLowerCase());
                            return [{ title: newTaskTitle.trim(), xp: newTaskXp, mandatory: newTaskMandatory }, ...filtered].slice(0, 10);
                          });
                        }
                        
                        // Notify the assignee
                        if (!isClaimable) {
                          addNotification(newTaskAssignee, {
                            type: 'task',
                            from: currentUser.name,
                            text: `assigned you a new task: "${newTaskTitle.trim()}"`,
                            taskId: newTask.id
                          });
                        }
                        
                        showNotification(isClaimable ? 'Claimable task added! 🎯' : `Task assigned to ${newTaskAssignee}! 📋`);
                        setShowAddTaskModal(false);
                        setShowTaskSuggestions(true);
                        setNewTaskTitle('');
                        setNewTaskAssignee('');
                        setNewTaskXp(25);
                        setNewTaskMandatory(false);
                        setNewTaskDueDate('Today');
                        setNewTaskRepeat('none');
                      }
                    }}
                    style={{ 
                      flex: 1, 
                      padding: '14px', 
                      background: (newTaskTitle.trim() && newTaskAssignee) ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : '#e5e7eb', 
                      border: 'none', 
                      borderRadius: '12px', 
                      fontWeight: '700', 
                      color: (newTaskTitle.trim() && newTaskAssignee) ? 'white' : '#9ca3af', 
                      cursor: (newTaskTitle.trim() && newTaskAssignee) ? 'pointer' : 'not-allowed',
                      fontSize: '14px'
                    }}
                  >
                    Add Task
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Task Detail Modal with Comments */}
      {showTaskDetailModal && selectedTask && (
        <div style={styles.modalOverlay} onClick={() => { setShowTaskDetailModal(false); setSelectedTask(null); setNewComment(''); }}>
          <div style={{ ...styles.modal, maxHeight: '80vh', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
            {/* Task Header */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                {selectedTask.isMandatory && <span style={{ fontSize: '16px' }}>⭐</span>}
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>{selectedTask.title}</h2>
              </div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '13px' }}>
                <span style={{ color: '#7c3aed', fontWeight: '600' }}>+{selectedTask.xp} XP</span>
                {selectedTask.isMandatory && (
                  <span style={{ color: '#d97706', fontWeight: '600' }}>+{Math.floor(selectedTask.xp / 15)} 🪙</span>
                )}
                <span style={{ color: '#6b7280' }}>Due: {selectedTask.dueDate}</span>
              </div>
              {selectedTask.assignedTo && (
                <div style={{ marginTop: '8px', fontSize: '13px', color: '#6b7280' }}>
                  Assigned to: <span style={{ fontWeight: '600', color: '#1e1b4b' }}>{selectedTask.assignedTo}</span>
                </div>
              )}
            </div>
            
            {/* Comments Section */}
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e1b4b', marginBottom: '12px' }}>💬 Comments</div>
              
              {(!taskComments[selectedTask.id] || taskComments[selectedTask.id].length === 0) ? (
                <div style={{ textAlign: 'center', padding: '24px', background: '#f9fafb', borderRadius: '12px', color: '#6b7280', fontSize: '13px' }}>
                  No comments yet. Ask a question or add a note!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {taskComments[selectedTask.id].map(comment => (
                    <div 
                      key={comment.id} 
                      style={{ 
                        padding: '12px', 
                        background: comment.from === currentUser.name ? '#f3e8ff' : '#f9fafb', 
                        borderRadius: '12px',
                        borderLeft: comment.from === currentUser.name ? '3px solid #7c3aed' : '3px solid #e5e7eb'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '700', color: '#1e1b4b', fontSize: '13px' }}>{comment.from}</span>
                        <span style={{ fontSize: '11px', color: '#9ca3af' }}>{comment.timestamp}</span>
                      </div>
                      <div style={{ fontSize: '14px', color: '#4b5563' }}>
                        {comment.text.split(/(@\w+)/g).map((part, i) => 
                          part.startsWith('@') ? (
                            <span key={i} style={{ color: '#7c3aed', fontWeight: '600' }}>{part}</span>
                          ) : part
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Add Comment Input with @mention support */}
            <div style={{ position: 'relative' }}>
              {/* @Mention Dropdown */}
              {showMentionDropdown && (
                <div style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: 0,
                  right: 0,
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                  marginBottom: '8px',
                  overflow: 'hidden',
                  zIndex: 10
                }}>
                  {familyMembers
                    .filter(m => m.name !== currentUser.name)
                    .filter(m => mentionFilter === '' || m.name.toLowerCase().includes(mentionFilter.toLowerCase()))
                    .map(member => (
                      <div
                        key={member.name}
                        onClick={() => {
                          const atIndex = newComment.lastIndexOf('@');
                          const newText = newComment.substring(0, atIndex) + '@' + member.name + ' ';
                          setNewComment(newText);
                          setShowMentionDropdown(false);
                          setMentionFilter('');
                        }}
                        style={{
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'pointer',
                          background: 'white'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#f3e8ff'}
                        onMouseLeave={(e) => e.target.style.background = 'white'}
                      >
                        <span style={{ fontSize: '20px' }}>{member.avatar}</span>
                        <span style={{ fontWeight: '600', color: '#1e1b4b' }}>{member.name}</span>
                      </div>
                    ))}
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Add a comment... (use @ to mention)"
                  value={newComment}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewComment(value);
                    
                    // Check for @ mention
                    const lastAtIndex = value.lastIndexOf('@');
                    if (lastAtIndex !== -1 && lastAtIndex === value.length - 1) {
                      setShowMentionDropdown(true);
                      setMentionFilter('');
                    } else if (lastAtIndex !== -1) {
                      const textAfterAt = value.substring(lastAtIndex + 1);
                      if (!textAfterAt.includes(' ')) {
                        setShowMentionDropdown(true);
                        setMentionFilter(textAfterAt);
                      } else {
                        setShowMentionDropdown(false);
                      }
                    } else {
                      setShowMentionDropdown(false);
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newComment.trim() && !showMentionDropdown) {
                      const comment = {
                        id: Date.now(),
                        from: currentUser.name,
                        text: newComment.trim(),
                        timestamp: 'Just now'
                      };
                      setTaskComments(prev => ({
                        ...prev,
                        [selectedTask.id]: [...(prev[selectedTask.id] || []), comment]
                      }));
                      
                      // Send notifications
                      // 1. To mentioned users
                      const mentions = newComment.match(/@(\w+)/g) || [];
                      mentions.forEach(mention => {
                        const mentionedName = mention.substring(1);
                        if (familyMembers.some(m => m.name === mentionedName)) {
                          addNotification(mentionedName, {
                            type: 'mention',
                            from: currentUser.name,
                            text: `mentioned you: "${newComment.trim().substring(0, 30)}${newComment.length > 30 ? '...' : ''}"`,
                            taskId: selectedTask.id
                          });
                        }
                      });
                      
                      // 2. To task assignee (if not current user and not already mentioned)
                      if (selectedTask.assignedTo && 
                          selectedTask.assignedTo !== currentUser.name && 
                          !mentions.includes('@' + selectedTask.assignedTo)) {
                        addNotification(selectedTask.assignedTo, {
                          type: 'comment',
                          from: currentUser.name,
                          text: `commented on "${selectedTask.title}"`,
                          taskId: selectedTask.id
                        });
                      }
                      
                      setNewComment('');
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => {
                    if (newComment.trim() && !showMentionDropdown) {
                      const comment = {
                        id: Date.now(),
                        from: currentUser.name,
                        text: newComment.trim(),
                        timestamp: 'Just now'
                      };
                      setTaskComments(prev => ({
                        ...prev,
                        [selectedTask.id]: [...(prev[selectedTask.id] || []), comment]
                      }));
                      
                      // Send notifications
                      const mentions = newComment.match(/@(\w+)/g) || [];
                      mentions.forEach(mention => {
                        const mentionedName = mention.substring(1);
                        if (familyMembers.some(m => m.name === mentionedName)) {
                          addNotification(mentionedName, {
                            type: 'mention',
                            from: currentUser.name,
                            text: `mentioned you: "${newComment.trim().substring(0, 30)}${newComment.length > 30 ? '...' : ''}"`,
                            taskId: selectedTask.id
                          });
                        }
                      });
                      
                      if (selectedTask.assignedTo && 
                          selectedTask.assignedTo !== currentUser.name && 
                          !mentions.includes('@' + selectedTask.assignedTo)) {
                        addNotification(selectedTask.assignedTo, {
                          type: 'comment',
                          from: currentUser.name,
                          text: `commented on "${selectedTask.title}"`,
                          taskId: selectedTask.id
                        });
                      }
                      
                      setNewComment('');
                    }
                  }}
                  style={{
                    padding: '12px 20px',
                    background: newComment.trim() ? '#7c3aed' : '#e5e7eb',
                    color: newComment.trim() ? 'white' : '#9ca3af',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '700',
                    cursor: newComment.trim() ? 'pointer' : 'not-allowed'
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Win Modal */}
      {showAddWinModal && (
        <div style={styles.modalOverlay} onClick={() => { setShowAddWinModal(false); setNewWinText(''); }}>
          <div style={{ ...styles.modal, textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e1b4b', marginBottom: '8px' }}>Share a Win!</h2>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>Celebrate something you accomplished or are proud of</p>
            
            <textarea
              placeholder="What's your win? (e.g., Aced my test! Got a promotion! Finished a hard book!)"
              value={newWinText}
              onChange={(e) => setNewWinText(e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                fontSize: '14px',
                minHeight: '100px',
                resize: 'none',
                marginBottom: '16px',
                outline: 'none'
              }}
            />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => { setShowAddWinModal(false); setNewWinText(''); }}
                style={{ flex: 1, padding: '14px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newWinText.trim()) {
                    const newWin = {
                      id: Date.now(),
                      from: currentUser.name,
                      avatar: currentUser.avatar,
                      text: newWinText.trim(),
                      timestamp: 'Just now',
                      reactions: [],
                      status: currentUser.role === 'parent' ? 'approved' : 'pending'
                    };
                    setFamilyWins([newWin, ...familyWins]);
                    
                    if (currentUser.role === 'parent') {
                      // Parents don't need approval
                      setCurrentUser(prev => ({ ...prev, xp: prev.xp + 5 }));
                      showNotification('Win shared! +5 XP 🎉');
                    } else {
                      // Kids need approval
                      familyMembers.filter(m => m.role === 'parent').forEach(parent => {
                        addNotification(parent.name, {
                          type: 'approval',
                          from: currentUser.name,
                          text: `shared a win - needs approval`
                        });
                      });
                      showNotification('Win submitted for approval! ⏳');
                    }
                    setShowAddWinModal(false);
                    setNewWinText('');
                  }
                }}
                style={{ 
                  flex: 1, 
                  padding: '14px', 
                  background: newWinText.trim() ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' : '#e5e7eb', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontWeight: '700', 
                  color: newWinText.trim() ? 'white' : '#9ca3af', 
                  cursor: newWinText.trim() ? 'pointer' : 'not-allowed' 
                }}
              >
                Share Win 🎉
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Family Goal Modal */}
      {showEditGoalModal && editingGoal && (
        <div style={styles.modalOverlay} onClick={() => setShowEditGoalModal(false)}>
          <div style={{ ...styles.modal }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>{editGoalIcon}</div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e1b4b' }}>Edit Family Goal</h2>
            </div>
            
            {/* Goal Icon Picker */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>Goal Icon</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {['🏖️', '🎢', '🎬', '🍕', '🎮', '⛺', '🚗', '🎁', '🎉', '⭐', '🏆', '🌟'].map(icon => (
                  <div
                    key={icon}
                    onClick={() => setEditGoalIcon(icon)}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: editGoalIcon === icon ? '#fef3c7' : '#f9fafb',
                      border: editGoalIcon === icon ? '2px solid #f59e0b' : '2px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      cursor: 'pointer'
                    }}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Goal Name */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Goal Name</label>
              <input
                type="text"
                placeholder="e.g., Beach Day Trip, Movie Night, Pizza Party"
                value={editGoalName}
                onChange={(e) => setEditGoalName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid #e5e7eb',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            
            {/* Target XP */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>Target XP</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[5000, 10000, 15000, 20000, 30000].map(xp => (
                  <button
                    key={xp}
                    onClick={() => setEditGoalTarget(xp)}
                    style={{
                      flex: 1,
                      minWidth: '50px',
                      padding: '10px 6px',
                      borderRadius: '10px',
                      border: 'none',
                      background: editGoalTarget === xp ? '#f59e0b' : '#f3f4f6',
                      color: editGoalTarget === xp ? 'white' : '#6b7280',
                      fontWeight: '700',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {(xp / 1000)}k
                  </button>
                ))}
              </div>
            </div>
            
            {/* Current Progress Note */}
            <div style={{ 
              background: '#fef3c7', 
              borderRadius: '12px', 
              padding: '12px', 
              marginBottom: '16px',
              fontSize: '13px',
              color: '#92400e',
              textAlign: 'center'
            }}>
              Current progress: <strong>{editingGoal.currentXp.toLocaleString()} XP</strong>
            </div>
            
            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
              <button
                onClick={() => setShowEditGoalModal(false)}
                style={{ flex: 1, padding: '14px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer', fontSize: '14px' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (editGoalName.trim() && editGoalTarget > 0) {
                    setFamilyGoals(prev => prev.map(g => 
                      g.id === editingGoal.id 
                        ? { ...g, name: editGoalName.trim(), icon: editGoalIcon, targetXp: editGoalTarget }
                        : g
                    ));
                    showNotification('Goal updated! 🎯');
                    setShowEditGoalModal(false);
                  }
                }}
                style={{ 
                  flex: 1, 
                  padding: '14px', 
                  background: (editGoalName.trim() && editGoalTarget > 0) ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' : '#e5e7eb', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontWeight: '700', 
                  color: (editGoalName.trim() && editGoalTarget > 0) ? 'white' : '#9ca3af', 
                  cursor: (editGoalName.trim() && editGoalTarget > 0) ? 'pointer' : 'not-allowed',
                  fontSize: '14px'
                }}
              >
                Save
              </button>
            </div>
            
            {/* Reset & Delete Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  if (window.confirm('Reset progress to 0 XP?')) {
                    setFamilyGoals(prev => prev.map(g => 
                      g.id === editingGoal.id ? { ...g, currentXp: 0 } : g
                    ));
                    setEditingGoal(prev => ({ ...prev, currentXp: 0 }));
                    showNotification('Progress reset!');
                  }
                }}
                style={{ 
                  flex: 1, 
                  padding: '10px', 
                  background: 'white', 
                  border: '2px solid #fca5a5', 
                  borderRadius: '12px', 
                  fontWeight: '600', 
                  color: '#dc2626', 
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Reset
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Delete this goal?')) {
                    setFamilyGoals(prev => prev.filter(g => g.id !== editingGoal.id));
                    showNotification('Goal deleted');
                    setShowEditGoalModal(false);
                  }
                }}
                style={{ 
                  flex: 1, 
                  padding: '10px', 
                  background: '#fef2f2', 
                  border: '2px solid #fca5a5', 
                  borderRadius: '12px', 
                  fontWeight: '600', 
                  color: '#dc2626', 
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Delete Goal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Family Goal Modal */}
      {showAddGoalModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddGoalModal(false)}>
          <div style={{ ...styles.modal }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>{editGoalIcon}</div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e1b4b' }}>New Family Goal</h2>
            </div>
            
            {/* Goal Icon Picker */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>Goal Icon</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {['🏖️', '🎢', '🎬', '🍕', '🎮', '⛺', '🚗', '🎁', '🎉', '⭐', '🏆', '🌟'].map(icon => (
                  <div
                    key={icon}
                    onClick={() => setEditGoalIcon(icon)}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: editGoalIcon === icon ? '#fef3c7' : '#f9fafb',
                      border: editGoalIcon === icon ? '2px solid #f59e0b' : '2px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      cursor: 'pointer'
                    }}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Goal Name */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Goal Name</label>
              <input
                type="text"
                placeholder="e.g., Beach Day Trip, Movie Night, Pizza Party"
                value={editGoalName}
                onChange={(e) => setEditGoalName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid #e5e7eb',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            
            {/* Target XP */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>Target XP</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[5000, 10000, 15000, 20000, 30000].map(xp => (
                  <button
                    key={xp}
                    onClick={() => setEditGoalTarget(xp)}
                    style={{
                      flex: 1,
                      minWidth: '50px',
                      padding: '10px 6px',
                      borderRadius: '10px',
                      border: 'none',
                      background: editGoalTarget === xp ? '#f59e0b' : '#f3f4f6',
                      color: editGoalTarget === xp ? 'white' : '#6b7280',
                      fontWeight: '700',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {(xp / 1000)}k
                  </button>
                ))}
              </div>
            </div>
            
            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowAddGoalModal(false)}
                style={{ flex: 1, padding: '14px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer', fontSize: '14px' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (editGoalName.trim() && editGoalTarget > 0) {
                    const newGoal = {
                      id: Date.now(),
                      name: editGoalName.trim(),
                      icon: editGoalIcon,
                      targetXp: editGoalTarget,
                      currentXp: 0,
                      contributions: {}
                    };
                    setFamilyGoals(prev => [...prev, newGoal]);
                    showNotification('New goal added! 🎯');
                    setShowAddGoalModal(false);
                  }
                }}
                style={{ 
                  flex: 1, 
                  padding: '14px', 
                  background: (editGoalName.trim() && editGoalTarget > 0) ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' : '#e5e7eb', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontWeight: '700', 
                  color: (editGoalName.trim() && editGoalTarget > 0) ? 'white' : '#9ca3af', 
                  cursor: (editGoalName.trim() && editGoalTarget > 0) ? 'pointer' : 'not-allowed',
                  fontSize: '14px'
                }}
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Personal Task Modal (for kids) */}
      {showAddPersonalTaskModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddPersonalTaskModal(false)}>
          <div style={{ ...styles.modal }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>📝</div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e1b4b' }}>Add My Task</h2>
              <p style={{ fontSize: '13px', color: '#6b7280' }}>Create a personal task to track</p>
            </div>
            
            {/* Task Name */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '6px' }}>What do you need to do?</label>
              <input
                type="text"
                placeholder="e.g., Study for math test, Practice piano..."
                value={personalTaskTitle}
                onChange={(e) => setPersonalTaskTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '2px solid #e5e7eb',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            
            {/* Quick Suggestions */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>Suggestions</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['📚 Study for test', '📖 Read 30 mins', '🎹 Practice music', '💪 Exercise', '🎨 Work on project', '✍️ Do homework'].map(sug => (
                  <button
                    key={sug}
                    onClick={() => setPersonalTaskTitle(sug.substring(2).trim())}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '20px',
                      border: 'none',
                      background: '#f3f4f6',
                      color: '#4b5563',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
            
            {/* XP Amount */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>How much XP?</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[10, 20, 30, 50].map(xp => (
                  <button
                    key={xp}
                    onClick={() => setPersonalTaskXp(xp)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '10px',
                      border: 'none',
                      background: personalTaskXp === xp ? '#10b981' : '#f3f4f6',
                      color: personalTaskXp === xp ? 'white' : '#6b7280',
                      fontWeight: '700',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    +{xp}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Note */}
            <div style={{ 
              background: '#d1fae5', 
              borderRadius: '12px', 
              padding: '12px', 
              marginBottom: '16px',
              fontSize: '12px',
              color: '#065f46',
              textAlign: 'center'
            }}>
              💡 Personal tasks earn XP but not coins (coins are for chores)
            </div>
            
            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  setShowAddPersonalTaskModal(false);
                  setPersonalTaskTitle('');
                  setPersonalTaskXp(20);
                }}
                style={{ flex: 1, padding: '14px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer', fontSize: '14px' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (personalTaskTitle.trim()) {
                    const newTask = {
                      id: Date.now(),
                      title: personalTaskTitle.trim(),
                      xp: personalTaskXp,
                      status: 'open',
                      assignedTo: currentUser.name,
                      isMandatory: false,
                      dueDate: 'Today',
                      category: 'personal',
                      createdBy: currentUser.name
                    };
                    setTasks([...tasks, newTask]);
                    showNotification('Task added! 📝');
                    setShowAddPersonalTaskModal(false);
                    setPersonalTaskTitle('');
                    setPersonalTaskXp(20);
                  }
                }}
                style={{ 
                  flex: 1, 
                  padding: '14px', 
                  background: personalTaskTitle.trim() ? '#10b981' : '#e5e7eb', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontWeight: '700', 
                  color: personalTaskTitle.trim() ? 'white' : '#9ca3af', 
                  cursor: personalTaskTitle.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '14px'
                }}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contribute to Family Goal Modal */}
      {showContributeModal && contributeGoal && (
        <div style={styles.modalOverlay} onClick={() => setShowContributeModal(false)}>
          <div style={{ ...styles.modal }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>{contributeGoal.icon}</div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e1b4b' }}>Contribute to</h2>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#f59e0b' }}>{contributeGoal.name}</h2>
            </div>
            
            {/* Your XP Bank */}
            <div style={{ 
              background: '#d1fae5', 
              borderRadius: '12px', 
              padding: '14px', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '13px', color: '#065f46', fontWeight: '600' }}>🎁 Your XP Bank</div>
                <div style={{ fontSize: '11px', color: '#047857' }}>Available to give</div>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#10b981' }}>{currentUser.xpBank}</div>
            </div>
            
            {/* Amount Selector */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>How much XP to give?</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                {[25, 50, 100, 'All'].map(amt => {
                  const actualAmt = amt === 'All' ? currentUser.xpBank : amt;
                  const isDisabled = actualAmt > currentUser.xpBank;
                  return (
                    <button
                      key={amt}
                      onClick={() => !isDisabled && setContributeAmount(actualAmt)}
                      disabled={isDisabled}
                      style={{
                        flex: 1,
                        padding: '12px 8px',
                        borderRadius: '10px',
                        border: 'none',
                        background: contributeAmount === actualAmt ? '#10b981' : isDisabled ? '#e5e7eb' : '#f3f4f6',
                        color: contributeAmount === actualAmt ? 'white' : isDisabled ? '#9ca3af' : '#4b5563',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: isDisabled ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {amt === 'All' ? `All (${currentUser.xpBank})` : amt}
                    </button>
                  );
                })}
              </div>
              
              {/* Custom amount slider */}
              <input
                type="range"
                min="0"
                max={currentUser.xpBank}
                value={contributeAmount}
                onChange={(e) => setContributeAmount(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#10b981' }}
              />
              <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: '800', color: '#10b981', marginTop: '8px' }}>
                {contributeAmount} XP
              </div>
            </div>
            
            {/* Goal Progress Preview */}
            <div style={{ 
              background: '#fef3c7', 
              borderRadius: '12px', 
              padding: '12px', 
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '12px', color: '#92400e', marginBottom: '8px' }}>After contribution:</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#78350f', fontWeight: '600' }}>
                <span>{(contributeGoal.currentXp + contributeAmount).toLocaleString()} / {contributeGoal.targetXp.toLocaleString()} XP</span>
                <span>{Math.min(100, Math.round(((contributeGoal.currentXp + contributeAmount) / contributeGoal.targetXp) * 100))}%</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.5)', borderRadius: '6px', height: '8px', overflow: 'hidden', marginTop: '8px' }}>
                <div style={{ 
                  background: '#f59e0b', 
                  height: '100%', 
                  width: `${Math.min(100, ((contributeGoal.currentXp + contributeAmount) / contributeGoal.targetXp) * 100)}%`, 
                  borderRadius: '6px' 
                }}></div>
              </div>
            </div>
            
            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowContributeModal(false)}
                style={{ flex: 1, padding: '14px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer', fontSize: '14px' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (contributeAmount > 0 && contributeAmount <= currentUser.xpBank) {
                    // Update goal
                    const newGoalXp = contributeGoal.currentXp + contributeAmount;
                    const wasComplete = contributeGoal.currentXp >= contributeGoal.targetXp;
                    const isNowComplete = newGoalXp >= contributeGoal.targetXp;
                    
                    setFamilyGoals(prev => prev.map(g => 
                      g.id === contributeGoal.id 
                        ? { 
                            ...g, 
                            currentXp: newGoalXp,
                            contributions: {
                              ...(g.contributions || {}),
                              [currentUser.name]: ((g.contributions || {})[currentUser.name] || 0) + contributeAmount
                            }
                          }
                        : g
                    ));
                    
                    // Deduct from bank
                    setCurrentUser(prev => ({ ...prev, xpBank: prev.xpBank - contributeAmount }));
                    
                    // Check for contributor achievement
                    checkAchievements(currentUser.name, { hasContributed: true });
                    
                    // Celebration if goal reached
                    if (!wasComplete && isNowComplete) {
                      showNotification(`🎉 You helped reach ${contributeGoal.name}! 🎉`);
                    } else {
                      showNotification(`Contributed ${contributeAmount} XP to ${contributeGoal.name}! 🎁`);
                    }
                    
                    setShowContributeModal(false);
                  }
                }}
                disabled={contributeAmount === 0}
                style={{ 
                  flex: 1, 
                  padding: '14px', 
                  background: contributeAmount > 0 ? '#10b981' : '#e5e7eb', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontWeight: '700', 
                  color: contributeAmount > 0 ? 'white' : '#9ca3af', 
                  cursor: contributeAmount > 0 ? 'pointer' : 'not-allowed',
                  fontSize: '14px'
                }}
              >
                Give {contributeAmount} XP 🎁
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Process Payouts Modal */}
      {showPayoutModal && (
        <div style={styles.modalOverlay} onClick={() => setShowPayoutModal(false)}>
          <div style={{ ...styles.modal, maxWidth: '380px' }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>💸</div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e1b4b' }}>Process Payouts</h2>
              <p style={{ fontSize: '13px', color: '#6b7280' }}>Pay out earned coins to kids</p>
            </div>

            {/* Kids with coins */}
            <div style={{ marginBottom: '20px' }}>
              {familyMembers.filter(m => m.role !== 'parent').map(kid => {
                const coins = kid.coins || 0;
                const amount = coins * (settings.coinValue || 0.10);
                const hasPendingRequest = allowanceRequests.some(r => r.from === kid.name && r.status === 'pending');
                
                return (
                  <div 
                    key={kid.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px',
                      background: coins > 0 ? '#f0fdf4' : '#f9fafb',
                      borderRadius: '12px',
                      marginBottom: '10px',
                      border: hasPendingRequest ? '2px solid #f59e0b' : '2px solid transparent'
                    }}
                  >
                    <span style={{ fontSize: '32px' }}>{kid.avatar}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', color: '#1e1b4b', fontSize: '15px' }}>{kid.name}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        🪙 {coins} coins = {settings.currencySymbol}{amount.toFixed(2)}
                      </div>
                      {hasPendingRequest && (
                        <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: '600' }}>📨 Requested payout</div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        if (coins > 0) {
                          // Add to history
                          setAllowanceHistory(prev => [{
                            id: Date.now(),
                            user: kid.name,
                            coins: coins,
                            amount: amount,
                            paidAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                            paidBy: currentUser.name
                          }, ...prev]);
                          
                          // Reset kid's coins
                          setFamilyMembers(prev => prev.map(m => 
                            m.name === kid.name ? { ...m, coins: 0 } : m
                          ));
                          if (currentUser.name === kid.name) {
                            setCurrentUser(prev => ({ ...prev, coins: 0 }));
                          }
                          
                          // Remove any pending requests
                          setAllowanceRequests(prev => prev.filter(r => !(r.from === kid.name && r.status === 'pending')));
                          
                          // Notify kid
                          addNotification(kid.name, {
                            type: 'allowance',
                            from: currentUser.name,
                            text: `paid your allowance! ${settings.currencySymbol}${amount.toFixed(2)} 💰`
                          });
                          
                          showNotification(`Paid ${kid.name} ${settings.currencySymbol}${amount.toFixed(2)}! ✅`);
                        }
                      }}
                      disabled={coins === 0}
                      style={{
                        padding: '10px 14px',
                        background: coins > 0 ? '#10b981' : '#e5e7eb',
                        color: coins > 0 ? 'white' : '#9ca3af',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: '700',
                        fontSize: '12px',
                        cursor: coins > 0 ? 'pointer' : 'not-allowed'
                      }}
                    >
                      {coins > 0 ? `Pay ${settings.currencySymbol}${amount.toFixed(2)}` : 'No coins'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Pay All Button */}
            {familyMembers.filter(m => m.role !== 'parent' && (m.coins || 0) > 0).length > 1 && (
              <button
                onClick={() => {
                  familyMembers.filter(m => m.role !== 'parent' && (m.coins || 0) > 0).forEach(kid => {
                    const coins = kid.coins || 0;
                    const amount = coins * (settings.coinValue || 0.10);
                    
                    setAllowanceHistory(prev => [{
                      id: Date.now() + Math.random(),
                      user: kid.name,
                      coins: coins,
                      amount: amount,
                      paidAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                      paidBy: currentUser.name
                    }, ...prev]);
                    
                    addNotification(kid.name, {
                      type: 'allowance',
                      from: currentUser.name,
                      text: `paid your allowance! ${settings.currencySymbol}${amount.toFixed(2)} 💰`
                    });
                  });
                  
                  // Reset all kids' coins
                  setFamilyMembers(prev => prev.map(m => 
                    m.role !== 'parent' ? { ...m, coins: 0 } : m
                  ));
                  
                  // Clear pending requests
                  setAllowanceRequests(prev => prev.filter(r => r.status !== 'pending'));
                  
                  const totalPaid = familyMembers
                    .filter(m => m.role !== 'parent')
                    .reduce((sum, m) => sum + ((m.coins || 0) * (settings.coinValue || 0.10)), 0);
                  
                  showNotification(`Paid everyone! Total: ${settings.currencySymbol}${totalPaid.toFixed(2)} 🎉`);
                  setShowPayoutModal(false);
                }}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer',
                  marginBottom: '10px'
                }}
              >
                💸 Pay All ({settings.currencySymbol}{familyMembers
                  .filter(m => m.role !== 'parent')
                  .reduce((sum, m) => sum + ((m.coins || 0) * (settings.coinValue || 0.10)), 0)
                  .toFixed(2)})
              </button>
            )}

            <button
              onClick={() => setShowPayoutModal(false)}
              style={{
                width: '100%',
                padding: '12px',
                background: '#f3f4f6',
                color: '#6b7280',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Allowance Settings Modal */}
      {showAllowanceSettingsModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAllowanceSettingsModal(false)}>
          <div style={{ ...styles.modal, maxWidth: '380px' }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>⚙️</div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e1b4b' }}>Allowance Settings</h2>
              <p style={{ fontSize: '13px', color: '#6b7280' }}>Configure automated payouts</p>
            </div>

            {/* Coin Value */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>
                Coin Value
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[0.01, 0.05, 0.10, 0.25, 0.50, 1.00].map(val => (
                  <button
                    key={val}
                    onClick={() => setSettings(prev => ({ ...prev, coinValue: val }))}
                    style={{
                      flex: 1,
                      padding: '10px 6px',
                      borderRadius: '8px',
                      border: 'none',
                      background: settings.coinValue === val ? '#7c3aed' : '#f3f4f6',
                      color: settings.coinValue === val ? 'white' : '#6b7280',
                      fontWeight: '700',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {settings.currencySymbol}{val.toFixed(2)}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px', textAlign: 'center' }}>
                1 coin = {settings.currencySymbol}{(settings.coinValue || 0.10).toFixed(2)}
              </div>
            </div>

            {/* Payout Day */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>
                Weekly Payout Reminder Day
              </label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Sunday', 'Monday', 'Friday', 'Saturday'].map(day => (
                  <button
                    key={day}
                    onClick={() => setAllowanceAutomation(prev => ({ ...prev, payoutDay: day }))}
                    style={{
                      flex: 1,
                      minWidth: '70px',
                      padding: '10px',
                      borderRadius: '8px',
                      border: 'none',
                      background: allowanceAutomation.payoutDay === day ? '#10b981' : '#f3f4f6',
                      color: allowanceAutomation.payoutDay === day ? 'white' : '#6b7280',
                      fontWeight: '600',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Auto-approve threshold */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>
                Auto-Approve Requests Under
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[0, 5, 10, 20, 50].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setAllowanceAutomation(prev => ({ ...prev, autoApproveUnder: amt }))}
                    style={{
                      flex: 1,
                      padding: '10px 6px',
                      borderRadius: '8px',
                      border: 'none',
                      background: allowanceAutomation.autoApproveUnder === amt ? '#f59e0b' : '#f3f4f6',
                      color: allowanceAutomation.autoApproveUnder === amt ? 'white' : '#6b7280',
                      fontWeight: '700',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {amt === 0 ? 'Off' : `${settings.currencySymbol}${amt}`}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px', textAlign: 'center' }}>
                {allowanceAutomation.autoApproveUnder > 0 
                  ? `Requests under ${settings.currencySymbol}${allowanceAutomation.autoApproveUnder} will auto-approve`
                  : 'All requests require manual approval'}
              </div>
            </div>

            {/* Perfect Week Bonus */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>
                Perfect Week Bonus (all tasks done)
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[0, 5, 10, 15, 25].map(bonus => (
                  <button
                    key={bonus}
                    onClick={() => setAllowanceAutomation(prev => ({ ...prev, bonusForPerfectWeek: bonus }))}
                    style={{
                      flex: 1,
                      padding: '10px 6px',
                      borderRadius: '8px',
                      border: 'none',
                      background: allowanceAutomation.bonusForPerfectWeek === bonus ? '#ec4899' : '#f3f4f6',
                      color: allowanceAutomation.bonusForPerfectWeek === bonus ? 'white' : '#6b7280',
                      fontWeight: '700',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {bonus === 0 ? 'None' : `+${bonus}🪙`}
                  </button>
                ))}
              </div>
            </div>

            {/* Example Calculation */}
            <div style={{ background: '#f3e8ff', borderRadius: '12px', padding: '14px', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>📊 Example Earnings</div>
              <div style={{ fontSize: '13px', color: '#6b21a8' }}>
                A 25 XP chore earns <strong>{Math.floor(25 / 15)} coins</strong> = <strong>{settings.currencySymbol}{(Math.floor(25 / 15) * (settings.coinValue || 0.10)).toFixed(2)}</strong>
              </div>
              <div style={{ fontSize: '13px', color: '#6b21a8', marginTop: '4px' }}>
                5 chores/day × 7 days = ~<strong>{settings.currencySymbol}{(35 * Math.floor(25 / 15) * (settings.coinValue || 0.10)).toFixed(2)}</strong>/week
              </div>
            </div>

            <button
              onClick={() => {
                setShowAllowanceSettingsModal(false);
                showNotification('Settings saved! ✅');
              }}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Task Completion Modal (for kids with photo proof option) */}
      {showCompleteTaskModal && taskToComplete && (
        <div style={styles.modalOverlay} onClick={() => setShowCompleteTaskModal(false)}>
          <div style={{ ...styles.modal, maxWidth: '360px' }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>✅</div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e1b4b' }}>Complete Task</h2>
              <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>{taskToComplete.title}</p>
            </div>

            {/* Task rewards preview */}
            <div style={{ background: '#f3e8ff', borderRadius: '12px', padding: '14px', marginBottom: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: '#7c3aed', marginBottom: '8px' }}>You'll earn:</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '24px', fontWeight: '800', color: '#7c3aed' }}>{taskToComplete.xp}</span>
                  <span style={{ fontSize: '14px', color: '#9333ea' }}> XP</span>
                </div>
                {(taskToComplete.isMandatory || ['chore', 'responsibility'].includes(taskToComplete.category)) && (
                  <div>
                    <span style={{ fontSize: '24px', fontWeight: '800', color: '#d97706' }}>{Math.floor(taskToComplete.xp / 15)}</span>
                    <span style={{ fontSize: '14px', color: '#b45309' }}> 🪙</span>
                  </div>
                )}
              </div>
            </div>

            {/* Photo proof upload */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>
                📷 Add Photo Proof (optional)
              </label>
              
              {photoProofData ? (
                <div style={{ position: 'relative' }}>
                  <img 
                    src={photoProofData} 
                    alt="Proof" 
                    style={{ width: '100%', borderRadius: '12px', maxHeight: '200px', objectFit: 'cover' }}
                  />
                  <button
                    onClick={() => setPhotoProofData(null)}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    ✕ Remove
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <label style={{
                    flex: 1,
                    padding: '14px',
                    background: '#f9fafb',
                    border: '2px dashed #d1d5db',
                    borderRadius: '12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: '#6b7280'
                  }}>
                    📁 Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => setPhotoProofData(event.target.result);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  <label style={{
                    flex: 1,
                    padding: '14px',
                    background: '#f9fafb',
                    border: '2px dashed #d1d5db',
                    borderRadius: '12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: '#6b7280'
                  }}>
                    📸 Take Photo
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => setPhotoProofData(event.target.result);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              )}
              <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px', textAlign: 'center' }}>
                Adding a photo helps parents verify completion!
              </div>
            </div>

            {/* Info about approval */}
            <div style={{ background: '#fef3c7', borderRadius: '10px', padding: '12px', marginBottom: '20px', fontSize: '12px', color: '#92400e' }}>
              ⏳ A parent will review and approve your task to award points.
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowCompleteTaskModal(false)}
                style={{ flex: 1, padding: '14px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer', fontSize: '14px' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  completeTask(taskToComplete.id, photoProofData);
                  setShowCompleteTaskModal(false);
                  setTaskToComplete(null);
                  setPhotoProofData(null);
                }}
                style={{ 
                  flex: 1, 
                  padding: '14px', 
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontWeight: '700', 
                  color: 'white', 
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Submit ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pending Approvals Modal (for parents) */}
      {showPendingApprovalsModal && (
        <div style={styles.modalOverlay} onClick={() => { setShowPendingApprovalsModal(false); setViewingPhotoProof(null); }}>
          <div style={{ ...styles.modal, maxWidth: '400px', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>📋</div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e1b4b' }}>Pending Approvals</h2>
              <p style={{ fontSize: '13px', color: '#6b7280' }}>
                {tasks.filter(t => t.status === 'pending_approval').length + familyWins.filter(w => w.status === 'pending').length} item(s) awaiting approval
              </p>
            </div>

            {/* Photo viewer */}
            {viewingPhotoProof && (
              <div style={{ marginBottom: '16px' }}>
                <img 
                  src={viewingPhotoProof} 
                  alt="Proof" 
                  style={{ width: '100%', borderRadius: '12px', maxHeight: '200px', objectFit: 'cover' }}
                />
                <button
                  onClick={() => setViewingPhotoProof(null)}
                  style={{
                    width: '100%',
                    marginTop: '8px',
                    padding: '8px',
                    background: '#f3f4f6',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#6b7280',
                    cursor: 'pointer'
                  }}
                >
                  Hide Photo
                </button>
              </div>
            )}

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {tasks.filter(t => t.status === 'pending_approval').length === 0 && familyWins.filter(w => w.status === 'pending').length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: '#6b7280' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
                  <div>All caught up! No pending approvals.</div>
                </div>
              ) : (
                <>
                  {/* Pending Tasks */}
                  {tasks.filter(t => t.status === 'pending_approval').length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#6b7280', marginBottom: '10px' }}>📋 Tasks</div>
                      {tasks.filter(t => t.status === 'pending_approval').map(task => {
                        const member = familyMembers.find(m => m.name === task.completedBy);
                        return (
                          <div 
                            key={task.id}
                            style={{
                              background: '#f9fafb',
                              borderRadius: '14px',
                              padding: '14px',
                              marginBottom: '12px',
                              border: '2px solid #fde68a'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                              <span style={{ fontSize: '28px' }}>{member?.avatar || '👤'}</span>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '700', color: '#1e1b4b', fontSize: '15px' }}>{task.title}</div>
                                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                                  {task.completedBy} • {task.completedAt ? new Date(task.completedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}
                                </div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '14px', fontWeight: '700', color: '#7c3aed' }}>+{task.xp} XP</div>
                                {task.isMandatory && (
                                  <div style={{ fontSize: '12px', color: '#d97706' }}>+{Math.floor(task.xp / 15)} 🪙</div>
                                )}
                              </div>
                            </div>

                            {/* Photo proof button */}
                            {task.photoProof && (
                              <button
                                onClick={() => setViewingPhotoProof(viewingPhotoProof === task.photoProof ? null : task.photoProof)}
                                style={{
                                  width: '100%',
                                  padding: '10px',
                                  background: '#dbeafe',
                                  border: 'none',
                                  borderRadius: '8px',
                                  fontSize: '13px',
                                  color: '#1d4ed8',
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  marginBottom: '10px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '6px'
                                }}
                              >
                                📷 {viewingPhotoProof === task.photoProof ? 'Hide' : 'View'} Photo Proof
                              </button>
                            )}

                            {/* Approve / Reject buttons */}
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => {
                                  rejectTask(task.id, 'Please redo');
                                  showNotification('Task returned for redo');
                                }}
                                style={{
                                  flex: 1,
                                  padding: '10px',
                                  background: '#fee2e2',
                                  border: 'none',
                                  borderRadius: '10px',
                                  fontWeight: '700',
                                  fontSize: '13px',
                                  color: '#dc2626',
                                  cursor: 'pointer'
                                }}
                              >
                                ↩️ Redo
                              </button>
                              <button
                                onClick={() => {
                                  actuallyCompleteTask(task.id);
                                  showNotification(`Approved! ${task.completedBy} earned +${task.xp} XP 🎉`);
                                }}
                                style={{
                                  flex: 2,
                                  padding: '10px',
                                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                                  border: 'none',
                                  borderRadius: '10px',
                                  fontWeight: '700',
                                  fontSize: '13px',
                                  color: 'white',
                                  cursor: 'pointer'
                                }}
                              >
                                ✅ Approve
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Pending Family Wins */}
                  {familyWins.filter(w => w.status === 'pending').length > 0 && (
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#6b7280', marginBottom: '10px' }}>🏆 Family Wins</div>
                      {familyWins.filter(w => w.status === 'pending').map(win => (
                        <div 
                          key={win.id}
                          style={{
                            background: '#fffbeb',
                            borderRadius: '14px',
                            padding: '14px',
                            marginBottom: '12px',
                            border: '2px solid #fde68a'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <span style={{ fontSize: '28px' }}>{win.avatar}</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: '700', color: '#1e1b4b', fontSize: '14px' }}>{win.from}</div>
                              <div style={{ fontSize: '12px', color: '#6b7280' }}>{win.timestamp}</div>
                            </div>
                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#7c3aed' }}>+5 XP</div>
                          </div>
                          
                          <div style={{ 
                            background: 'white', 
                            borderRadius: '10px', 
                            padding: '12px', 
                            marginBottom: '10px',
                            fontSize: '14px',
                            color: '#1e1b4b'
                          }}>
                            "{win.text}"
                          </div>

                          {/* Approve / Reject buttons */}
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => {
                                setFamilyWins(familyWins.filter(w => w.id !== win.id));
                                addNotification(win.from, {
                                  type: 'approval',
                                  from: currentUser.name,
                                  text: `didn't approve your win - try sharing something more specific!`
                                });
                                showNotification('Win rejected');
                              }}
                              style={{
                                flex: 1,
                                padding: '10px',
                                background: '#fee2e2',
                                border: 'none',
                                borderRadius: '10px',
                                fontWeight: '700',
                                fontSize: '13px',
                                color: '#dc2626',
                                cursor: 'pointer'
                              }}
                            >
                              ✕ Reject
                            </button>
                            <button
                              onClick={() => {
                                setFamilyWins(familyWins.map(w => w.id === win.id ? { ...w, status: 'approved' } : w));
                                // Award XP to the kid
                                const member = familyMembers.find(m => m.name === win.from);
                                if (member) {
                                  setFamilyMembers(prev => prev.map(m => 
                                    m.name === win.from ? { ...m, xp: (m.xp || 0) + 5 } : m
                                  ));
                                  if (currentUser.name === win.from) {
                                    setCurrentUser(prev => ({ ...prev, xp: prev.xp + 5 }));
                                  }
                                }
                                addNotification(win.from, {
                                  type: 'approval',
                                  from: currentUser.name,
                                  text: `approved your win! +5 XP 🎉`
                                });
                                showNotification(`Approved! ${win.from} earned +5 XP 🎉`);
                              }}
                              style={{
                                flex: 2,
                                padding: '10px',
                                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                                border: 'none',
                                borderRadius: '10px',
                                fontWeight: '700',
                                fontSize: '13px',
                                color: 'white',
                                cursor: 'pointer'
                              }}
                            >
                              ✅ Approve
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            <button
              onClick={() => { setShowPendingApprovalsModal(false); setViewingPhotoProof(null); }}
              style={{
                width: '100%',
                padding: '14px',
                background: '#f3f4f6',
                color: '#6b7280',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                marginTop: '12px'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Shop Item Modal (for parents) */}
      {showAddShopItemModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddShopItemModal(false)}>
          <div style={{ ...styles.modal }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>{newShopItem.icon}</div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e1b4b' }}>Add Reward</h2>
              <p style={{ fontSize: '13px', color: '#6b7280' }}>Create a new reward for kids to redeem</p>
            </div>
            
            {/* Icon Picker */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>Icon</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {['🎮', '📱', '🍦', '🍕', '🎬', '🎟️', '🌙', '🏠', '🎁', '🚗', '🛍️', '⭐'].map(icon => (
                  <div
                    key={icon}
                    onClick={() => setNewShopItem(prev => ({ ...prev, icon }))}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: newShopItem.icon === icon ? '#fef3c7' : '#f9fafb',
                      border: newShopItem.icon === icon ? '2px solid #f59e0b' : '2px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      cursor: 'pointer'
                    }}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Name */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Reward Name</label>
              <input
                type="text"
                placeholder="e.g., 30 Min Screen Time, Ice Cream Trip"
                value={newShopItem.name}
                onChange={(e) => setNewShopItem(prev => ({ ...prev, name: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid #e5e7eb',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            
            {/* Description */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Description (optional)</label>
              <input
                type="text"
                placeholder="e.g., Extra device time"
                value={newShopItem.description}
                onChange={(e) => setNewShopItem(prev => ({ ...prev, description: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid #e5e7eb',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            
            {/* Category */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>Category</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { id: 'screen', label: '📱 Screen Time' },
                  { id: 'treat', label: '🍦 Treat' },
                  { id: 'experience', label: '🎬 Experience' },
                  { id: 'privilege', label: '🎟️ Privilege' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setNewShopItem(prev => ({ ...prev, category: cat.id }))}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: 'none',
                      background: newShopItem.category === cat.id ? '#7c3aed' : '#f3f4f6',
                      color: newShopItem.category === cat.id ? 'white' : '#6b7280',
                      fontWeight: '600',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Price */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>Price (coins)</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[10, 20, 30, 50, 75, 100].map(price => (
                  <button
                    key={price}
                    onClick={() => setNewShopItem(prev => ({ ...prev, price }))}
                    style={{
                      flex: 1,
                      minWidth: '50px',
                      padding: '12px 8px',
                      borderRadius: '10px',
                      border: 'none',
                      background: newShopItem.price === price ? '#f59e0b' : '#f3f4f6',
                      color: newShopItem.price === price ? 'white' : '#6b7280',
                      fontWeight: '700',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    {price}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Or custom price"
                value={newShopItem.price}
                onChange={(e) => setNewShopItem(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: '2px solid #e5e7eb',
                  fontSize: '14px',
                  outline: 'none',
                  marginTop: '8px',
                  textAlign: 'center'
                }}
              />
            </div>
            
            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  setShowAddShopItemModal(false);
                  setNewShopItem({ name: '', icon: '🎁', price: 20, category: 'treat', description: '' });
                }}
                style={{ flex: 1, padding: '14px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer', fontSize: '14px' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newShopItem.name.trim() && newShopItem.price > 0) {
                    setShopItems(prev => [...prev, {
                      id: Date.now(),
                      name: newShopItem.name.trim(),
                      icon: newShopItem.icon,
                      price: newShopItem.price,
                      category: newShopItem.category,
                      description: newShopItem.description.trim()
                    }]);
                    showNotification('Reward added to shop! 🛒');
                    setShowAddShopItemModal(false);
                    setNewShopItem({ name: '', icon: '🎁', price: 20, category: 'treat', description: '' });
                  }
                }}
                disabled={!newShopItem.name.trim() || newShopItem.price <= 0}
                style={{ 
                  flex: 1, 
                  padding: '14px', 
                  background: (newShopItem.name.trim() && newShopItem.price > 0) ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : '#e5e7eb', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontWeight: '700', 
                  color: (newShopItem.name.trim() && newShopItem.price > 0) ? 'white' : '#9ca3af', 
                  cursor: (newShopItem.name.trim() && newShopItem.price > 0) ? 'pointer' : 'not-allowed',
                  fontSize: '14px'
                }}
              >
                Add Reward
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Self-Care Activity Modal */}
      {showSelfCareModal && selectedSelfCareActivity && (
        <div style={styles.modalOverlay} onClick={() => { setShowSelfCareModal(false); setSelfCareNote(''); }}>
          <div style={{ ...styles.modal, textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>{selectedSelfCareActivity.icon}</div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e1b4b', marginBottom: '8px' }}>{selectedSelfCareActivity.name}</h2>
            <div style={{ background: '#d1fae5', borderRadius: '10px', padding: '8px 16px', display: 'inline-block', marginBottom: '16px' }}>
              <span style={{ color: '#10b981', fontWeight: '700' }}>+{selectedSelfCareActivity.xp} XP</span>
            </div>
            
            {selectedSelfCareActivity.todayCount > 0 && (
              <div style={{ background: '#f0fdf4', borderRadius: '10px', padding: '10px', marginBottom: '16px', fontSize: '13px', color: '#166534' }}>
                ✓ Already logged {selectedSelfCareActivity.todayCount} time{selectedSelfCareActivity.todayCount > 1 ? 's' : ''} today
              </div>
            )}
            
            <textarea
              placeholder={selectedSelfCareActivity.prompt}
              value={selfCareNote}
              onChange={(e) => setSelfCareNote(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                fontSize: '14px',
                minHeight: '80px',
                resize: 'none',
                marginBottom: '16px',
                outline: 'none'
              }}
            />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => { setShowSelfCareModal(false); setSelfCareNote(''); }}
                style={{ flex: 1, padding: '12px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setSelfCareActivities(selfCareActivities.map(a => 
                    a.id === selectedSelfCareActivity.id 
                      ? { ...a, todayCount: a.todayCount + 1, todayNotes: [...a.todayNotes, selfCareNote] }
                      : a
                  ));
                  setCurrentUser(prev => ({ ...prev, xp: prev.xp + selectedSelfCareActivity.xp }));
                  showNotification(`+${selectedSelfCareActivity.xp} XP for ${selectedSelfCareActivity.name}! 🌟`);
                  setShowSelfCareModal(false);
                  setSelfCareNote('');
                }}
                style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', borderRadius: '12px', fontWeight: '700', color: 'white', cursor: 'pointer' }}
              >
                Log Activity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Theme Activity Modal */}
      {showThemeActivityModal && selectedThemeActivity && currentTheme && (
        <div style={styles.modalOverlay} onClick={() => { setShowThemeActivityModal(false); setThemeActivityNote(''); }}>
          <div style={{ ...styles.modal, textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>{currentTheme.icon}</div>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1e1b4b', marginBottom: '8px' }}>{selectedThemeActivity.title}</h2>
            <div style={{ background: '#f3e8ff', borderRadius: '10px', padding: '8px 16px', display: 'inline-block', marginBottom: '16px' }}>
              <span style={{ color: '#7c3aed', fontWeight: '700' }}>+{selectedThemeActivity.xp} XP</span>
            </div>
            
            {selectedThemeActivity.todayCount > 0 && (
              <div style={{ background: '#f3e8ff', borderRadius: '10px', padding: '10px', marginBottom: '16px', fontSize: '13px', color: '#6d28d9' }}>
                ✓ Already done {selectedThemeActivity.todayCount} time{selectedThemeActivity.todayCount > 1 ? 's' : ''} today
              </div>
            )}
            
            <textarea
              placeholder="Add a note about this activity (optional)"
              value={themeActivityNote}
              onChange={(e) => setThemeActivityNote(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                fontSize: '14px',
                minHeight: '80px',
                resize: 'none',
                marginBottom: '16px',
                outline: 'none'
              }}
            />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => { setShowThemeActivityModal(false); setThemeActivityNote(''); }}
                style={{ flex: 1, padding: '12px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setThemeActivities(themeActivities.map(a => 
                    a.id === selectedThemeActivity.id 
                      ? { ...a, todayCount: a.todayCount + 1, todayNotes: [...a.todayNotes, themeActivityNote] }
                      : a
                  ));
                  setCurrentUser(prev => ({ ...prev, xp: prev.xp + selectedThemeActivity.xp }));
                  showNotification(`+${selectedThemeActivity.xp} XP for ${selectedThemeActivity.title}! 🌱`);
                  setShowThemeActivityModal(false);
                  setThemeActivityNote('');
                }}
                style={{ flex: 1, padding: '12px', background: `linear-gradient(135deg, ${currentTheme.color} 0%, ${currentTheme.color}dd 100%)`, border: 'none', borderRadius: '12px', fontWeight: '700', color: 'white', cursor: 'pointer' }}
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Achievement Unlock Celebration */}
      {newAchievement && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'white',
          borderRadius: '16px',
          padding: '16px 24px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: `3px solid ${newAchievement.color}`,
          animation: 'slideDown 0.5s ease-out'
        }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            borderRadius: '12px', 
            background: `${newAchievement.color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px'
          }}>
            {newAchievement.icon}
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '600', color: newAchievement.color, textTransform: 'uppercase' }}>Achievement Unlocked!</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b' }}>{newAchievement.name}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>{newAchievement.description}</div>
          </div>
        </div>
      )}

      {/* Weekly Family Meeting Modal */}
      {showFamilyMeetingModal && (
        <div style={styles.modalOverlay} onClick={() => setShowFamilyMeetingModal(false)}>
          <div style={{ ...styles.modal, maxHeight: '85vh', display: 'flex', flexDirection: 'column', maxWidth: '400px' }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>📋</div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1e1b4b' }}>Weekly Family Meeting</h2>
              <p style={{ fontSize: '13px', color: '#6b7280' }}>Celebrate wins and set goals together!</p>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {/* This Week's Summary */}
              <div style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%)', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#7c3aed', marginBottom: '12px' }}>📊 This Week's Summary</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '22px', fontWeight: '800', color: '#7c3aed' }}>{getWeeklyFamilyStats().totalTasksCompleted}</div>
                    <div style={{ fontSize: '11px', color: '#6b7280' }}>Tasks Done</div>
                  </div>
                  <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '22px', fontWeight: '800', color: '#10b981' }}>{getWeeklyFamilyStats().totalXpEarned.toLocaleString()}</div>
                    <div style={{ fontSize: '11px', color: '#6b7280' }}>XP Earned</div>
                  </div>
                  <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '22px', fontWeight: '800', color: '#d97706' }}>{getWeeklyFamilyStats().totalCoinsEarned}</div>
                    <div style={{ fontSize: '11px', color: '#6b7280' }}>Coins Earned</div>
                  </div>
                  <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '22px', fontWeight: '800', color: '#ec4899' }}>{getWeeklyFamilyStats().goalProgress}%</div>
                    <div style={{ fontSize: '11px', color: '#6b7280' }}>Goal Progress</div>
                  </div>
                </div>
              </div>

              {/* Individual Progress */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e1b4b', marginBottom: '10px' }}>👨‍👩‍👧‍👦 Individual Progress</div>
                {familyMembers.filter(m => m.role !== 'parent').map(kid => {
                  const kidStats = userAchievements[kid.name]?.stats || {};
                  return (
                    <div 
                      key={kid.name}
                      style={{
                        background: '#f9fafb',
                        borderRadius: '12px',
                        padding: '14px',
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <span style={{ fontSize: '32px' }}>{kid.avatar}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '700', color: '#1e1b4b' }}>{kid.name}</div>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '12px', marginTop: '4px' }}>
                          <span style={{ color: '#7c3aed' }}>Lvl {getLevelFromXp(kid.xp || 0)}</span>
                          <span style={{ color: '#f59e0b' }}>🔥 {kid.streak || 0}</span>
                          <span style={{ color: '#10b981' }}>✓ {kidStats.tasksCompleted || 0} tasks</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '800', color: '#7c3aed' }}>{(kid.xp || 0).toLocaleString()}</div>
                        <div style={{ fontSize: '11px', color: '#6b7280' }}>XP</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Celebrations */}
              <div style={{ background: '#fef3c7', borderRadius: '12px', padding: '14px', marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#92400e', marginBottom: '10px' }}>🎉 Celebrate!</div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#78350f' }}>
                  {getWeeklyFamilyStats().topPerformer && (
                    <li style={{ marginBottom: '6px' }}>{getWeeklyFamilyStats().topPerformer.avatar} {getWeeklyFamilyStats().topPerformer.name} earned the most XP!</li>
                  )}
                  {getWeeklyFamilyStats().longestStreak && getWeeklyFamilyStats().longestStreak.streak > 0 && (
                    <li style={{ marginBottom: '6px' }}>{getWeeklyFamilyStats().longestStreak.avatar} {getWeeklyFamilyStats().longestStreak.name} has a {getWeeklyFamilyStats().longestStreak.streak} day streak!</li>
                  )}
                  {familyGoals.length > 0 && getWeeklyFamilyStats().goalProgress > 0 && (
                    <li>Family goal is {getWeeklyFamilyStats().goalProgress}% complete!</li>
                  )}
                </ul>
              </div>

              {/* Discussion Topics */}
              <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '14px', marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#166534', marginBottom: '10px' }}>💬 Discussion Topics</div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#14532d' }}>
                  <li style={{ marginBottom: '6px' }}>What went well this week?</li>
                  <li style={{ marginBottom: '6px' }}>What was challenging?</li>
                  <li style={{ marginBottom: '6px' }}>How can we help each other?</li>
                  <li>What are our goals for next week?</li>
                </ul>
              </div>

              {/* Meeting Notes */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>📝 Meeting Notes (optional)</label>
                <textarea
                  placeholder="Record highlights, decisions, goals for next week..."
                  value={weeklyMeetingNotes}
                  onChange={(e) => setWeeklyMeetingNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    fontSize: '14px',
                    minHeight: '80px',
                    resize: 'none',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowFamilyMeetingModal(false)}
                style={{ flex: 1, padding: '14px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer', fontSize: '14px' }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (weeklyMeetingNotes.trim()) {
                    setWeeklyHighlights(prev => [{
                      id: Date.now(),
                      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                      notes: weeklyMeetingNotes.trim(),
                      highlights: []
                    }, ...prev]);
                    setWeeklyMeetingNotes('');
                    showNotification('Meeting notes saved! 📋');
                  }
                  setShowFamilyMeetingModal(false);
                }}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {weeklyMeetingNotes.trim() ? 'Save & Close' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Parent Dashboard Modal */}
      {showParentDashboard && (
        <div style={styles.modalOverlay} onClick={() => setShowParentDashboard(false)}>
          <div style={{ ...styles.modal, maxHeight: '85vh', display: 'flex', flexDirection: 'column', maxWidth: '400px' }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>📊</div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1e1b4b' }}>Parent Dashboard</h2>
              <p style={{ fontSize: '13px', color: '#6b7280' }}>Overview of your family's activity</p>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {/* Quick Actions */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                <div 
                  onClick={() => { setShowParentDashboard(false); setActiveTab('wallet'); }}
                  style={{
                    background: allowanceRequests.filter(r => r.status === 'pending').length > 0 ? '#fef3c7' : '#f9fafb',
                    borderRadius: '12px',
                    padding: '14px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: allowanceRequests.filter(r => r.status === 'pending').length > 0 ? '2px solid #f59e0b' : '2px solid transparent'
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>💰</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#1e1b4b' }}>{allowanceRequests.filter(r => r.status === 'pending').length}</div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>Allowance Requests</div>
                </div>
                <div 
                  onClick={() => { setShowParentDashboard(false); setActiveTab('wallet'); setWalletTab('shop'); }}
                  style={{
                    background: shopPurchases.filter(p => p.status === 'pending').length > 0 ? '#f3e8ff' : '#f9fafb',
                    borderRadius: '12px',
                    padding: '14px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: shopPurchases.filter(p => p.status === 'pending').length > 0 ? '2px solid #7c3aed' : '2px solid transparent'
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>🛒</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#1e1b4b' }}>{shopPurchases.filter(p => p.status === 'pending').length}</div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>Shop Redemptions</div>
                </div>
              </div>

              {/* Weekly Summary */}
              <div style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%)', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#7c3aed', marginBottom: '12px' }}>📈 This Week</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '22px', fontWeight: '800', color: '#7c3aed' }}>
                      {familyMembers.filter(m => m.role !== 'parent').reduce((sum, m) => sum + getWeeklyXp(m.name), 0)}
                    </div>
                    <div style={{ fontSize: '11px', color: '#6b7280' }}>Total XP</div>
                  </div>
                  <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '22px', fontWeight: '800', color: '#d97706' }}>
                      {familyMembers.filter(m => m.role !== 'parent').reduce((sum, m) => sum + (m.coins || 0), 0)}
                    </div>
                    <div style={{ fontSize: '11px', color: '#6b7280' }}>Coins Owed</div>
                  </div>
                </div>
              </div>

              {/* Kids Overview */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e1b4b', marginBottom: '10px' }}>👧👦 Kids</div>
                {familyMembers.filter(m => m.role !== 'parent').map(kid => (
                  <div 
                    key={kid.name}
                    style={{
                      background: 'white',
                      borderRadius: '14px',
                      padding: '14px',
                      marginBottom: '10px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '36px' }}>{kid.avatar}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '800', color: '#1e1b4b', fontSize: '16px' }}>{kid.name}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>Level {getLevelFromXp(kid.xp || 0)} • 🔥 {kid.streak || 0} streak</div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                      <div style={{ background: '#f3e8ff', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                        <div style={{ fontWeight: '800', color: '#7c3aed', fontSize: '14px' }}>{(kid.xp || 0).toLocaleString()}</div>
                        <div style={{ fontSize: '10px', color: '#9333ea' }}>XP</div>
                      </div>
                      <div style={{ background: '#fef3c7', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                        <div style={{ fontWeight: '800', color: '#d97706', fontSize: '14px' }}>{kid.coins || 0}</div>
                        <div style={{ fontSize: '10px', color: '#b45309' }}>Coins</div>
                      </div>
                      <div style={{ background: '#d1fae5', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                        <div style={{ fontWeight: '800', color: '#059669', fontSize: '14px' }}>
                          {tasks.filter(t => t.status === 'completed' && t.assignedTo === kid.name).length}
                        </div>
                        <div style={{ fontSize: '10px', color: '#059669' }}>Done</div>
                      </div>
                    </div>
                    
                    {/* Pending tasks */}
                    {tasks.filter(t => t.status === 'open' && t.assignedTo === kid.name).length > 0 && (
                      <div style={{ marginTop: '10px', padding: '8px', background: '#fef2f2', borderRadius: '8px', fontSize: '12px', color: '#dc2626' }}>
                        ⚠️ {tasks.filter(t => t.status === 'open' && t.assignedTo === kid.name).length} tasks pending
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e1b4b', marginBottom: '10px' }}>⏱️ Recent Activity</div>
                <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '14px' }}>
                  {tasks.filter(t => t.status === 'completed').slice(0, 5).map((task, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: idx < 4 ? '10px' : 0 }}>
                      <span style={{ fontSize: '16px' }}>✅</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e1b4b' }}>{task.title}</div>
                        <div style={{ fontSize: '11px', color: '#6b7280' }}>{task.assignedTo} • {task.dueDate}</div>
                      </div>
                      <span style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '600' }}>+{task.xp}</span>
                    </div>
                  ))}
                  {tasks.filter(t => t.status === 'completed').length === 0 && (
                    <div style={{ textAlign: 'center', color: '#6b7280', fontSize: '13px' }}>No completed tasks yet</div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowParentDashboard(false)}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                marginTop: '12px'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Achievements Modal */}
      {showAchievementsModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAchievementsModal(false)}>
          <div style={{ ...styles.modal, maxHeight: '80vh', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏆</div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e1b4b' }}>Achievements</h2>
              <p style={{ fontSize: '13px', color: '#6b7280' }}>
                {userAchievements[currentUser.name]?.unlockedAchievements?.length || 0} of {achievementDefinitions.length} unlocked
              </p>
            </div>

            {/* Stats Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              <div style={{ background: '#f3e8ff', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#7c3aed' }}>{userAchievements[currentUser.name]?.stats?.tasksCompleted || 0}</div>
                <div style={{ fontSize: '10px', color: '#9333ea' }}>Tasks</div>
              </div>
              <div style={{ background: '#fef3c7', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#d97706' }}>{userAchievements[currentUser.name]?.stats?.bestStreak || currentUser.streak || 0}</div>
                <div style={{ fontSize: '10px', color: '#b45309' }}>Best Streak</div>
              </div>
              <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#10b981' }}>{currentUser.xp.toLocaleString()}</div>
                <div style={{ fontSize: '10px', color: '#059669' }}>Total XP</div>
              </div>
            </div>

            {/* Achievements List */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {/* By Category */}
              {['streak', 'tasks', 'xp', 'level', 'coins', 'special'].map(category => {
                const categoryAchievements = achievementDefinitions.filter(a => a.category === category);
                const categoryNames = { streak: '🔥 Streak', tasks: '✅ Tasks', xp: '⚡ XP', level: '⭐ Level', coins: '🪙 Coins', special: '✨ Special' };
                return (
                  <div key={category} style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#6b7280', marginBottom: '8px' }}>{categoryNames[category]}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                      {categoryAchievements.map(achievement => {
                        const unlocked = userAchievements[currentUser.name]?.unlockedAchievements?.includes(achievement.id);
                        return (
                          <div 
                            key={achievement.id}
                            style={{
                              padding: '12px 8px',
                              background: unlocked ? `${achievement.color}15` : '#f9fafb',
                              borderRadius: '12px',
                              textAlign: 'center',
                              opacity: unlocked ? 1 : 0.5,
                              border: unlocked ? `2px solid ${achievement.color}40` : '2px solid transparent'
                            }}
                          >
                            <div style={{ fontSize: '24px', marginBottom: '4px', filter: unlocked ? 'none' : 'grayscale(1)' }}>{achievement.icon}</div>
                            <div style={{ fontSize: '10px', fontWeight: '700', color: unlocked ? achievement.color : '#9ca3af', marginBottom: '2px' }}>{achievement.name}</div>
                            <div style={{ fontSize: '9px', color: '#6b7280' }}>{achievement.description}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowAchievementsModal(false)}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                marginTop: '12px'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}


      {/* Level Up Modal */}
      {showLevelUpModal && levelUpInfo && (
        <div style={styles.modalOverlay} onClick={() => setShowLevelUpModal(false)}>
          <div style={{ ...styles.modal, textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#7c3aed', marginBottom: '8px' }}>Level Up!</h2>
            <div style={{ fontSize: '48px', fontWeight: '800', color: '#1e1b4b', marginBottom: '8px' }}>
              Level {levelUpInfo.newLevel}
            </div>
            <div style={{ fontSize: '18px', color: '#7c3aed', fontWeight: '600', marginBottom: '24px' }}>
              "{levelUpInfo.title}"
            </div>
            
            {levelUpInfo.coinBonus > 0 && (
              <div style={{ background: '#fef3c7', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#d97706' }}>
                  🪙 +{levelUpInfo.coinBonus} Bonus Coins!
                </div>
              </div>
            )}
            
            {levelUpInfo.unlocks.length > 0 && (
              <div style={{ background: '#f3e8ff', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#7c3aed', marginBottom: '8px' }}>
                  🔓 New Unlocks!
                </div>
                <div style={{ fontSize: '13px', color: '#6b21a8' }}>
                  {levelUpInfo.unlocks.map(u => {
                    const avatar = avatarOptions.find(a => a.id === u);
                    if (avatar) return `${avatar.emoji} ${avatar.name}`;
                    if (u.startsWith('shop_')) return '🛒 New shop item';
                    if (u.startsWith('perk_')) return '⚡ Weekend coin bonus';
                    return u;
                  }).join(' • ')}
                </div>
              </div>
            )}
            
            <button 
              style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)', color: 'white', border: 'none', borderRadius: '16px', fontWeight: '800', fontSize: '16px', cursor: 'pointer' }} 
              onClick={() => setShowLevelUpModal(false)}
            >
              Awesome! 🚀
            </button>
          </div>
        </div>
      )}

      {/* Onboarding Flow */}
      {showOnboarding && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          {/* Progress Dots */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            {[1, 2, 3, 4, 5, 6].map(step => (
              <div
                key={step}
                style={{
                  width: step === onboardingStep ? '24px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  background: step <= onboardingStep ? 'white' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </div>

          {/* Step Content */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '32px 24px',
            width: '100%',
            maxWidth: '380px',
            maxHeight: '70vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            
            {/* Step 1: Welcome */}
            {onboardingStep === 1 && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
                <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e1b4b', marginBottom: '12px' }}>
                  Welcome to Looped Life!
                </h1>
                <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
                  The family app that makes chores fun, teaches money skills, and brings everyone together.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left', background: '#f9fafb', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>⚡</span>
                    <span style={{ color: '#1e1b4b', fontWeight: '600' }}>Kids earn XP & coins for tasks</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>🎯</span>
                    <span style={{ color: '#1e1b4b', fontWeight: '600' }}>Work together toward family goals</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>💰</span>
                    <span style={{ color: '#1e1b4b', fontWeight: '600' }}>Learn saving & spending habits</span>
                  </div>
                </div>
                <button
                  onClick={() => setOnboardingStep(2)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    fontWeight: '800',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  Let's Get Started! 🚀
                </button>
              </div>
            )}

            {/* Step 2: Family Name & Parent */}
            {onboardingStep === 2 && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>👨‍👩‍👧‍👦</div>
                  <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1e1b4b' }}>Create Your Family</h2>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>Family Name</label>
                  <input
                    type="text"
                    placeholder="e.g., The Smiths, Casa Garcia"
                    value={onboardingData.familyName}
                    onChange={(e) => setOnboardingData(prev => ({ ...prev, familyName: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '2px solid #e5e7eb',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>Your Name</label>
                  <input
                    type="text"
                    placeholder="Mom, Dad, Parent..."
                    value={onboardingData.parentName}
                    onChange={(e) => setOnboardingData(prev => ({ ...prev, parentName: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '2px solid #e5e7eb',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>Pick Your Avatar</label>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {['👩', '👨', '👩‍🦱', '👨‍🦱', '👩‍🦰', '👨‍🦰', '🧑', '👱‍♀️', '👱'].map(emoji => (
                      <div
                        key={emoji}
                        onClick={() => setOnboardingData(prev => ({ ...prev, parentAvatar: emoji }))}
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '14px',
                          background: onboardingData.parentAvatar === emoji ? '#f3e8ff' : '#f9fafb',
                          border: onboardingData.parentAvatar === emoji ? '3px solid #7c3aed' : '3px solid transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '28px',
                          cursor: 'pointer'
                        }}
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setOnboardingStep(1)}
                    style={{ flex: 1, padding: '14px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer' }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => onboardingData.familyName && onboardingData.parentName && setOnboardingStep(3)}
                    disabled={!onboardingData.familyName || !onboardingData.parentName}
                    style={{
                      flex: 2,
                      padding: '14px',
                      background: (onboardingData.familyName && onboardingData.parentName) ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : '#e5e7eb',
                      color: (onboardingData.familyName && onboardingData.parentName) ? 'white' : '#9ca3af',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: '700',
                      cursor: (onboardingData.familyName && onboardingData.parentName) ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Add Kids */}
            {onboardingStep === 3 && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>👧👦</div>
                  <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1e1b4b' }}>Add Your Kids</h2>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>Who's joining the family?</p>
                </div>

                {/* Kids List */}
                {onboardingData.kids.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    {onboardingData.kids.map((kid, idx) => (
                      <div 
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px',
                          background: '#f9fafb',
                          borderRadius: '12px',
                          marginBottom: '8px'
                        }}
                      >
                        <span style={{ fontSize: '32px' }}>{kid.avatar}</span>
                        <span style={{ flex: 1, fontWeight: '700', color: '#1e1b4b' }}>{kid.name}</span>
                        <button
                          onClick={() => setOnboardingData(prev => ({
                            ...prev,
                            kids: prev.kids.filter((_, i) => i !== idx)
                          }))}
                          style={{ background: '#fef2f2', border: 'none', color: '#dc2626', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Kid Form */}
                <div style={{ background: '#f9fafb', borderRadius: '16px', padding: '16px', marginBottom: '20px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <input
                      type="text"
                      placeholder="Child's name"
                      value={tempKidName}
                      onChange={(e) => setTempKidName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '10px',
                        border: '2px solid #e5e7eb',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    {['👦', '👧', '🧒', '👶', '🧑', '👱‍♂️', '👱‍♀️', '🧒🏽', '🧒🏿'].map(emoji => (
                      <div
                        key={emoji}
                        onClick={() => setTempKidAvatar(emoji)}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          background: tempKidAvatar === emoji ? '#f3e8ff' : 'white',
                          border: tempKidAvatar === emoji ? '2px solid #7c3aed' : '2px solid #e5e7eb',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '22px',
                          cursor: 'pointer'
                        }}
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      if (tempKidName.trim()) {
                        setOnboardingData(prev => ({
                          ...prev,
                          kids: [...prev.kids, { name: tempKidName.trim(), avatar: tempKidAvatar }]
                        }));
                        setTempKidName('');
                        setTempKidAvatar('👦');
                      }
                    }}
                    disabled={!tempKidName.trim()}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: tempKidName.trim() ? '#10b981' : '#e5e7eb',
                      color: tempKidName.trim() ? 'white' : '#9ca3af',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: '700',
                      cursor: tempKidName.trim() ? 'pointer' : 'not-allowed'
                    }}
                  >
                    + Add Child
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setOnboardingStep(2)}
                    style={{ flex: 1, padding: '14px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer' }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => onboardingData.kids.length > 0 && setOnboardingStep(4)}
                    disabled={onboardingData.kids.length === 0}
                    style={{
                      flex: 2,
                      padding: '14px',
                      background: onboardingData.kids.length > 0 ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : '#e5e7eb',
                      color: onboardingData.kids.length > 0 ? 'white' : '#9ca3af',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: '700',
                      cursor: onboardingData.kids.length > 0 ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Coin Value */}
            {onboardingStep === 4 && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>💰</div>
                  <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1e1b4b' }}>Set Coin Value</h2>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>How much is each coin worth in real money?</p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>Currency</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['$', '€', '£', '₪'].map(sym => (
                      <button
                        key={sym}
                        onClick={() => setOnboardingData(prev => ({ ...prev, currencySymbol: sym }))}
                        style={{
                          flex: 1,
                          padding: '12px',
                          borderRadius: '10px',
                          border: 'none',
                          background: onboardingData.currencySymbol === sym ? '#7c3aed' : '#f3f4f6',
                          color: onboardingData.currencySymbol === sym ? 'white' : '#6b7280',
                          fontWeight: '700',
                          fontSize: '18px',
                          cursor: 'pointer'
                        }}
                      >
                        {sym}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>1 Coin = ?</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {[0.05, 0.10, 0.25, 0.50, 1.00].map(val => (
                      <button
                        key={val}
                        onClick={() => setOnboardingData(prev => ({ ...prev, coinValue: val }))}
                        style={{
                          flex: 1,
                          minWidth: '60px',
                          padding: '14px 8px',
                          borderRadius: '12px',
                          border: 'none',
                          background: onboardingData.coinValue === val ? '#f59e0b' : '#f3f4f6',
                          color: onboardingData.coinValue === val ? 'white' : '#6b7280',
                          fontWeight: '700',
                          fontSize: '14px',
                          cursor: 'pointer'
                        }}
                      >
                        {onboardingData.currencySymbol}{val.toFixed(2)}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ background: '#fef3c7', borderRadius: '12px', padding: '16px', marginBottom: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', color: '#92400e', marginBottom: '4px' }}>Example: A 25 XP chore earns</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#f59e0b' }}>
                    {Math.floor(25 / 15)} coins = {onboardingData.currencySymbol}{(Math.floor(25 / 15) * onboardingData.coinValue).toFixed(2)}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setOnboardingStep(3)}
                    style={{ flex: 1, padding: '14px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer' }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setOnboardingStep(5)}
                    style={{
                      flex: 2,
                      padding: '14px',
                      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: First Family Goal */}
            {onboardingStep === 5 && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎯</div>
                  <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1e1b4b' }}>First Family Goal</h2>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>What will your family work toward together?</p>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>Pick an Icon</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {['🏖️', '🎢', '🎬', '🍕', '🎮', '⛺', '🚗', '🎁', '🎉', '🏆', '🍦', '🎪'].map(icon => (
                      <div
                        key={icon}
                        onClick={() => setOnboardingData(prev => ({ ...prev, firstGoalIcon: icon }))}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          background: onboardingData.firstGoalIcon === icon ? '#fef3c7' : '#f9fafb',
                          border: onboardingData.firstGoalIcon === icon ? '2px solid #f59e0b' : '2px solid transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '22px',
                          cursor: 'pointer'
                        }}
                      >
                        {icon}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>Goal Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Beach Day, Movie Night, Pizza Party"
                    value={onboardingData.firstGoalName}
                    onChange={(e) => setOnboardingData(prev => ({ ...prev, firstGoalName: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '2px solid #e5e7eb',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '8px' }}>Target XP</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[5000, 10000, 15000, 25000].map(xp => (
                      <button
                        key={xp}
                        onClick={() => setOnboardingData(prev => ({ ...prev, firstGoalXp: xp }))}
                        style={{
                          flex: 1,
                          padding: '12px 8px',
                          borderRadius: '10px',
                          border: 'none',
                          background: onboardingData.firstGoalXp === xp ? '#f59e0b' : '#f3f4f6',
                          color: onboardingData.firstGoalXp === xp ? 'white' : '#6b7280',
                          fontWeight: '700',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        {(xp / 1000)}k
                      </button>
                    ))}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', textAlign: 'center', marginTop: '8px' }}>
                    ~{Math.ceil(onboardingData.firstGoalXp / 150)} tasks to reach goal
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setOnboardingStep(4)}
                    style={{ flex: 1, padding: '14px', background: '#f3f4f6', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#6b7280', cursor: 'pointer' }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => onboardingData.firstGoalName && setOnboardingStep(6)}
                    disabled={!onboardingData.firstGoalName}
                    style={{
                      flex: 2,
                      padding: '14px',
                      background: onboardingData.firstGoalName ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : '#e5e7eb',
                      color: onboardingData.firstGoalName ? 'white' : '#9ca3af',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: '700',
                      cursor: onboardingData.firstGoalName ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: All Done! */}
            {onboardingStep === 6 && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
                <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e1b4b', marginBottom: '8px' }}>
                  You're All Set!
                </h1>
                <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '24px' }}>
                  Welcome to {onboardingData.familyName || 'your family'}! Let's start the adventure.
                </p>

                {/* Summary */}
                <div style={{ background: '#f9fafb', borderRadius: '16px', padding: '20px', marginBottom: '24px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb' }}>
                    <span style={{ fontSize: '28px' }}>{onboardingData.parentAvatar}</span>
                    <div>
                      <div style={{ fontWeight: '700', color: '#1e1b4b' }}>{onboardingData.parentName}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Parent</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                    {onboardingData.kids.map((kid, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'white', padding: '8px 12px', borderRadius: '10px' }}>
                        <span style={{ fontSize: '20px' }}>{kid.avatar}</span>
                        <span style={{ fontWeight: '600', color: '#1e1b4b', fontSize: '13px' }}>{kid.name}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fef3c7', padding: '12px', borderRadius: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{onboardingData.firstGoalIcon}</span>
                    <div>
                      <div style={{ fontWeight: '700', color: '#78350f', fontSize: '14px' }}>{onboardingData.firstGoalName}</div>
                      <div style={{ fontSize: '12px', color: '#92400e' }}>First family goal: {onboardingData.firstGoalXp.toLocaleString()} XP</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    // Apply onboarding data
                    const newMembers = [
                      { name: onboardingData.parentName, avatar: onboardingData.parentAvatar, role: 'parent', xp: 0, xpBank: 0, level: 1, coins: 0, savings: 0, streak: 0 },
                      ...onboardingData.kids.map(kid => ({
                        name: kid.name,
                        avatar: kid.avatar,
                        role: 'child',
                        xp: 0,
                        xpBank: 0,
                        level: 1,
                        coins: 0,
                        savings: 0,
                        streak: 0
                      }))
                    ];
                    setFamilyMembers(newMembers);
                    setCurrentUser(newMembers[0]);
                    setSettings(prev => ({ ...prev, currencySymbol: onboardingData.currencySymbol, coinValue: onboardingData.coinValue }));
                    setFamilyGoals([{
                      id: Date.now(),
                      name: onboardingData.firstGoalName,
                      icon: onboardingData.firstGoalIcon,
                      targetXp: onboardingData.firstGoalXp,
                      currentXp: 0,
                      contributions: {}
                    }]);
                    setTasks([]);
                    setShowOnboarding(false);
                    showNotification(`Welcome to Looped Life, ${onboardingData.parentName}! 🎉`);
                  }}
                  style={{
                    width: '100%',
                    padding: '18px',
                    background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    fontWeight: '800',
                    fontSize: '17px',
                    cursor: 'pointer'
                  }}
                >
                  Start Using Looped Life! 🚀
                </button>
              </div>
            )}
          </div>

          {/* Skip button (for demo) */}
          <button
            onClick={() => setShowOnboarding(false)}
            style={{
              marginTop: '20px',
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Skip for now (demo mode)
          </button>
        </div>
      )}
    </div>
  );
}
