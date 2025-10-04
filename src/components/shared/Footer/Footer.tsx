import React from "react";
import styles from "@/components/Home/home.module.css";
import {
  Connects,
  ExploreTools,
  FooterTerms,
  FooterText,
  UtilityTools,
} from "@/config/constants/footerConstants";

function Footer() {
  return (
    <div className={`${styles.glassmorphism} ${styles.footer}`}>
      <div className={styles.footerGrid}>
        <div>
          <h2 className={styles.normalTitle}>KaluYaan Utility Hub</h2>
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
          <h4 className={styles.normalTitle}>Explore Tools</h4>
          {ExploreTools.map((tool) => (
            <a key={tool.title} href={tool.link} className={styles.footerLink}>
              {tool.title}
            </a>
          ))}
        </div>
        <div>
          <h4 className={styles.normalTitle}>Utility Tools</h4>
          {UtilityTools.map((tool) => (
            <a key={tool.title} href={tool.link} className={styles.footerLink}>
              {tool.title}
            </a>
          ))}
        </div>
        <div>
          <h4 className={styles.normalTitle}>Connect</h4>
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
  );
}

export default Footer;
