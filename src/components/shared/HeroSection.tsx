// components/HeroSection.tsx
import React from "react";
import homeStyle from "../../components/Home/home.module.css";

interface HeroSectionProps {
  title: string;
  text: string;
  icon?: string;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  title, 
  text, 
  icon, 
  className = "" 
}) => {
  return (
    <section className={`${homeStyle.glassmorphism} ${homeStyle.hero} ${className}`}>
      <div className={homeStyle.title}>
        {icon && <span className={homeStyle.titleIcon}>{icon}</span>}
        <h1 className={homeStyle.heroTitle}>{title}</h1>
      </div>
      <p className={homeStyle.heroText}>{text}</p>
    </section>
  );
};

export default HeroSection;