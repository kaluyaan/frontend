// "use client";
import React from "react";
import Header from "../shared/Header/Header";
import HomeFunZone from "../FunZone/HomeFunZone";
import styles from "./home.module.css";
import {
  HeroText,
  HeroTitle,
  toolsList,
} from "@/app/config/constants/homeConstants";
import Footer from "../shared/Footer/Footer";
import ToolsList from "../ToolsList/ToolsList";

const Home: React.FC = () => {
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
        <ToolsList />

        {/* Content Layout */}
        <HomeFunZone />
        {/* Footer */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
