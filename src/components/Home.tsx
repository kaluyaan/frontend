"use client";
import React from "react";
import Header from "./shared/Header";
import HomeFunZone from "./ui/HomeFunZone";
import styles from "./home.module.css";
import { toolsList } from "@/app/config/constants";

const Home: React.FC = () => {
  const selectTool = (tool: string): void => {
    // setSelectedTool(tool);
    console.log(`Selected tool: ${tool}`);
  };

  // Inline styles for components

  return (
    <div className={styles.container}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={`${styles.glassmorphism} ${styles.hero}`}>
          <h1 className={styles.heroTitle}>All-in-One Utility Hub</h1>
          <p className={styles.heroText}>
            Everything you need for work, productivity, and daily tasks in one
            place. From AI writing tools and calculators to health tests and
            spiritual guidance - access 20+ essential utilities with just a few
            clicks.
          </p>
        </section>

        {/* Tools Grid */}
        <section className={styles.toolsGrid}>
          {toolsList.map((tool) => (
            <div
              key={tool.key}
              className={`${styles.glassmorphism} ${styles.toolCard}`}
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
              <div className={styles.toolIcon}>{tool.icon}</div>
              <h3 className={styles.toolTitle}>{tool.title}</h3>
              <p className={styles.toolDesc}>{tool.desc}</p>
            </div>
          ))}
        </section>

        {/* Content Layout */}
        <HomeFunZone />
        {/* Footer */}
        <footer className={styles.mainContent}>
          <div className={`${styles.glassmorphism} ${styles.footer}`}>
            <div className={styles.footerGrid}>
              <div>
                <h4 className={styles.sectionTitle}>KaluYaan Utility Hub</h4>
                <p className={styles.footerText}>
                  Your all-in-one platform for productivity, writing, health,
                  and more.
                </p>
                <div style={{ marginTop: "1rem" }}>
                  <a
                    href="#"
                    className={`${styles.footerLink} ${styles.footerLinkBold}`}
                  >
                    Privacy Policy
                  </a>
                  <a href="#" className={styles.footerLink}>
                    Terms of Service
                  </a>
                </div>
              </div>
              <div>
                <h4 style={{ marginBottom: "1rem", color: "#333" }}>
                  Explore Tools
                </h4>
                <a href="#ai-writer" className={styles.footerLink}>
                  AI Writer
                </a>
                <a href="#age-calculator" className={styles.footerLink}>
                  Age Calculator
                </a>
                <a href="#planner" className={styles.footerLink}>
                  Smart Planner
                </a>
                <a href="#health-detector" className={styles.footerLink}>
                  Health Detector
                </a>
              </div>
              <div>
                <h4 className={styles.sectionTitle}>Utility Tools</h4>
                <a href="#ai-writer" className={styles.footerLink}>
                  AI to Human Writer
                </a>
                <a href="#duplicate-sentence" className={styles.footerLink}>
                  Duplicate Sentence Generator
                </a>
                <a href="#sentence-compare" className={styles.footerLink}>
                  Sentence Compare
                </a>
                <a href="#plagiarism-detector" className={styles.footerLink}>
                  Plagiarism & AI Detector
                </a>
                <a href="#short-link" className={styles.footerLink}>
                  Short Link Generator
                </a>
                <a href="#jwt-token" className={styles.footerLink}>
                  JWT Token Tool
                </a>
              </div>
              <div>
                <h4 className={styles.sectionTitle}>Connect</h4>
                <a href="#" className={styles.footerLink}>
                  Contact Us
                </a>
                <a href="#" className={styles.footerLink}>
                  Feedback
                </a>
                <a href="#" className={styles.footerLink}>
                  Twitter
                </a>
                <a href="#" className={styles.footerLink}>
                  LinkedIn
                </a>
              </div>
            </div>
            <div className={styles.footerBottom}>
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
