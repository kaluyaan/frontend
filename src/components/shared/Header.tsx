import React, { useState } from "react";

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#333",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  glassmorphism: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  header: {
    position: "sticky" as const,
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
  },
  nav: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    position: "relative" as const,
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  navLinks: {
    display: "flex",
    gap: "2rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLinksDesktop: {
    display: "flex",
    gap: "2rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
    "@media (maxWidth: 768px)": {
      display: "none",
    },
  },
  navLinksMobile: {
    position: "absolute" as const,
    top: "100%",
    left: 0,
    right: 0,
    background: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderTop: "none",
    borderRadius: "0 0 15px 15px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "0",
    listStyle: "none",
    margin: 0,
    padding: "1rem 0",
    zIndex: 99,
  },
  navLink: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
    transition: "all 0.3s ease",
    padding: "0.5rem 0",
    borderRadius: "5px",
  },
  navLinkMobile: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
    transition: "all 0.3s ease",
    padding: "1rem 2rem",
    borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
    display: "block",
  },
  navIcons: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "50%",
    transition: "all 0.3s ease",
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
  },
  menuToggle: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    fontSize: "1.5rem",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    color: "#333",
  },
  profileIcon: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "50%",
    transition: "all 0.3s ease",
    fontSize: "1.1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
  },
  // Demo content styles
  mainContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 20px",
  },
  hero: {
    borderRadius: "20px",
    padding: "3rem",
    textAlign: "center" as const,
    marginBottom: "3rem",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  heroTitle: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontWeight: "bold",
  },
  heroText: {
    fontSize: "1.1rem",
    color: "#666",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
};

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
      
      <header style={{ ...styles.glassmorphism, ...styles.header }}>
        <nav style={styles.nav} className="nav">
          <div style={styles.logo} className="logo">KaluYaan</div>

          {/* Desktop Navigation */}
          <ul style={styles.navLinksDesktop} className="nav-links-desktop">
            <li>
              <a href="#merge" style={styles.navLink} className="nav-link">
                All
              </a>
            </li>
            <li>
              <a href="#merge" style={styles.navLink} className="nav-link">
                Writing
              </a>
            </li>
            <li>
              <a href="#split" style={styles.navLink} className="nav-link">
                Calculator
              </a>
            </li>
            <li>
              <a href="#compress" style={styles.navLink} className="nav-link">
                Productivity
              </a>
            </li>
            <li>
              <a href="#convert" style={styles.navLink} className="nav-link">
                Web Tools
              </a>
            </li>
            <li>
              <a href="#tools" style={styles.navLink} className="nav-link">
                Spiritual
              </a>
            </li>
            <li>
              <a href="#tools" style={styles.navLink} className="nav-link">
                Health
              </a>
            </li>
            <li>
              <a href="#tools" style={styles.navLink} className="nav-link">
                Games
              </a>
            </li>
          </ul>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <ul style={styles.navLinksMobile}>
              <li>
                <a 
                  href="#merge" 
                  style={styles.navLinkMobile} 
                  className="nav-link-mobile"
                  onClick={closeMobileMenu}
                >
                  All
                </a>
              </li>
              <li>
                <a 
                  href="#merge" 
                  style={styles.navLinkMobile} 
                  className="nav-link-mobile"
                  onClick={closeMobileMenu}
                >
                  Writing
                </a>
              </li>
              <li>
                <a 
                  href="#split" 
                  style={styles.navLinkMobile} 
                  className="nav-link-mobile"
                  onClick={closeMobileMenu}
                >
                  Calculator
                </a>
              </li>
              <li>
                <a 
                  href="#compress" 
                  style={styles.navLinkMobile} 
                  className="nav-link-mobile"
                  onClick={closeMobileMenu}
                >
                  Productivity
                </a>
              </li>
              <li>
                <a 
                  href="#convert" 
                  style={styles.navLinkMobile} 
                  className="nav-link-mobile"
                  onClick={closeMobileMenu}
                >
                  Web Tools
                </a>
              </li>
              <li>
                <a 
                  href="#tools" 
                  style={styles.navLinkMobile} 
                  className="nav-link-mobile"
                  onClick={closeMobileMenu}
                >
                  Spiritual
                </a>
              </li>
              <li>
                <a 
                  href="#tools" 
                  style={styles.navLinkMobile} 
                  className="nav-link-mobile"
                  onClick={closeMobileMenu}
                >
                  Health
                </a>
              </li>
              <li>
                <a 
                  href="#tools" 
                  style={styles.navLinkMobile} 
                  className="nav-link-mobile"
                  onClick={closeMobileMenu}
                >
                  Games
                </a>
              </li>
            </ul>
          )}

          <div style={styles.navIcons} className="nav-icons">
            {/* Profile Icon */}
            <button
              style={styles.profileIcon}
              className="profile-icon"
              onClick={toggleProfile}
              title="Profile"
            >
              👤
            </button>

            {/* Language Toggle */}
            <button
              style={styles.iconBtn}
              className="icon-btn"
              onClick={toggleLanguage}
              title="Language"
            >
              🌐
            </button>

            {/* Mobile Menu Toggle */}
            <button
              style={styles.menuToggle}
              className="menu-toggle"
              onClick={toggleMobileMenu}
              title="Menu"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>
      </header>

      {/* Demo Content */}
      {/* <div style={styles.container}>
        <main style={styles.mainContent} className="main-content">
          <section style={styles.hero} className="hero">
            <h1 style={styles.heroTitle} className="hero-title">
              Welcome to KaluYaan
            </h1>
            <p style={styles.heroText} className="hero-text">
              Your comprehensive toolkit for productivity, creativity, and wellness. 
              Discover powerful tools designed to enhance your daily workflow and personal growth.
            </p>
          </section>
        </main>
      </div> */}
    </>
  );
}

export default Header;