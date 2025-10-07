"use client";

import React from 'react';
import styles from './page.module.css';

interface ToolClickLoaderProps {
  isLoading: boolean;
  toolName?: string;
}


/**
 * ToolClickLoader - Displays loading overlay when navigating to a tool
 */
const ToolClickLoader: React.FC<ToolClickLoaderProps> = ({ 
  isLoading, 
  toolName = "Tool" 
}) => {
  const [dots, setDots] = React.useState('');
  React.useEffect(() => {
    if (isLoading) {
      const dotsInterval = setInterval(() => {
        setDots(prev => {
          if (prev === '...') return '';
          return prev + '.';
        });
      }, 400);

      return () => clearInterval(dotsInterval);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* Animated Icon */}
        <div className={styles.iconContainer}>
          <div className={styles.spinnerRing}></div>
          <div className={styles.pulseCircle}></div>
          <div className={styles.checkmark}>✓</div>
        </div>

        {/* Loading Text */}
        <h2 className={styles.title}>
          Opening {toolName}{dots}
        </h2>

        <p className={styles.subtitle}>
          Please wait while we load your tool
        </p>

        {/* Progress dots */}
        <div className={styles.progressDots}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    </div>
  );
};

export default ToolClickLoader;