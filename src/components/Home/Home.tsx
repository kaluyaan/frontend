import React, { Suspense } from "react";
// import Header from "../shared/Header/Header";
import styles from "./home.module.css";
import { HeroText, HeroTitle } from "@/config/constants/homeConstants";
import Footer from "../shared/Footer/Footer";
import ToolsList from "../ToolsList/ToolsList";
import HeroSection from "../shared/HeroSection";
import { seoKeywords } from "@/config/constants/funzoneConstants";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      {/* <Header /> */}

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Hero Section */}
        <HeroSection icon="" title={HeroTitle} text={HeroText} />

        {/* Tools Grid */}
        <Suspense fallback={<div>Loading....</div>}>
          <ToolsList />
        </Suspense>

        {/* Content Layout */}
        <section className={styles.sectionWrapper}>
          {/* Main Area */}
          <h2 className={styles.normalTitle}>About Our Utility Platform</h2>
          <p className={styles.normalText}>
            {`Our comprehensive online utility hub offers 20+ essential tools
              across 7 categories to streamline your digital workflow. Whether
              you're a content creator, developer, student, or professional,
              find the perfect tool for every task.`}
          </p>
          <p className={styles.normalText}>
            {`From AI-powered writing assistants and plagiarism detectors to
              smart calculators, productivity planners, health assessments, and
              entertaining games - all tools are completely free, secure, and
              accessible 24/7.`}
          </p>
          <p className={styles.normalText}>
            {`No downloads required. No registration needed. Just instant access
              to powerful utilities that help you work smarter, not harder.`}
          </p>

          {/* SEO Keywords */}
          <div className={styles.keywordList}>
            {seoKeywords.map((keyword, index) => (
              <span key={index} className={styles.keyword}>
                {keyword}
              </span>
            ))}
          </div>
        </section>
        {/* <Footer /> */}
      </main>
      {/* Footer */}
    </div>
  );
};

export default Home;
