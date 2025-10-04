import React from "react";
import homeStyle from "../../components/Home/home.module.css";
import pageStyle from "./page.module.css";

const AboutPage = () => {
  return (
    <div className={`${homeStyle.container} ${pageStyle.pageContainer}`}>
      <main className={`${homeStyle.mainContent} ${pageStyle.pageContent}`}>
        <section className={pageStyle.aboutWrapper}>
          <h1 className={pageStyle.pageTitle}>About Kaluyaan</h1>

          <p className={pageStyle.pageText}>
            <strong>Kaluyaan</strong> is your one-stop platform for handy
            single-page tools designed to make life simpler. From calculating
            your age, checking compatibility, tracking time, or converting AI
            text into natural writing — we’ve got you covered.
          </p>

          <h2 className={pageStyle.sectionTitle}>✨ Our Tools</h2>
          <div className={pageStyle.toolGrid}>
            <div className={pageStyle.toolCard}>🎂 <span>Age Calculator</span></div>
            <div className={pageStyle.toolCard}>❤️ <span>Lover Calculator</span></div>
            <div className={pageStyle.toolCard}>🤖 <span>AI to Human Converter</span></div>
            <div className={pageStyle.toolCard}>🔤 <span>String Case Converter</span></div>
            <div className={pageStyle.toolCard}>🔐 <span>Password Generator</span></div>
            <div className={pageStyle.toolCard}>🔁 <span>Text Repeater</span></div>
            <div className={pageStyle.toolCard}>📝 <span>Word Counter</span></div>
            <div className={pageStyle.toolCard}>🎲 <span>Random Number Generator</span></div>
            <div className={pageStyle.toolCard}>⚖️ <span>BMI Calculator</span></div>
            <div className={pageStyle.toolCard}>⏱️ <span>Stopwatch</span></div>
          </div>

          <p className={pageStyle.footerNote}>
            Our mission is to provide <strong>simple</strong>,{" "}
            <strong>fast</strong>, and <strong>reliable</strong> tools for
            everyone. Thank you for choosing <strong>Kaluyaan</strong>! 🚀
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
