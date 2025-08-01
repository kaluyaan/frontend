import React, { useState } from "react";
import styles from "./Header.module.css"; // Assuming you have a CSS module for styles
import { HeaderLinks } from "@/app/config/constants/homeConstants";

const toggleLanguage = (): void => {
  alert("Language menu would open here");
};

const toggleProfile = (): void => {
  alert("Profile menu would open here");
};

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`${styles.glassmorphism} ${styles.header}`}>
        <nav className={styles.nav}>
          <div className={styles.logo}>KaluYaan</div>

          {/* Desktop Navigation */}
          <ul className={styles.navLinksDesktop}>
            {HeaderLinks.map((link) => (
              <li key={link.title}>
                <a href={link.link} className={styles.navLink}>
                  {link.title}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <ul className={styles.navLinksMobile}>
              {HeaderLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.link}
                    className={`nav-link-mobile ${styles.navLinkMobile}`}
                    onClick={closeMobileMenu}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className={`nav-icons ${styles.navIcons}`}>
            {/* Profile Icon */}
            <button
              className={`profile-icon ${styles.profileIcon}`}
              onClick={toggleProfile}
              title="Profile"
            >
              👤
            </button>

            {/* Language Toggle */}
            <button
              className={`icon-btn ${styles.iconBtn}`}
              onClick={toggleLanguage}
              title="Language"
            >
              🌐
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className={`menu-toggle ${styles.menuToggle}`}
              onClick={toggleMobileMenu}
              title="Menu"
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
