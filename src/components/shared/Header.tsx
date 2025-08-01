import React, { useState } from "react";
import styles from "./Header.module.css"; // Assuming you have a CSS module for styles


const toggleLanguage = (): void => {
  alert("Language menu would open here");
};

const toggleProfile = (): void => {
  alert("Profile menu would open here");
};

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .nav-links-desktop {
              display: none !important;
            }
            .menu-toggle {
              display: flex !important;
            }
            .nav-icons {
              gap: 0.5rem;
            }
            .hero-title {
              font-size: 2rem !important;
            }
            .hero-text {
              font-size: 1rem !important;
            }
            .main-content {
              padding: 1rem 15px !important;
            }
            .hero {
              padding: 2rem 1.5rem !important;
            }
          }
          
          @media (max-width: 480px) {
            .logo {
              font-size: 1.3rem !important;
            }
            .nav {
              padding: 0 15px !important;
            }
            .hero-title {
              font-size: 1.8rem !important;
            }
          }
          
          .nav-link:hover {
            color: #667eea;
            transform: translateY(-1px);
          }
          
          .nav-link-mobile:hover {
            background-color: rgba(102, 126, 234, 0.1);
            color: #667eea;
          }
          
          .nav-link-mobile:last-child {
            border-bottom: none;
          }
          
          .icon-btn:hover {
            background-color: rgba(102, 126, 234, 0.1);
            transform: scale(1.05);
          }
          
          .profile-icon:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          }
          
          .menu-toggle:hover {
            background-color: rgba(102, 126, 234, 0.1);
          }
        `}
      </style>
      
      <header className={`${styles.glassmorphism} ${styles.header}`}>
        <nav className={styles.nav}>
          <div className={styles.logo}>KaluYaan</div>

          {/* Desktop Navigation */}
          <ul className={styles.navLinksDesktop}>
            <li>
              <a href="#merge" className={styles.navLink}>
                All
              </a>
            </li>
            <li>
              <a href="#merge" className={styles.navLink}>
                Writing
              </a>
            </li>
            <li>
              <a href="#split" className={styles.navLink}>
                Calculator
              </a>
            </li>
            <li>
              <a href="#compress" className={styles.navLink}>
                Productivity
              </a>
            </li>
            <li>
              <a href="#convert" className={styles.navLink}>
                Web Tools
              </a>
            </li>
            <li>
              <a href="#tools" className={styles.navLink}>
                Spiritual
              </a>
            </li>
            <li>
              <a href="#tools" className={styles.navLink}>
                Health
              </a>
            </li>
            <li>
              <a href="#tools" className={styles.navLink}>
                Games
              </a>
            </li>
          </ul>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <ul className={styles.navLinksMobile}>
              <li>
                <a 
                  href="#merge" 
                  className={`nav-link-mobile ${styles.navLinkMobile}`}
                  onClick={closeMobileMenu}
                >
                  All
                </a>
              </li>
              <li>
                <a 
                  href="#merge" 
                  className={`nav-link-mobile ${styles.navLinkMobile}`}
                  onClick={closeMobileMenu}
                >
                  Writing
                </a>
              </li>
              <li>
                <a 
                  href="#split" 
                  className={`nav-link-mobile ${styles.navLinkMobile}`}
                  onClick={closeMobileMenu}
                >
                  Calculator
                </a>
              </li>
              <li>
                <a 
                  href="#compress" 
                  className={`nav-link-mobile ${styles.navLinkMobile}`}
                  onClick={closeMobileMenu}
                >
                  Productivity
                </a>
              </li>
              <li>
                <a 
                  href="#convert" 
                  className={`nav-link-mobile ${styles.navLinkMobile}`}
                  onClick={closeMobileMenu}
                >
                  Web Tools
                </a>
              </li>
              <li>
                <a 
                  href="#tools" 
                  className={`nav-link-mobile ${styles.navLinkMobile}`}
                  onClick={closeMobileMenu}
                >
                  Spiritual
                </a>
              </li>
              <li>
                <a 
                  href="#tools" 
                  className={`nav-link-mobile ${styles.navLinkMobile}`}
                  onClick={closeMobileMenu}
                >
                  Health
                </a>
              </li>
              <li>
                <a 
                  href="#tools" 
                  className={`nav-link-mobile ${styles.navLinkMobile}`}
                  onClick={closeMobileMenu}
                >
                  Games
                </a>
              </li>
            </ul>
          )}

          <div className={`nav-icons ${styles.navIcons}`}>
            {/* Profile Icon */}
            <button
              className={`profile-icon ${styles.profileIcon}`}
              onClick={toggleProfile}
              title="Profile"
            >
              👤
            </button>

            {/* Language Toggle */}
            <button
              className={`icon-btn ${styles.iconBtn}`}
              onClick={toggleLanguage}
              title="Language"
            >
              🌐
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className={`menu-toggle ${styles.menuToggle}`}
              onClick={toggleMobileMenu}
              title="Menu"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;