import React, { Suspense } from "react";
// import Header from "../shared/Header/Header";
import styles from "./home.module.css";
import {
  HeroText,
  HeroTitle,
} from "@/config/constants/homeConstants";
import Footer from "../shared/Footer/Footer";
import ToolsList from "../ToolsList/ToolsList";
import ContentLayout from "../ContentLayout/ContentLayout";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      {/* <Header /> */}

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={`${styles.glassmorphism} ${styles.hero}`}>
          <h1 className={styles.heroTitle}>{HeroTitle}</h1>
          <p className={styles.heroText}>{HeroText}</p>
        </section>

        {/* Tools Grid */}
        <Suspense fallback={<div>Loading....</div>}>
          <ToolsList />
        </Suspense>

        {/* Content Layout */}
        <ContentLayout />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
