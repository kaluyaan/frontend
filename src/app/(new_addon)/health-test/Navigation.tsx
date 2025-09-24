import React from 'react';
import Link from 'next/link';
import { HEALTH_CATEGORIES } from './constants';

interface NavigationProps {
  currentPath: string;
}

function Navigation({ currentPath }: NavigationProps) {
  const allTests = HEALTH_CATEGORIES.flatMap(category => 
    category.tests.map(test => ({
      name: test.title,
      path: test.path
    }))
  );

  const otherTests = allTests.filter(test => test.path !== currentPath);

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
        Other Health Tests ({otherTests.length})
      </div>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {otherTests.slice(0, 8).map((test, index) => (
          <Link key={index} href={test.path} style={{ textDecoration: 'none' }}>
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
              e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
              e.currentTarget.style.color = '#333';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#666';
            }}>
              {test.name}
            </div>
          </Link>
        ))}
        {otherTests.length > 8 && (
          <Link href="/health-test" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '8px 12px',
              margin: '5px 0',
              borderRadius: '6px',
              color: '#667eea',
              fontSize: '0.85rem',
              fontWeight: '600',
              textAlign: 'center',
              border: '1px solid rgba(102, 126, 234, 0.3)'
            }}>
              View All Tests
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navigation;