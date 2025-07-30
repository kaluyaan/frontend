import React from "react";
import FunSidebarDesigns from "./FunZone";
import styled from "@emotion/styled";

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
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
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
    gap: "0rem",
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

function HomeFunZone() {
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
  const ContentLayout = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    margin-bottom: 1rem;
    box-sizing: border-box;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      padding: 0 1rem;
    }
  `;

  const AboutWrapper = styled.div`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    padding: 2.5rem;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;

    @media (max-width: 768px) {
      padding: 1.5rem;
      margin: 0 0rem;
      text-align: center;
    }
  `;

  return (
    <ContentLayout>
      {/* Main Area */}
      <AboutWrapper>
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
      </AboutWrapper>

      {/* Sidebar */}
        <FunSidebarDesigns />
    </ContentLayout>
  );
}

export default HomeFunZone;
