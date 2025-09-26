import Home from "@/components/Home/Home";
import Head from "next/head";

const tools = [
  {
    title: "AI to Human Text Converter",
    icon: "🤖",
    desc: "Transform AI-generated text into natural, human-like content.",
  },
  {
    title: "Duplicate Sentence Generator",
    icon: "📝",
    desc: "Generate similar sentences with precision, tone, and rich dictionary options.",
  },
  {
    title: "String Case Converter",
    icon: "🔤",
    desc: "Switch your text between different cases for coding, writing, or formatting.",
  },
  {
    title: "Clock Time",
    icon: "⏰",
    desc: "View the current time with customizable themes.",
  },
  {
    title: "Eye Sight Test",
    icon: "👁️",
    desc: "Test your visual acuity and color vision online.",
  },
  {
    title: "Age Calculator",
    icon: "🎂",
    desc: "Calculate your exact age in years, months, days, and more.",
  },
  {
    title: "Birthday Countdown",
    icon: "🎉",
    desc: "Count down the days until your next birthday.",
  },
  {
    title: "Business Days Calculator",
    icon: "📅",
    desc: "Calculate business days between two dates.",
  },
  {
    title: "Color Blindness Test",
    icon: "🌈",
    desc: "Check for color vision deficiency.",
  },
  {
    title: "Custom Countdown",
    icon: "⏳",
    desc: "Create a countdown for any event.",
  },
  {
    title: "Event Duration Calculator",
    icon: "🕒",
    desc: "Calculate the duration between two events.",
  },
  {
    title: "Historical Date Calculator",
    icon: "📜",
    desc: "Find the difference between historical dates.",
  },
  {
    title: "Moon Phase Calculator",
    icon: "🌙",
    desc: "Check the moon phase for any date.",
  },
  {
    title: "Pomodoro Timer",
    icon: "🍅",
    desc: "Boost productivity with the Pomodoro technique.",
  },
  {
    title: "Pregnancy Calculator",
    icon: "🤰",
    desc: "Estimate due dates and pregnancy milestones.",
  },
  {
    title: "Sunrise & Sunset Calculator",
    icon: "🌅",
    desc: "Find sunrise and sunset times for any location.",
  },
  {
    title: "Time Calculator",
    icon: "⏱️",
    desc: "Add, subtract, and calculate time differences.",
  },
  {
    title: "Time Percentage Calculator",
    icon: "📈",
    desc: "Calculate the percentage of time elapsed.",
  },
  {
    title: "Timezone Converter",
    icon: "🌍",
    desc: "Convert time between different time zones.",
  },
  {
    title: "UTC Converter",
    icon: "🕰️",
    desc: "Convert local time to and from UTC.",
  },
  {
    title: "Future Relationship Calculator",
    icon: "💑",
    desc: "Predict your future relationship compatibility.",
  },
  {
    title: "Crush Calculator",
    icon: "💘",
    desc: "Fun tool to check your crush compatibility.",
  },
  {
    title: "Attention Span Test",
    icon: "🧠",
    desc: "Test your attention span online.",
  },
  {
    title: "Risk Assessment",
    icon: "⚠️",
    desc: "Assess your risk factors for health.",
  },
  {
    title: "Sleep Quality Test",
    icon: "😴",
    desc: "Evaluate your sleep quality.",
  },
  {
    title: "Stress Assessment",
    icon: "😰",
    desc: "Measure your stress levels.",
  },
  {
    title: "Symptom Checker",
    icon: "🩺",
    desc: "Check symptoms and get health advice.",
  },
  {
    title: "Wellness Tracker",
    icon: "📊",
    desc: "Track your wellness and health habits.",
  },
];

export default function Page() {
  return (
    <>
      <Head>
        <title>
          Kaluyaan Tools - Calculators, Converters, Health Tests, PDF & More
        </title>
        <meta
          name="description"
          content="Kaluyaan offers a comprehensive suite of free online tools: calculators, converters, health tests, PDF utilities, productivity timers, and more. Instantly access age calculators, countdowns, AI text converters, wellness trackers, and fun compatibility tools—all in one place."
        />
        {tools.map((tool) => (
          <meta
            key={tool.title}
            name="keywords"
            content={`${tool.title}, ${tool.desc}`}
          />
        ))}
      </Head>
      <Home />
    </>
  );
}
