import React from "react";
import styles from "./Header.module.css"; // Assuming you have a CSS module for styles
import { HeaderLinks } from "@/app/config/constants/homeConstants";
import NavigationMobileView from "./NavigationMobileView";
import Link from "next/link";

function Header() {
  return (
    <>
      <header className={`${styles.glassmorphism} ${styles.header}`}>
        <nav className={styles.nav}>
          <div className={styles.logo}>KaluYaan</div>

          {/* Desktop Navigation */}
          <ul className={styles.navLinksDesktop}>
            {HeaderLinks.map((link) => (
              <li key={link.title}>
                <Link href={link.link} className={styles.navLink}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Mobile View */}
          <NavigationMobileView />
        </nav>
      </header>
    </>
  );
}

export default Header;
