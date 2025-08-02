import React from "react";
import styles from "./FunZone.module.css"; // Assuming you have a CSS module for styles

const FunSidebarDesigns = () => {
  return (
    <div className={styles.container}>
      <h1
        style={{
          color: "#fff",
          textAlign: "center",
          marginBottom: "2rem",
          fontSize: "2rem",
        }}
      >
        Fun Zone
      </h1>

      <div className={styles.sidebar}>
        <NeonDesign />
      </div>
    </div>
  );
};

// Neon Cyber
const NeonDesign = () => (
  <>
    <div
      className={`${styles.glassmorphism} ${styles.sidebarCard} ${styles.neonCard}`}
    >
      <h3 className={styles.title}>⚡ CYBER ZONE</h3>
      <p className={styles.desc}>Enter the digital playground</p>

      <div className={styles.gridContainer}>
        <button className={styles.gameBtn}>🎮 PLAY</button>
        <button className={styles.gameBtn}>🧠 THINK</button>
        <button className={styles.gameBtn}>💖 LOVE</button>
        <button className={styles.gameBtn}>🎲 ROLL</button>
      </div>

      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          background: "rgba(0,0,0,0.2)",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
          {`> System Status: ONLINE`}
          <br />
          {`> Users Active: 1,337`}
          <br />
          {`> Fun Level: MAXIMUM`}
        </div>
      </div>
    </div>

    <div className={`${styles.sidebarCard} ${styles.premiumCard}`}>
      <h3 className={styles.title}>🌟 PREMIUM ACCESS</h3>
      <p className={styles.desc}>Unlock the matrix of possibilities</p>
      <button
        className={styles.btn}
        style={{
          background: "#000",
          color: "#00ff00",
          border: "1px solid #00ff00",
        }}
      >
        ENTER MATRIX
      </button>
    </div>
  </>
);

export default FunSidebarDesigns;
