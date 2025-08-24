import React from "react";
import FunSidebarDesigns from "./FunZone";
import styles from "./HomeFunzone.module.css";
import { seoKeywords } from "@/config/constants/funzoneConstants";

function ContentLayout() {
  return (
    <div className={styles.contentLayout}>
      {/* Main Area */}
      <div className={styles.aboutWrapper}>
        <h2 className={styles.sectionTitle}>About Our Utility Platform</h2>
        <p className={styles.aboutText}>
          {`Our comprehensive online utility hub offers 20+ essential tools
              across 7 categories to streamline your digital workflow. Whether
              you're a content creator, developer, student, or professional,
              find the perfect tool for every task.`}
        </p>
        <p className={styles.aboutText}>
          {`From AI-powered writing assistants and plagiarism detectors to
              smart calculators, productivity planners, health assessments, and
              entertaining games - all tools are completely free, secure, and
              accessible 24/7.`}
        </p>
        <p className={styles.aboutText}>
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
      </div>

      {/* Sidebar */}
      <FunSidebarDesigns />
    </div>
  );
}

export default ContentLayout;
