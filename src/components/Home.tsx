"use client";
import React from "react";
import FunSidebarDesigns from "./FunZone";


const Home: React.FC = () => {
  const seoKeywords = [
    "Online Tools",
    "Free Utilities",
    "AI Writing",
    "Calculator Tools",
    "Productivity Apps",
    "Web Utilities",
    "Health Tests",
    "Text Tools",
    "Time Calculator",
    "Speed Test",
    "Plagiarism Checker",
  ];

  const selectTool = (tool: string): void => {
    // setSelectedTool(tool);
    console.log(`Selected tool: ${tool}`);
  };

  const toggleLanguage = (): void => {
    alert("Language menu would open here");
  };

  const toggleMenu = (): void => {
    alert("Main menu would open here");
  };

  // Inline styles for components
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
    navLink: {
      textDecoration: "none",
      color: "#333",
      fontWeight: "500",
      transition: "color 0.3s ease",
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
      transition: "background-color 0.3s ease",
      fontSize: "1.2rem",
    },
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
    toolsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "1.5rem",
      marginBottom: "3rem",
    },
    toolCard: {
      borderRadius: "15px",
      padding: "2rem",
      textAlign: "center" as const,
      transition: "all 0.3s ease",
      cursor: "pointer",
      boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    toolIcon: {
      fontSize: "3rem",
      marginBottom: "1rem",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    toolTitle: {
      fontSize: "1.1rem",
      marginBottom: "0.5rem",
      color: "#333",
      fontWeight: "600",
    },
    toolDesc: {
      fontSize: "0.9rem",
      color: "#666",
      lineHeight: "1.4",
    },
    contentLayout: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "2rem",
      marginBottom: "1rem",
    },
    mainArea: {
      borderRadius: "15px",
      padding: "3rem",
      textAlign: "center" as const,
      minHeight: "300px",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    },
    sidebar: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1.5rem",
    },
    sidebarCard: {
      borderRadius: "15px",
      padding: "1.5rem",
      boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
    },
    premiumCard: {
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      color: "white",
    },
    button: {
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      color: "white",
      border: "none",
      padding: "1rem 2rem",
      borderRadius: "8px",
      fontSize: "1rem",
      marginTop: "1rem",
      cursor: "pointer",
      transition: "transform 0.3s ease",
    },
    extensionBtn: {
      display: "block",
      width: "100%",
      padding: "0.8rem",
      marginBottom: "0.5rem",
      background: "rgba(102, 126, 234, 0.1)",
      border: "1px solid rgba(102, 126, 234, 0.3)",
      borderRadius: "8px",
      textDecoration: "none",
      color: "#667eea",
      textAlign: "center" as const,
      transition: "all 0.3s ease",
    },

    footer: {
      borderRadius: "15px",
      padding: "2rem",
      marginTop: "3rem",
      boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
    },
    footerGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "2rem",
      marginBottom: "2rem",
    },
    footerLink: {
      display: "block",
      color: "#666",
      textDecoration: "none",
      marginBottom: "0.5rem",
      transition: "color 0.3s ease",
    },
    footerBottom: {
      textAlign: "center" as const,
      paddingTop: "2rem",
      borderTop: "1px solid #eee",
      color: "#666",
    },
    aboutText: {
      color: "#666",
      lineHeight: "1.7",
      fontSize: "1rem",
      marginBottom: "1.5rem",
    },
    keywordList: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem",
      marginTop: "1.5rem",
    },
    keyword: {
      background: "rgba(255, 255, 255, 0.2)",
      padding: "0.4rem 0.8rem",
      borderRadius: "20px",
      color: "#666",
      fontSize: "0.85rem",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    aboutSection: {
      padding: "2.5rem",
      textAlign: "left",
    },
    sectionTitle: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#666",
      marginBottom: "1.5rem",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={{ ...styles.glassmorphism, ...styles.header }}>
        <nav style={styles.nav}>
          <div style={styles.logo}>KaluYaan</div>

          <ul style={styles.navLinks}>
            <li>
              <a href="#merge" style={styles.navLink}>
                All
              </a>
            </li>
            <li>
              <a href="#merge" style={styles.navLink}>
                Writing
              </a>
            </li>
            <li>
              <a href="#split" style={styles.navLink}>
                Calculator
              </a>
            </li>
            <li>
              <a href="#compress" style={styles.navLink}>
                Productivity
              </a>
            </li>
            <li>
              <a href="#convert" style={styles.navLink}>
                Web Tools
              </a>
            </li>
            <li>
              <a href="#tools" style={styles.navLink}>
                Spiritual
              </a>
            </li>
            <li>
              <a href="#tools" style={styles.navLink}>
                Health
              </a>
            </li>
            <li>
              <a href="#tools" style={styles.navLink}>
                Games
              </a>
            </li>
          </ul>

          <div style={styles.navIcons}>
            <button
              style={styles.iconBtn}
              onClick={toggleLanguage}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(102, 126, 234, 0.1)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              🌐
            </button>
            <button
              style={styles.iconBtn}
              onClick={toggleMenu}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(102, 126, 234, 0.1)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              ⋮
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {/* Hero Section */}
        <section style={{ ...styles.glassmorphism, ...styles.hero }}>
          <h1 style={styles.heroTitle}>All-in-One Utility Hub</h1>
          <p style={styles.heroText}>
            Everything you need for work, productivity, and daily tasks in one
            place. From AI writing tools and calculators to health tests and
            spiritual guidance - access 20+ essential utilities with just a few
            clicks.
          </p>
        </section>

        {/* Tools Grid */}
        <section style={styles.toolsGrid}>
          {[
            {
              key: "ai-writer",
              icon: "🤖",
              title: "AI to Human Writer",
              desc: "Transform AI-generated text into natural, human-like content",
              category: "Writing",
            },
            {
              key: "duplicate-sentence",
              icon: "📝",
              title: "Duplicate Sentence Generator",
              desc: "Create multiple variations of your sentences instantly",
              category: "Writing",
            },
            {
              key: "sentence-compare",
              icon: "⚖️",
              title: "Sentence Compare",
              desc: "Compare and analyze differences between two sentences",
              category: "Writing",
            },
            {
              key: "plagiarism-detector",
              icon: "🔍",
              title: "Plagiarism & AI Detector",
              desc: "Check content for plagiarism and AI-generated text",
              category: "Writing",
            },
            {
              key: "age-calculator",
              icon: "📅",
              title: "Age Calculator",
              desc: "Calculate age, days, months, and years between dates",
              category: "Calculator",
            },
            {
              key: "love-calculator",
              icon: "💕",
              title: "Love Calculator",
              desc: "Calculate compatibility between two names or partners",
              category: "Calculator",
            },
            {
              key: "relationship-calculator",
              icon: "💖",
              title: "Relationship Calculator",
              desc: "Analyze and calculate relationship compatibility scores",
              category: "Calculator",
            },
            {
              key: "sunrise-sunset",
              icon: "🌅",
              title: "Sunrise & Sunset",
              desc: "Get accurate sunrise and sunset times for any location",
              category: "Calculator",
            },
            {
              key: "todo",
              icon: "✅",
              title: "TO-DO List",
              desc: "Organize and manage your daily tasks efficiently",
              category: "Productivity",
            },
            {
              key: "planner",
              icon: "📋",
              title: "Smart Planner",
              desc: "Timer, calendar, scheduler, and mailer in one tool",
              category: "Productivity",
            },
            {
              key: "clock-time",
              icon: "🕐",
              title: "Clock & Time",
              desc: "World clock with multiple time zones and formats",
              category: "Productivity",
            },
            {
              key: "countdown",
              icon: "⏰",
              title: "Countdown Timer",
              desc: "Create countdown timers for events and deadlines",
              category: "Productivity",
            },
            {
              key: "internet-speed",
              icon: "🌐",
              title: "Internet Speed Test",
              desc: "Test your internet connection speed and performance",
              category: "Web Tools",
            },
            {
              key: "short-link",
              icon: "🔗",
              title: "Short Link Generator",
              desc: "Create short, shareable links from long URLs",
              category: "Web Tools",
            },
            {
              key: "jwt-token",
              icon: "🔐",
              title: "JWT Token Tool",
              desc: "Create and verify JSON Web Tokens securely",
              category: "Web Tools",
            },
            {
              key: "bhagavad-gita",
              icon: "🕉️",
              title: "Bhagavad Gita",
              desc: "Read and explore the sacred teachings of Bhagavad Gita",
              category: "Spiritual",
            },
            {
              key: "health-detector",
              icon: "🏥",
              title: "Health Detector",
              desc: "Basic health assessment and wellness checker",
              category: "Health",
            },
            {
              key: "eye-test",
              icon: "👁️",
              title: "Eye Testing",
              desc: "Test your vision and eye health online",
              category: "Health",
            },
            {
              key: "iq-test",
              icon: "🧠",
              title: "IQ Testing",
              desc: "Measure your intelligence quotient with standard tests",
              category: "Health",
            },
            {
              key: "sudoku",
              icon: "🔢",
              title: "Sudoku Game",
              desc: "Play classic Sudoku puzzles with different difficulty levels",
              category: "Games",
            },
            {
              key: "roller",
              icon: "🎲",
              title: "Random Roller",
              desc: "Select random users or items from your list",
              category: "Games",
            },
          ].map((tool) => (
            <div
              key={tool.key}
              style={{ ...styles.glassmorphism, ...styles.toolCard }}
              onClick={() => selectTool(tool.key)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 5px 20px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div style={styles.toolIcon}>{tool.icon}</div>
              <h3 style={styles.toolTitle}>{tool.title}</h3>
              <p style={styles.toolDesc}>{tool.desc}</p>
            </div>
          ))}
        </section>

        {/* Content Layout */}
        <div style={styles.contentLayout}>
          {/* Main Area */}
          <div
            style={
              {
                ...styles.glassmorphism,
                ...styles.aboutSection,
              } as React.CSSProperties
            }
          >
            <h2 style={styles.sectionTitle}>About Our Utility Platform</h2>
            <p style={styles.aboutText}>
              {`Our comprehensive online utility hub offers 20+ essential tools
              across 7 categories to streamline your digital workflow. Whether
              you're a content creator, developer, student, or professional,
              find the perfect tool for every task.`}
            </p>
            <p style={styles.aboutText}>
              {`From AI-powered writing assistants and plagiarism detectors to
              smart calculators, productivity planners, health assessments, and
              entertaining games - all tools are completely free, secure, and
              accessible 24/7.`}
            </p>
            <p style={styles.aboutText}>
              {`No downloads required. No registration needed. Just instant access
              to powerful utilities that help you work smarter, not harder.`}
            </p>

            {/* SEO Keywords */}
            <div style={styles.keywordList as React.CSSProperties}>
              {seoKeywords.map((keyword, index) => (
                <span key={index} style={styles.keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div style={styles.sidebar}>
            <FunSidebarDesigns />

            
          </div>
        </div>
        {/* Footer */}
        <footer style={styles.mainContent}>
          <div style={{ ...styles.glassmorphism, ...styles.footer }}>
            <div style={styles.footerGrid}>
              <div>
                <h4 style={{ marginBottom: "1rem", color: "#333" }}>
                  KaluYaan Utility Hub
                </h4>
                <p style={{ color: "#666" }}>
                  Your all-in-one platform for productivity, writing, health,
                  and more.
                </p>
                <div style={{ marginTop: "1rem" }}>
                  <a href="#" style={{ ...styles.footerLink, fontWeight: 600 }}>
                    Privacy Policy
                  </a>
                  <a href="#" style={styles.footerLink}>
                    Terms of Service
                  </a>
                </div>
              </div>
              <div>
                <h4 style={{ marginBottom: "1rem", color: "#333" }}>
                  Explore Tools
                </h4>
                <a href="#ai-writer" style={styles.footerLink}>
                  AI Writer
                </a>
                <a href="#age-calculator" style={styles.footerLink}>
                  Age Calculator
                </a>
                <a href="#planner" style={styles.footerLink}>
                  Smart Planner
                </a>
                <a href="#health-detector" style={styles.footerLink}>
                  Health Detector
                </a>
              </div>
              <div>
                <h4 style={{ marginBottom: "1rem", color: "#333" }}>
                  Utility Tools
                </h4>
                <a href="#ai-writer" style={styles.footerLink}>
                  AI to Human Writer
                </a>
                <a href="#duplicate-sentence" style={styles.footerLink}>
                  Duplicate Sentence Generator
                </a>
                <a href="#sentence-compare" style={styles.footerLink}>
                  Sentence Compare
                </a>
                <a href="#plagiarism-detector" style={styles.footerLink}>
                  Plagiarism & AI Detector
                </a>
                <a href="#short-link" style={styles.footerLink}>
                  Short Link Generator
                </a>
                <a href="#jwt-token" style={styles.footerLink}>
                  JWT Token Tool
                </a>
              </div>
              <div>
                <h4 style={{ marginBottom: "1rem", color: "#333" }}>Connect</h4>
                <a href="#" style={styles.footerLink}>
                  Contact Us
                </a>
                <a href="#" style={styles.footerLink}>
                  Feedback
                </a>
                <a href="#" style={styles.footerLink}>
                  Twitter
                </a>
                <a href="#" style={styles.footerLink}>
                  LinkedIn
                </a>
              </div>
            </div>
            <div style={styles.footerBottom}>
              <p>
                &copy; 2025 KaluYaan. All rights reserved. | Made with ❤️ for
                productivity.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
