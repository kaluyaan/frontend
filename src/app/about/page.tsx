
import React from "react";
import styles from "./about.module.scss";


const AboutPage = () => (
  <main className={styles["about-main"]}>
    <h1 className={styles["about-title"]}>About Kaluyaan</h1>
    <p className={styles["about-text"]}>
      <strong>Kaluyaan</strong> is your one-stop platform for handy single-page
      tools designed to make your life easier. Whether you need to calculate
      your age, check compatibility with a lover calculator, or convert
      AI-generated content to sound more human, Kaluyaan has you covered.
    </p>
    <ul className={styles["about-list"]}>
      <li>Age Calculator</li>
      <li>Lover Calculator</li>
      <li>AI to Human Content Converter</li>
      <li>And more tools coming soon!</li>
    </ul>
    <p className={styles["about-text"]}>
      Our mission is to provide simple, fast, and reliable tools for everyone.
      Thank you for using Kaluyaan!
    </p>
  </main>
);

export default AboutPage;
