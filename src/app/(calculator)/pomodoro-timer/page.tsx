// app/pomodoro-timer/page.tsx
import PomodoroTimer from '@/components/calculator/PomodoroTimer'
import type { Metadata } from 'next'

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Pomodoro Timer | Focus & Productivity Tool',
  description:
    'Boost your productivity with our Pomodoro Timer. Manage work sessions and breaks effectively using the proven Pomodoro technique.',
  keywords: [
    'pomodoro timer',
    'focus timer',
    'productivity tool',
    'work session timer',
    'time management',
    'study timer',
  ],
  openGraph: {
    title: 'Pomodoro Timer | Focus & Productivity Tool',
    description:
      'Use our Pomodoro Timer to enhance focus, manage your work and break sessions, and improve productivity with the Pomodoro technique.',
    url: 'https://kaluyaan.com/pomodoro-timer',
    siteName: 'Kaluyaan',
    type: 'website',
  },
}

// ✅ Server Component (default)
export default function Page() {
  return <PomodoroTimer />
}
