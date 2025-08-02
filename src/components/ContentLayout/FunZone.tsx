"use client";
import React, { useState } from "react";
import styled from "@emotion/styled";
import styles from "./FunZone.module.css"; // Assuming you have a CSS module for styles

const FunSidebarDesigns = () => {
  const [selectedDesign, setSelectedDesign] = useState(1);

  // Design 1: Gaming Zone
  const GamingDesign = () => (
    <>
      <div
        className={`${styles.glassmorphism} ${styles.sidebarCard} ${styles.gamingCard}`}
      >
        <h3 className={styles.title}>🎮 Fun Zone</h3>
        <p className={styles.desc}>Take a break and have some fun!</p>

        <div
          className={styles.funItem}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span className={styles.funIcon}>🎲</span>
          <div className={styles.funText}>
            <div className={styles.funTitle}>Random Roller</div>
            <div className={styles.funDesc}>Pick random items</div>
          </div>
        </div>

        <div
          className={styles.funItem}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span className={styles.funIcon}>🧩</span>
          <div className={styles.funText}>
            <div className={styles.funTitle}>Sudoku Game</div>
            <div className={styles.funDesc}>Brain training puzzles</div>
          </div>
        </div>

        <div
          className={styles.funItem}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span className={styles.funIcon}>💕</span>
          <div className={styles.funText}>
            <div className={styles.funTitle}>Love Calculator</div>
            <div className={styles.funDesc}>Just for fun!</div>
          </div>
        </div>
      </div>

      <div className={`${styles.sidebarCard} ${styles.premiumCard}`}>
        <h3 className={styles.title}>KaluYaan Premium</h3>
        <p className={styles.desc}>
          Get more features and remove limits
        </p>
        <a href="#" className={styles.premiumBtn}>
          Get Premium
        </a>
      </div>
    </>
  );

  // Design 2: Interactive Stats
  const StatsDesign = () => (
    <>
      <div className={`${styles.glassmorphism} ${styles.sidebarCard}`}>
        <h3 className={styles.title}>📊 Live Stats</h3>

        <div className={styles.statItem}>
          <span className={styles.statNumber}>1,234</span>
          <span className={styles.statLabel}>Happy Users Today</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statNumber}>567</span>
          <span className={styles.statLabel}>Tools Used This Hour</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statNumber}>20+</span>
          <span className={styles.statLabel}>Free Utilities</span>
        </div>
      </div>

      <div className={`${styles.glassmorphism} ${styles.sidebarCard}`}>
        <h3 className={styles.title} style={{ color: "#fff" }}>🎯 Quick Actions</h3>

        <button
          className={styles.gameBtn}
          style={{ width: "100%", marginBottom: "1rem" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")
          }
        >
          🎲 Feeling Lucky?
        </button>

        <button
          className={styles.gameBtn}
          style={{ width: "100%", marginBottom: "1rem" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")
          }
        >
          🧠 Test Your IQ
        </button>

        <button
          className={styles.gameBtn}
          style={{ width: "100%" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")
          }
        >
          💖 Find Love Match
        </button>
      </div>

      <div className={`${styles.sidebarCard} ${styles.premiumCard}`}>
        <h3 className={styles.title}>⚡ Premium Zone</h3>
        <p className={styles.desc}>Join thousands of premium users!</p>
        <button className={styles.btn}>Upgrade Now</button>
      </div>
    </>
  );

  // Design 3: Neon Cyber
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
        <button className={styles.btn} style={{ background: "#000", color: "#00ff00", border: "1px solid #00ff00" }}  >
          ENTER MATRIX
        </button>
      </div>
    </>
  );

  // Design 4: Minimalist Fun
  const MinimalDesign = () => (
    <>
      <div className={`${styles.glassmorphism} ${styles.sidebarCard}`}>
        <h3 className={styles.title} style={{ color: "#fff", textAlign: "center" }}>
          ✨ Discover
        </h3>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎯</div>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1rem" }}>
            Explore fun tools and games
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{ textAlign: "center", cursor: "pointer" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div style={{ fontSize: "2rem" }}>🎲</div>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.8)" }}>
              Random
            </div>
          </div>
          <div
            style={{ textAlign: "center", cursor: "pointer" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div style={{ fontSize: "2rem" }}>🧩</div>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.8)" }}>
              Puzzle
            </div>
          </div>
          <div
            style={{ textAlign: "center", cursor: "pointer" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div style={{ fontSize: "2rem" }}>💕</div>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.8)" }}>
              Love
            </div>
          </div>
        </div>

        <button
          className={styles.btn}
          style={{
                        width: "100%",
            background: "rgba(255,255,255,0.2)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          Start Playing
        </button>
      </div>

      <div className={`${styles.sidebarCard} ${styles.premiumCard}`}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🚀</div>
          <h3 className={styles.title}>Premium</h3>
          <p className={styles.desc}>Unlock all features</p>
          <button className={styles.btn}>Upgrade</button>
        </div>
      </div>
    </>
  );

  // Design 5: Interactive Dashboard
  const DashboardDesign = () => (
    <>
      <div
        className={`${styles.glassmorphism} ${styles.sidebarCard} ${styles.techCard}`}
      >
        <h3 className={styles.title}>🎮 Entertainment Hub</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            className={styles.statItem}
            style={{
              background: "rgba(255,255,255,0.2)",
            }}
          >
            <span className={styles.statNumber} style={{ fontSize: "1.5rem" }}>🎲</span>
            <span className={styles.statLabel}>Random Tools</span>
          </div>
          <div
            className={styles.statItem}
            style={{
              background: "rgba(255,255,255,0.2)",
            }}
          >
            <span className={styles.statNumber} style={{ fontSize: "1.5rem" }}>🧠</span>
            <span className={styles.statLabel}>Brain Games</span>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "1rem",
            borderRadius: "10px",
            marginBottom: "1rem",
          }}
        >
          <div style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
            🔥 Trending Now:
          </div>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            Love Calculator
          </div>
          <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
            Try your compatibility score!
          </div>
        </div>

        <button
          className={styles.btn}
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.9)",
          }}
        >
          Explore Games
        </button>
      </div>

      <div className={`${styles.sidebarCard} ${styles.premiumCard}`}>
        <h3 className={styles.title}>💎 VIP Experience</h3>
        <div style={{ marginBottom: "1rem" }}>
          <div
            style={{ fontSize: "0.9rem", opacity: 0.9, marginBottom: "0.5rem" }}
          >
            ✓ Ad-free experience
          </div>
          <div
            style={{ fontSize: "0.9rem", opacity: 0.9, marginBottom: "0.5rem" }}
          >
            ✓ Priority support
          </div>
          <div
            style={{ fontSize: "0.9rem", opacity: 0.9, marginBottom: "0.5rem" }}
          >
            ✓ Exclusive tools
          </div>
        </div>
        <button className={styles.btn}>Join VIP</button>
      </div>
    </>
  );

  const designs = [
    { id: 1, name: "Gaming Zone", component: GamingDesign },
    { id: 2, name: "Live Stats", component: StatsDesign },
    { id: 3, name: "Neon Cyber", component: NeonDesign },
    { id: 4, name: "Minimal Fun", component: MinimalDesign },
    { id: 5, name: "Dashboard", component: DashboardDesign },
  ];

  const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  font-family: Arial, sans-serif;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem; /* smaller padding for mobile */
  }
`;

  return (
    <Container>
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

      <div className={styles.designSelector}>
        {designs.map((design) => (
          <button
            key={design.id}
            className={`${styles.designBtn} ${selectedDesign === design.id ? styles.activeBtn : ""}`}
            onClick={() => setSelectedDesign(design.id)}
          >
            {design.name}
          </button>
        ))}
      </div>

      <div className={styles.sidebar}>
        {(() => {
          const DesignComponent = designs.find(
            (d) => d.id === selectedDesign
          )?.component;
          return DesignComponent ? <DesignComponent /> : null;
        })()}
      </div>
    </Container>
  );
};

export default FunSidebarDesigns;
