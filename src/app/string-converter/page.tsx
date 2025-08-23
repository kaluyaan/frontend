import Header from "@/components/shared/Header";
import StringHelper from "./components/stringHelper";
import homeStyle from "../../components/Home/home.module.css";

export default function StringConverter() {
  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <Header
          title="String Case Converter"
          text="A handy tool to instantly switch your text between different cases for coding, writing, or content formatting."
        />
      <StringHelper />
      </main>
    </div>
  );
}
