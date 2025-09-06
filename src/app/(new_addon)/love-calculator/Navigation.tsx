import React from 'react';
import Link from 'next/link';
import { LOVE_CATEGORIES } from './constants';

interface NavigationProps {
  currentPath?: string;
}

function Navigation({ currentPath }: NavigationProps) {
  const allCalculators = LOVE_CATEGORIES.flatMap(category => 
    category.calculators.map(calc => ({
      name: calc.title,
      path: calc.path
    }))
  );

  const otherCalculators = allCalculators.filter(calc => calc.path !== currentPath);

  return (
    <div style={{
      position: 'absolute',
      top: '70px',
      right: '20px',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '10px',
      padding: '15px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      zIndex: 10,
      maxWidth: '250px'
    }}>
      <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
        Other Love Calculators ({otherCalculators.length})
      </div>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {otherCalculators.slice(0, 8).map((calc, index) => (
          <Link key={index} href={calc.path} style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '8px 12px',
              margin: '2px 0',
              borderRadius: '6px',
              color: '#666',
              fontSize: '0.85rem',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 107, 157, 0.1)';
              e.currentTarget.style.color = '#333';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#666';
            }}>
              {calc.name}
            </div>
          </Link>
        ))}
        {otherCalculators.length > 8 && (
          <Link href="/love-calculator" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '8px 12px',
              margin: '5px 0',
              borderRadius: '6px',
              color: '#ff6b9d',
              fontSize: '0.85rem',
              fontWeight: '600',
              textAlign: 'center',
              border: '1px solid rgba(255, 107, 157, 0.3)'
            }}>
              View All Calculators
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navigation;