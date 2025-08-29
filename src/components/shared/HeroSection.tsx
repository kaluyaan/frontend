// components/HeroSection.tsx
import homeStyle from "../../components/Home/home.module.css";
interface HeroSectionProps {
  title: string;
  text: string;
  icon?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, text, icon }) => {
  return (
    <section className={`${homeStyle.glassmorphism} ${homeStyle.hero}`}>
      <section className={homeStyle.title}>
        <span className={homeStyle.titleIcon}>{icon}</span>
        <h1 className={homeStyle.heroTitle}>{title}</h1>
      </section>

      <p className={homeStyle.heroText}>{text}</p>
    </section>
  );
};

export default HeroSection;
