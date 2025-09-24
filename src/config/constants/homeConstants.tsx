export const categoryList = {
  WRITING: "writing",
  CALCULATOR: "calculator",
  PRODUCTIVITY: "productivity",
  WEB_TOOLS: "web_tools",
  SPIRITUAL: "spiritual",
  HEALTH: "health",
  GAMES: "games",
};

export const toolsList = [
  {
    key: "ai-writer",
    icon: "🤖",
    title: "AI to Human Writer",
    desc: "Transform AI-generated text into natural, human-like content",
    category: [categoryList.WRITING],
  },
  {
    key: "string-converter",
    icon: "🔤",
    title: "String Case Converter",
    desc: "Transform your text into different cases",
    category: [categoryList.WRITING],
  },
  {
    key: "age-calculator",
    icon: "📅",
    title: "Age Calculator",
    desc: "Calculate age, days, months, and years between dates",
    category: [categoryList.CALCULATOR, categoryList.PRODUCTIVITY],
  },
  {
    key: "duplicate-sentence",
    icon: "📝",
    title: "Duplicate Sentence Generator",
    desc: "Create multiple variations of your sentences instantly",
    category: [categoryList.WRITING, categoryList.PRODUCTIVITY],
  },
  {
    key: "clock-time",
    icon: "🕐",
    title: "Clock & Time",
    desc: "World clock with multiple time zones and formats",
    category: [categoryList.PRODUCTIVITY, categoryList.CALCULATOR],
  },
  {
    key: "birthday-countdown",
    icon: "🎉",
    title: "Birthday Countdown",
    desc: "Countdown to your next birthday with live updates",
    category: [categoryList.CALCULATOR, categoryList.PRODUCTIVITY],
  },
  {
    key: "time-percentage",
    icon: "⏳",
    title: "Time Percentage",
    desc: "Calculate the percentage of time elapsed between two dates",
    category: [categoryList.CALCULATOR],
  },
  {
    key: "sunrise-sunset",
    icon: "🌅",
    title: "Sunrise & Sunset",
    desc: "Get accurate sunrise and sunset times for any location",
    category: [categoryList.CALCULATOR, categoryList.WEB_TOOLS],
  },
  {
    key: "moon-phase",
    icon: "🌙",
    title: "Moon Phase Calculator",
    desc: "Calculate the current moon phase and its illumination",
    category: [categoryList.CALCULATOR, categoryList.SPIRITUAL],
  },
  {
    key: "pregnancy-calculator",
    icon: "🤰",
    title: "Pregnancy Calculator",
    desc: "Calculate your pregnancy due date and track milestones",
    category: [categoryList.CALCULATOR, categoryList.HEALTH],
  },
  {
    key: "custom-countdown",
    icon: "⏳",
    title: "Custom Countdown",
    desc: "Create personalized countdowns for important events",
    category: [categoryList.CALCULATOR, categoryList.PRODUCTIVITY],
  },
  {
    key: "business-days",
    icon: "📅",
    title: "Business Days Calculator",
    desc: "Calculate business days between two dates, excluding weekends and holidays",
    category: [categoryList.CALCULATOR, categoryList.PRODUCTIVITY],
  },
  {
    key: "utc-converter",
    icon: "🕒",
    title: "UTC Converter",
    desc: "Convert between local time and UTC (Coordinated Universal Time)",
    category: [categoryList.CALCULATOR, categoryList.WEB_TOOLS],
  },
  {
    key: "time-calculator",
    icon: "⏱️",
    title: "Time Calculator",
    desc: "Perform various time-related calculations",
    category: [categoryList.CALCULATOR],
  },
  {
    key: "historical-date",
    icon: "⏱️",
    title: "Historical Date",
    desc: "Calculate dates in different calendar systems, astrological information, and historical context",
    category: [categoryList.CALCULATOR, categoryList.SPIRITUAL],
  },
  {
    key: "timezone-converter",
    icon: "⏱️",
    title: "Timezone Converter",
    desc: "Convert time between different time zones",
    category: [categoryList.CALCULATOR, categoryList.WEB_TOOLS],
  },
  {
    key: "event-duration",
    icon: "⏱️",
    title: "Event Duration",
    desc: "Calculate duration and metrics for events or project timelines",
    category: [categoryList.CALCULATOR, categoryList.PRODUCTIVITY],
  },
  {
    key: "pomodoro-timer",
    icon: "⏱️",
    title: "Pomodoro Timer",
    desc: "Work/break intervals with productivity tracking",
    category: [categoryList.CALCULATOR, categoryList.PRODUCTIVITY],
  },
  {
    key: "eye-sight-test",
    icon: "👁️",
    title: "Eye Sight Testing",
    desc: "Test your vision and eye health online",
    category: [categoryList.HEALTH],
  },

  {
    key: "crush-calculator",
    icon: "💕",
    title: "Crush Calculator",
    desc: "Calculate compatibility between two names or partners",
    category: [
      categoryList.CALCULATOR,
      categoryList.GAMES,
      categoryList.PRODUCTIVITY,
    ],
  },

  {
    key: "future-relationship",
    icon: "🔮",
    title: "Future Relationship Predictor",
    desc: "Predict your future relationship based on your inputs",
    category: [categoryList.CALCULATOR, categoryList.GAMES],
  },

  {
    key: "color-blindness",
    icon: "👁️",
    title: "Color Blindness Test",
    desc: "Assess your color vision and identify potential deficiencies",
    category: [categoryList.CALCULATOR, categoryList.HEALTH],
  },

  {
    key: "attention-span",
    icon: "⏳",
    title: "Attention Span Test",
    desc: "Measure and improve your attention span with interactive exercises",
    category: [categoryList.HEALTH, categoryList.GAMES],
  },

  {
    key: "stress-assessment",
    icon: "😰",
    title: "Stress Assessment",
    desc: "Evaluate your stress levels and get personalized recommendations",
    category: [categoryList.HEALTH, categoryList.GAMES],
  },
  {
    key: "sleep-quality",
    icon: "😴",
    title: "Sleep Quality Assessment",
    desc: "Evaluate your sleep quality and get personalized recommendations",
    category: [categoryList.HEALTH, categoryList.GAMES],
  },
  {
    key: "risk-assessment",
    icon: "⚠️",
    title: "Risk Assessment",
    desc: "Identify potential health risks and get advice",
    category: [categoryList.HEALTH, categoryList.GAMES],
  },

  // ////////////////////////////

  // {
  //   key: "sentence-compare",
  //   icon: "⚖️",
  //   title: "Sentence Compare",
  //   desc: "Compare and analyze differences between two sentences",
  //   category: [categoryList.WRITING],
  // },
  // {
  //   key: "plagiarism-detector",
  //   icon: "🔍",
  //   title: "Plagiarism & AI Detector",
  //   desc: "Check content for plagiarism and AI-generated text",
  //   category: [categoryList.WRITING],
  // },

  // {
  //   key: "todo",
  //   icon: "✅",
  //   title: "TO-DO List",
  //   desc: "Organize and manage your daily tasks efficiently",
  //   category: [categoryList.PRODUCTIVITY],
  // },
  // {
  //   key: "planner",
  //   icon: "📋",
  //   title: "Smart Planner",
  //   desc: "Timer, calendar, scheduler, and mailer in one tool",
  //   category: [categoryList.PRODUCTIVITY],
  // },

  // {
  //   key: "countdown",
  //   icon: "⏰",
  //   title: "Countdown Timer",
  //   desc: "Create countdown timers for events and deadlines",
  //   category: [categoryList.PRODUCTIVITY],
  // },
  // {
  //   key: "internet-speed",
  //   icon: "🌐",
  //   title: "Internet Speed Test",
  //   desc: "Test your internet connection speed and performance",
  //   category: [categoryList.WEB_TOOLS],
  // },
  // {
  //   key: "short-link",
  //   icon: "🔗",
  //   title: "Short Link Generator",
  //   desc: "Create short, shareable links from long URLs",
  //   category: [categoryList.WEB_TOOLS],
  // },
  // {
  //   key: "jwt-token",
  //   icon: "🔐",
  //   title: "JWT Token Tool",
  //   desc: "Create and verify JSON Web Tokens securely",
  //   category: [categoryList.WEB_TOOLS],
  // },
  // {
  //   key: "bhagavad-gita",
  //   icon: "🕉️",
  //   title: "Bhagavad Gita",
  //   desc: "Read and explore the sacred teachings of Bhagavad Gita",
  //   category: [categoryList.SPIRITUAL],
  // },
  // {
  //   key: "sudoku",
  //   icon: "🔢",
  //   title: "Sudoku Game",
  //   desc: "Play classic Sudoku puzzles with different difficulty levels",
  //   category: [categoryList.GAMES],
  // },
  // {
  //   key: "roller",
  //   icon: "🎲",
  //   title: "Random Roller",
  //   desc: "Select random users or items from your list",
  //   category: [categoryList.GAMES],
  // },
];

export const HeaderLinks = [
  {
    title: "All",
    link: "?",
  },
  {
    title: "Writing",
    link: "?category=writing",
  },
  {
    title: "Calculator",
    link: "?category=calculator",
  },
  {
    title: "Productivity",
    link: "?category=productivity",
  },
  {
    title: "Web Tools",
    link: "?category=web-tools",
  },
  {
    title: "Spiritual",
    link: "?category=spiritual",
  },
  {
    title: "Health",
    link: "?category=health",
  },
  {
    title: "Games",
    link: "?category=games",
  },
];

export const HeroTitle = "All-in-One Utility Hub";

export const HeroText =
  "Everything you need for work, productivity, and daily tasks in one place. From AI writing tools and calculators to health tests and spiritual guidance - access 20+ essential utilities with just a few clicks.";
