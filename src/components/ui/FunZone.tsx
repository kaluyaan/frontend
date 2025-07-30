import React, { useState } from "react";
import styled from "@emotion/styled";

const FunSidebarDesigns = () => {
  const [selectedDesign, setSelectedDesign] = useState(1);

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "2rem",
      fontFamily: "Arial, sans-serif",
    },
    designSelector: {
      display: "flex",
      gap: "1rem",
      marginBottom: "2rem",
      flexWrap: "wrap",
    },
    designBtn: {
      padding: "0.5rem 1rem",
      background: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "8px",
      color: "#fff",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    activeBtn: {
      background: "rgba(255, 255, 255, 0.4)",
      transform: "translateY(-2px)",
    },
    sidebar: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      margin: "0 auto",
    },
    glassmorphism: {
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    },
    sidebarCard: {
      borderRadius: "15px",
      padding: "1.5rem",
      boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
    },
    premiumCard: {
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      color: "white",
    },
    gamingCard: {
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      color: "#fff",
    },
    neonCard: {
      background: "linear-gradient(135deg, #ff0080, #7928ca)",
      color: "#fff",
      boxShadow: "0 0 30px rgba(255, 0, 128, 0.3)",
    },
    techCard: {
      background: "linear-gradient(135deg, #00d4aa, #00b4db)",
      color: "#fff",
    },
    title: {
      fontSize: "1.4rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    desc: {
      marginBottom: "1.5rem",
      opacity: 0.9,
      lineHeight: "1.5",
    },
    btn: {
      background: "#fff",
      color: "#333",
      padding: "0.8rem 1.5rem",
      borderRadius: "10px",
      textDecoration: "none",
      fontWeight: "bold",
      display: "inline-block",
      transition: "all 0.3s ease",
      cursor: "pointer",
      border: "none",
    },
    gameBtn: {
      background: "rgba(255, 255, 255, 0.2)",
      color: "#fff",
      border: "2px solid rgba(255, 255, 255, 0.3)",
      marginRight: "0.5rem",
      marginBottom: "0.5rem",
      padding: "0.5rem 1rem",
      fontSize: "0.9rem",
    },
    funItem: {
      display: "flex",
      alignItems: "center",
      padding: "1rem",
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "10px",
      marginBottom: "0.8rem",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    funIcon: {
      fontSize: "1.5rem",
      marginRight: "1rem",
    },
    funText: {
      flex: 1,
    },
    funTitle: {
      fontWeight: "bold",
      marginBottom: "0.2rem",
    },
    funDesc: {
      fontSize: "0.8rem",
      opacity: 0.8,
    },
    statItem: {
      textAlign: "center",
      padding: "1rem",
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "10px",
      marginBottom: "1rem",
    },
    statNumber: {
      fontSize: "2rem",
      fontWeight: "bold",
      display: "block",
      marginBottom: "0.5rem",
    },
    statLabel: {
      fontSize: "0.9rem",
      opacity: 0.8,
    },
    pulse: {
      animation: "pulse 2s infinite",
    },
    bounce: {
      animation: "bounce 1s infinite",
    },
    premiumBtn: {
      background: "rgba(255, 255, 255, 0.2)",
      color: "white",
      border: "2px solid rgba(255, 255, 255, 0.3)",
      padding: "0.8rem 1.5rem",
      borderRadius: "8px",
      textDecoration: "none",
      display: "inline-block",
      marginTop: "1rem",
      transition: "all 0.3s ease",
    },
  };

  // Design 1: Gaming Zone
  const GamingDesign = () => (
    <>
      <div
        style={{
          ...styles.glassmorphism,
          ...styles.sidebarCard,
          ...styles.gamingCard,
        }}
      >
        <h3 style={styles.title}>🎮 Fun Zone</h3>
        <p style={styles.desc}>Take a break and have some fun!</p>

        <div
          style={styles.funItem}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span style={styles.funIcon}>🎲</span>
          <div style={styles.funText}>
            <div style={styles.funTitle}>Random Roller</div>
            <div style={styles.funDesc}>Pick random items</div>
          </div>
        </div>

        <div
          style={styles.funItem}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span style={styles.funIcon}>🧩</span>
          <div style={styles.funText}>
            <div style={styles.funTitle}>Sudoku Game</div>
            <div style={styles.funDesc}>Brain training puzzles</div>
          </div>
        </div>

        <div
          style={styles.funItem}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span style={styles.funIcon}>💕</span>
          <div style={styles.funText}>
            <div style={styles.funTitle}>Love Calculator</div>
            <div style={styles.funDesc}>Just for fun!</div>
          </div>
        </div>
      </div>

      <div style={{ ...styles.sidebarCard, ...styles.premiumCard }}>
        <h3 style={{ marginBottom: "1rem" }}>KaluYaan Premium</h3>
        <p style={{ marginBottom: "1rem" }}>
          Get more features and remove limits
        </p>
        <a href="#" style={styles.premiumBtn}>
          Get Premium
        </a>
      </div>
    </>
  );

  // Design 2: Interactive Stats
  const StatsDesign = () => (
    <>
      <div style={{ ...styles.glassmorphism, ...styles.sidebarCard }}>
        <h3 style={{ ...styles.title, color: "#fff" }}>📊 Live Stats</h3>

        <div style={styles.statItem as React.CSSProperties}>
          <span style={styles.statNumber}>1,234</span>
          <span style={styles.statLabel}>Happy Users Today</span>
        </div>

        <div style={{ ...styles.statItem } as React.CSSProperties}>
          <span style={styles.statNumber}>567</span>
          <span style={styles.statLabel}>Tools Used This Hour</span>
        </div>

        <div style={styles.statItem as React.CSSProperties}>
          <span style={styles.statNumber}>20+</span>
          <span style={styles.statLabel}>Free Utilities</span>
        </div>
      </div>

      <div style={{ ...styles.glassmorphism, ...styles.sidebarCard }}>
        <h3 style={{ ...styles.title, color: "#fff" }}>🎯 Quick Actions</h3>

        <button
          style={{ ...styles.gameBtn, width: "100%", marginBottom: "1rem" }}
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
          style={{ ...styles.gameBtn, width: "100%", marginBottom: "1rem" }}
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
          style={{ ...styles.gameBtn, width: "100%" }}
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

      <div style={{ ...styles.sidebarCard, ...styles.premiumCard }}>
        <h3 style={styles.title}>⚡ Premium Zone</h3>
        <p style={styles.desc}>Join thousands of premium users!</p>
        <button style={styles.btn}>Upgrade Now</button>
      </div>
    </>
  );

  // Design 3: Neon Cyber
  const NeonDesign = () => (
    <>
      <div
        style={{
          ...styles.glassmorphism,
          ...styles.sidebarCard,
          ...styles.neonCard,
        }}
      >
        <h3 style={styles.title}>⚡ CYBER ZONE</h3>
        <p style={styles.desc}>Enter the digital playground</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
          }}
        >
          <button style={styles.gameBtn}>🎮 PLAY</button>
          <button style={styles.gameBtn}>🧠 THINK</button>
          <button style={styles.gameBtn}>💖 LOVE</button>
          <button style={styles.gameBtn}>🎲 ROLL</button>
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

      <div style={{ ...styles.sidebarCard, ...styles.premiumCard }}>
        <h3 style={styles.title}>🌟 PREMIUM ACCESS</h3>
        <p style={styles.desc}>Unlock the matrix of possibilities</p>
        <button
          style={{
            ...styles.btn,
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

  // Design 4: Minimalist Fun
  const MinimalDesign = () => (
    <>
      <div style={{ ...styles.glassmorphism, ...styles.sidebarCard }}>
        <h3 style={{ ...styles.title, color: "#fff", textAlign: "center" }}>
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
          style={{
            ...styles.btn,
            width: "100%",
            background: "rgba(255,255,255,0.2)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          Start Playing
        </button>
      </div>

      <div style={{ ...styles.sidebarCard, ...styles.premiumCard }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🚀</div>
          <h3 style={styles.title}>Premium</h3>
          <p style={styles.desc}>Unlock all features</p>
          <button style={styles.btn}>Upgrade</button>
        </div>
      </div>
    </>
  );

  // Design 5: Interactive Dashboard
  const DashboardDesign = () => (
    <>
      <div
        style={{
          ...styles.glassmorphism,
          ...styles.sidebarCard,
          ...styles.techCard,
        }}
      >
        <h3 style={styles.title}>🎮 Entertainment Hub</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={
              {
                ...styles.statItem,
                background: "rgba(255,255,255,0.2)",
              } as React.CSSProperties
            }
          >
            <span style={{ ...styles.statNumber, fontSize: "1.5rem" }}>🎲</span>
            <span style={styles.statLabel}>Random Tools</span>
          </div>
          <div
            style={
              {
                ...styles.statItem,
                background: "rgba(255,255,255,0.2)",
              } as React.CSSProperties
            }
          >
            <span style={{ ...styles.statNumber, fontSize: "1.5rem" }}>🧠</span>
            <span style={styles.statLabel}>Brain Games</span>
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
          style={{
            ...styles.btn,
            width: "100%",
            background: "rgba(255,255,255,0.9)",
          }}
        >
          Explore Games
        </button>
      </div>

      <div style={{ ...styles.sidebarCard, ...styles.premiumCard }}>
        <h3 style={styles.title}>💎 VIP Experience</h3>
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
        <button style={styles.btn}>Join VIP</button>
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

      <div style={styles.designSelector as React.CSSProperties}>
        {designs.map((design) => (
          <button
            key={design.id}
            style={{
              ...styles.designBtn,
              ...(selectedDesign === design.id ? styles.activeBtn : {}),
            }}
            onClick={() => setSelectedDesign(design.id)}
          >
            {design.name}
          </button>
        ))}
      </div>

      <div style={styles.sidebar as React.CSSProperties}>
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
