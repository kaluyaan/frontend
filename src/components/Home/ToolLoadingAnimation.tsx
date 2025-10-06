import React, { useState, useEffect } from 'react';

const ToolLoadingAnimation = () => {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 8;
      });
    }, 150);

    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      padding: '3rem 1.5rem',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      marginBottom: '13px',
      marginTop: '13px',
      textAlign: 'center'
    }}>
      {/* Animated Tool Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
        marginBottom: '2.5rem'
      }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '15px',
              padding: '1.5rem',
              boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
              animation: 'pulse 1.5s ease-in-out infinite',
              animationDelay: `${i * 0.15}s`,
              minHeight: '140px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem'
            }}
          >
            {/* Icon placeholder */}
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
              animation: 'shimmer 2s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`
            }}></div>
            
            {/* Title placeholder */}
            <div style={{
              width: '70%',
              height: '20px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))',
              animation: 'shimmer 2s ease-in-out infinite',
              animationDelay: `${i * 0.3}s`
            }}></div>
            
            {/* Description placeholder */}
            <div style={{
              width: '90%',
              height: '12px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
              animation: 'shimmer 2s ease-in-out infinite',
              animationDelay: `${i * 0.4}s`
            }}></div>
          </div>
        ))}
      </div>

      {/* Loading Text */}
      <h3 style={{
        fontSize: '1.5rem',
        marginBottom: '1.5rem',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontWeight: 'bold'
      }}>
        Loading Tools{dots}
      </h3>

      {/* Progress Bar */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto 1rem',
        height: '8px',
        background: 'rgba(102, 126, 234, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid rgba(102, 126, 234, 0.2)'
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: '10px',
          transition: 'width 0.3s ease-out',
          width: `${progress}%`
        }}></div>
      </div>

      {/* Progress Percentage */}
      <p style={{
        fontSize: '0.9rem',
        color: '#666',
        marginBottom: '1.5rem'
      }}>
        {progress}% Complete
      </p>

      {/* Spinner */}
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid rgba(102, 126, 234, 0.2)',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes shimmer {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.5;
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 770px) {
          .loading-title {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 430px) {
          .loading-title {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ToolLoadingAnimation;