// components/Header.tsx
import homeStyle from "../../components/Home/home.module.css";
interface HeaderProps {
  title: string;
  text: string;
}

const Header: React.FC<HeaderProps> = ({ title, text }) => {
  return (
    <section className={`${homeStyle.glassmorphism} ${homeStyle.hero}`}>
      <h1 className={homeStyle.heroTitle}>{title}</h1>
      <p className={homeStyle.heroText}>
        {text}
      </p>
    </section>
  );
};

export default Header;
