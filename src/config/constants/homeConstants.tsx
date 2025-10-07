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
  // ✍️ WRITING TOOLS
  {
    key: "ai-writer",
    icon: "🤖",
    title: "AI to Human Writer",
    desc: "Transform AI-generated text into natural, human-like content",
    category: [categoryList.WRITING],
  },
  {
    key: "string-converter",
    icon: "🔠",
    title: "String Case Converter",
    desc: "Transform your text into different cases like camelCase, snake_case, etc.",
    category: [categoryList.WRITING],
  },
  {
    key: "duplicate-sentence",
    icon: "🧩",
    title: "Duplicate Sentence Generator",
    desc: "Create multiple variations of your sentences instantly",
    category: [categoryList.WRITING, categoryList.PRODUCTIVITY],
  },

  // 📆 DATE & TIME CALCULATORS
  {
    key: "age-calculator",
    icon: "🎂",
    title: "Age Calculator",
    desc: "Calculate your exact age in years, months, and days instantly",
    category: [categoryList.CALCULATOR, categoryList.PRODUCTIVITY],
  },
  {
    key: "business-days",
    icon: "🏢",
    title: "Business Days Calculator",
    desc: "Find working days between two dates, excluding weekends and holidays",
    category: [categoryList.CALCULATOR, categoryList.PRODUCTIVITY],
  },
  {
    key: "time-calculator",
    icon: "🧮",
    title: "Time Calculator",
    desc: "Perform precise time addition, subtraction, and duration calculations",
    category: [categoryList.CALCULATOR],
  },
  {
    key: "timezone-converter",
    icon: "🌍",
    title: "Timezone Converter",
    desc: "Convert time across different countries and time zones easily",
    category: [categoryList.CALCULATOR, categoryList.WEB_TOOLS],
  },
  {
    key: "utc-converter",
    icon: "🛰️",
    title: "UTC Converter",
    desc: "Convert between local time and UTC for global coordination",
    category: [categoryList.CALCULATOR, categoryList.WEB_TOOLS],
  },
  {
    key: "clock-time",
    icon: "⌚",
    title: "Clock & Time",
    desc: "World clock with multiple time zones and real-time updates",
    category: [categoryList.PRODUCTIVITY, categoryList.CALCULATOR],
  },

  // 🕒 COUNTDOWN & PRODUCTIVITY
  {
    key: "custom-countdown",
    icon: "📆",
    title: "Custom Countdown",
    desc: "Create personalized countdowns for birthdays or events",
    category: [categoryList.CALCULATOR, categoryList.PRODUCTIVITY],
  },
  {
    key: "birthday-countdown",
    icon: "🎉",
    title: "Birthday Countdown",
    desc: "Track time left for your next birthday with fun visuals",
    category: [categoryList.CALCULATOR, categoryList.PRODUCTIVITY],
  },
  {
    key: "event-duration",
    icon: "📏",
    title: "Event Duration",
    desc: "Calculate duration and key milestones for any event or task",
    category: [categoryList.CALCULATOR, categoryList.PRODUCTIVITY],
  },
  {
    key: "time-percentage",
    icon: "📊",
    title: "Time Percentage Calculator",
    desc: "Find how much percentage of time has elapsed between dates",
    category: [categoryList.CALCULATOR],
  },
  {
    key: "pomodoro-timer",
    icon: "🍅",
    title: "Pomodoro Timer",
    desc: "Boost productivity with focused work/break sessions",
    category: [categoryList.CALCULATOR, categoryList.PRODUCTIVITY],
  },

  // 🌞 NATURAL CALCULATORS
  {
    key: "sunrise-sunset",
    icon: "🌅",
    title: "Sunrise & Sunset Time",
    desc: "Get accurate sunrise and sunset times for your city",
    category: [categoryList.CALCULATOR, categoryList.WEB_TOOLS],
  },
  {
    key: "moon-phase",
    icon: "🌕",
    title: "Moon Phase Calculator",
    desc: "View current moon phase, illumination, and upcoming cycles",
    category: [categoryList.CALCULATOR, categoryList.SPIRITUAL],
  },
  {
    key: "historical-date",
    icon: "📜",
    title: "Historical Date Finder",
    desc: "Explore dates with historical and astrological context",
    category: [categoryList.CALCULATOR, categoryList.SPIRITUAL],
  },

  // 💘 RELATIONSHIP & FUN
  {
    key: "crush-calculator",
    icon: "💞",
    title: "Crush Calculator",
    desc: "Check your love compatibility with fun algorithms",
    category: [categoryList.CALCULATOR, categoryList.GAMES],
  },
  {
    key: "future-relationship",
    icon: "🔮",
    title: "Future Relationship Predictor",
    desc: "Predict your future relationship compatibility based on names and traits",
    category: [categoryList.CALCULATOR, categoryList.GAMES],
  },

  // 🧠 HEALTH & WELLNESS
  {
    key: "pregnancy-calculator",
    icon: "🤰",
    title: "Pregnancy Calculator",
    desc: "Estimate due date and track pregnancy milestones",
    category: [categoryList.CALCULATOR, categoryList.HEALTH],
  },
  {
    key: "symptom-checker",
    icon: "🩺",
    title: "Symptom Checker",
    desc: "Analyze your symptoms and get possible condition suggestions",
    category: [categoryList.HEALTH, categoryList.GAMES],
  },
  {
    key: "eye-sight-test",
    icon: "👀",
    title: "Eye Sight Test",
    desc: "Test your vision and detect eye issues online",
    category: [categoryList.HEALTH],
  },
  {
    key: "color-blindness",
    icon: "🎨",
    title: "Color Blindness Test",
    desc: "Assess your color vision accuracy and deficiencies",
    category: [categoryList.CALCULATOR, categoryList.HEALTH],
  },
  {
    key: "stress-assessment",
    icon: "💭",
    title: "Stress Assessment",
    desc: "Evaluate stress levels and get personalized coping advice",
    category: [categoryList.HEALTH],
  },
  {
    key: "sleep-quality",
    icon: "🌙",
    title: "Sleep Quality Assessment",
    desc: "Understand your sleep health and improve rest quality",
    category: [categoryList.HEALTH],
  },
  {
    key: "attention-span",
    icon: "🧠",
    title: "Attention Span Test",
    desc: "Measure and enhance focus with interactive tasks",
    category: [categoryList.HEALTH, categoryList.GAMES],
  },
  {
    key: "risk-assessment",
    icon: "⚠️",
    title: "Risk Assessment Tool",
    desc: "Identify potential health and lifestyle risks easily",
    category: [categoryList.HEALTH],
  },
  {
    key: "wellness-tracker",
    icon: "🌟",
    title: "Wellness Tracker",
    desc: "Track daily wellness and get lifestyle improvement insights",
    category: [categoryList.HEALTH],
  },
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
