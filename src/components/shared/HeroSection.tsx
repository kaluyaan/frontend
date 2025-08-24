// components/HeroSection.tsx
import homeStyle from "../../components/Home/home.module.css";
interface HeroSectionProps {
  title: string;
  text: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, text }) => {
  return (
    <section className={`${homeStyle.glassmorphism} ${homeStyle.hero}`}>
      <h1 className={homeStyle.heroTitle}>{title}</h1>
      <p className={homeStyle.heroText}>
        {text}
      </p>
    </section>
  );
};

export default HeroSection;
