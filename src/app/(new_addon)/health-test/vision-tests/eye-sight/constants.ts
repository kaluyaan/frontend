
import { Languages, ColorTest } from './types';

export const LANGUAGES: Languages = {
  english: {
    name: 'English',
    letters: ['E', 'F', 'P', 'T', 'O', 'Z', 'L', 'P', 'E', 'D'],
    chart: [
      { size: 60, letters: ['E'] },
      { size: 50, letters: ['F', 'P'] },
      { size: 40, letters: ['T', 'O', 'Z'] },
      { size: 30, letters: ['L', 'P', 'E', 'D'] },
      { size: 25, letters: ['F', 'E', 'L', 'O', 'P'] },
      { size: 20, letters: ['E', 'D', 'F', 'C', 'Z', 'P'] },
      { size: 16, letters: ['F', 'E', 'L', 'O', 'P', 'Z', 'D'] },
      { size: 12, letters: ['D', 'E', 'F', 'P', 'O', 'T', 'E', 'C'] }
    ]
  },
  spanish: {
    name: 'Español',
    letters: ['E', 'F', 'P', 'T', 'O', 'Z', 'L', 'P', 'E', 'D'],
    chart: [
      { size: 60, letters: ['E'] },
      { size: 50, letters: ['F', 'P'] },
      { size: 40, letters: ['T', 'O', 'Z'] },
      { size: 30, letters: ['L', 'P', 'E', 'D'] },
      { size: 25, letters: ['F', 'E', 'L', 'O', 'P'] },
      { size: 20, letters: ['E', 'D', 'F', 'C', 'Z', 'P'] },
      { size: 16, letters: ['F', 'E', 'L', 'O', 'P', 'Z', 'D'] },
      { size: 12, letters: ['D', 'E', 'F', 'P', 'O', 'T', 'E', 'C'] }
    ]
  },
  arabic: {
    name: 'العربية',
    letters: ['ع', 'ف', 'ط', 'ت', 'و', 'ز', 'ل', 'ب', 'ه', 'د'],
    chart: [
      { size: 60, letters: ['ع'] },
      { size: 50, letters: ['ف', 'ط'] },
      { size: 40, letters: ['ت', 'و', 'ز'] },
      { size: 30, letters: ['ل', 'ب', 'ه', 'د'] },
      { size: 25, letters: ['ف', 'ع', 'ل', 'و', 'ط'] },
      { size: 20, letters: ['ه', 'د', 'ف', 'ج', 'ز', 'ط'] },
      { size: 16, letters: ['ف', 'ع', 'ل', 'و', 'ط', 'ز', 'د'] },
      { size: 12, letters: ['د', 'ع', 'ف', 'ط', 'و', 'ت', 'ه', 'ج'] }
    ]
  },
  chinese: {
    name: '中文',
    letters: ['大', '小', '人', '口', '山', '水', '火', '木', '土', '金'],
    chart: [
      { size: 60, letters: ['大'] },
      { size: 50, letters: ['小', '人'] },
      { size: 40, letters: ['口', '山', '水'] },
      { size: 30, letters: ['火', '木', '土', '金'] },
      { size: 25, letters: ['大', '小', '人', '口', '山'] },
      { size: 20, letters: ['水', '火', '木', '土', '金', '日'] },
      { size: 16, letters: ['月', '星', '光', '明', '亮', '暗', '黑'] },
      { size: 12, letters: ['白', '红', '绿', '蓝', '黄', '紫', '橙', '粉'] }
    ]
  },
  hindi: {
    name: 'हिंदी',
    letters: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ'],
    chart: [
      { size: 60, letters: ['अ'] },
      { size: 50, letters: ['आ', 'इ'] },
      { size: 40, letters: ['ई', 'उ', 'ऊ'] },
      { size: 30, letters: ['ए', 'ऐ', 'ओ', 'औ'] },
      { size: 25, letters: ['क', 'ख', 'ग', 'घ', 'ङ'] },
      { size: 20, letters: ['च', 'छ', 'ज', 'झ', 'ञ', 'ट'] },
      { size: 16, letters: ['ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द'] },
      { size: 12, letters: ['ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य'] }
    ]
  }
};

export const COLOR_TESTS: ColorTest[] = [
  {
    id: 1,
    colors: ['#FF0000', '#00FF00', '#0000FF'],
    correctAnswer: '#FF0000',
    question: 'Select the RED color',
    hiddenNumber: '8'
  },
  {
    id: 2,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
    correctAnswer: '#FF6B6B',
    question: 'Select the color that appears different',
    hiddenNumber: '3'
  },
  {
    id: 3,
    colors: ['#2ECC71', '#27AE60', '#E74C3C'],
    correctAnswer: '#E74C3C',
    question: 'Select the RED-GREEN different color',
    hiddenNumber: '5'
  },
  {
    id: 4,
    colors: ['#9B59B6', '#8E44AD', '#3498DB'],
    correctAnswer: '#3498DB',
    question: 'Select the BLUE color',
    hiddenNumber: '2'
  }
];

export const TEST_MESSAGES = {
  DISTANCE_INFO: '📏 Please sit 6 feet (2 meters) away from your screen for accurate results',
  VISUAL_INSTRUCTIONS: {
    TITLE: 'Visual Acuity Test Instructions:',
    TEXT: '1. Cover one eye with your hand\n2. Read the letters from top to bottom\n3. Click appropriate button for each line\n4. Repeat with the other eye'
  },
  COLOR_INSTRUCTIONS: {
    TITLE: 'Color Vision Test Instructions:',
    TEXT: '1. Look at each color pattern\n2. Try to identify the hidden number\n3. Click on the color that matches the question\n4. Complete all tests for accurate results'
  },
  DISCLAIMER: {
    TITLE: '⚠️ Important Disclaimer',
    TEXT: 'This is a basic vision screening tool and should not replace professional eye examinations. For accurate diagnosis and treatment, please consult a qualified eye care professional.'
  },
  BUTTONS: {
    CAN_READ: 'Can Read Clearly',
    CANT_READ: "Can't Read Smaller",
    READ_ALL: 'Read All Lines',
    RESET: '🔄 Reset Test',
    PRINT: '🖨️ Print Results'
  },
  RESULTS: {
    EXCELLENT: '✅ Excellent vision detected',
    GOOD: '✅ Good vision detected',
    MODERATE: '⚠️ Moderate vision - consider eye exam',
    POOR: '❌ Poor vision - please consult an eye doctor'
  }
};

export const VISION_THRESHOLDS = {
  EXCELLENT: 95,
  GOOD: 80,
  MODERATE: 60
};