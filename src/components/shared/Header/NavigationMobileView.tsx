"use client";
import React, { useState } from "react";
import styles from "./Header.module.css"; // Assuming you have a CSS module for styles
import { HeaderLinks } from "@/config/constants/homeConstants";

// const toggleLanguage = (): void => {
//   alert("Language menu would open here");
// };

// const toggleProfile = (): void => {
//   alert("Profile menu would open here");
// };

function NavigationMobileView() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
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
        {/* <button
          className={`profile-icon ${styles.profileIcon}`}
          onClick={toggleProfile}
          title="Profile"
        >
          👤
        </button> */}

        {/* Language Toggle */}
        {/* <button
          className={`icon-btn ${styles.iconBtn}`}
          onClick={toggleLanguage}
          title="Language"
        >
          🌐
        </button> */}

        {/* Mobile Menu Toggle */}
        <button
          className={`menu-toggle ${styles.menuToggle}`}
          onClick={toggleMobileMenu}
          title="Menu"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>
    </>
  );
}

export default NavigationMobileView;
