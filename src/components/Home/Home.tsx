"use client";
import React from "react";
import Header from "../shared/Header";
import HomeFunZone from "../FunZone/HomeFunZone";
import styles from "./home.module.css";
import {
  HeroText,
  HeroTitle,
  toolsList,
} from "@/app/config/constants/homeConstants";
import Footer from "../shared/Footer";

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
          <h1 className={styles.heroTitle}>{HeroTitle}</h1>
          <p className={styles.heroText}>{HeroText}</p>
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
      </main>
      <Footer />
    </div>
  );
};

export default Home;
