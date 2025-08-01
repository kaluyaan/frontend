import React from "react";
import styles from "./footer.module.css";
import {
  Connects,
  ExploreTools,
  FooterTerms,
  FooterText,
  UtilityTools,
} from "@/app/config/constants/footerConstants";

function Footer() {
  return (
    <footer className={styles.mainContent}>
      <div className={`${styles.glassmorphism} ${styles.footer}`}>
        <div className={styles.footerGrid}>
          <div>
            <h4 className={styles.sectionTitle}>KaluYaan Utility Hub</h4>
            <p className={styles.footerText}>{FooterText}</p>
            <div style={{ marginTop: "1rem" }}>
              {FooterTerms.map((term, index) => (
                <a
                  key={index}
                  href={term.link}
                  className={`${styles.footerLink} ${styles.footerLinkBold}`}
                >
                  {term.title}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className={styles.sectionTitle}>Explore Tools</h4>
            {ExploreTools.map((tool) => (
              <a
                key={tool.title}
                href={tool.link}
                className={styles.footerLink}
              >
                {tool.title}
              </a>
            ))}
          </div>
          <div>
            <h4 className={styles.sectionTitle}>Utility Tools</h4>
            {UtilityTools.map((tool) => (
              <a
                key={tool.title}
                href={tool.link}
                className={styles.footerLink}
              >
                {tool.title}
              </a>
            ))}
          </div>
          <div>
            <h4 className={styles.sectionTitle}>Connect</h4>
            {Connects.map((connect) => (
              <a
                key={connect.title}
                href={connect.link}
                className={styles.footerLink}
              >
                {connect.title}
              </a>
            ))}
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
  );
}

export default Footer;
