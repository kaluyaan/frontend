"use client";

// pages/index.tsx or app/page.tsx (depending on your Next.js version)
import { useState } from "react";
import Header from "../../components/ai-writer/Header";
import SettingsPanel from "../../components/ai-writer/SettingsPanel";
import TextInput from "../../components/ai-writer/TextInput";
import ConvertButton from "../../components/ai-writer/ConvertButton";
import TextOutput from "../../components/ai-writer/TextOutput";
import StatsDisplay from "../../components/ai-writer/StatsDisplay";
import LoadingSpinner from "../../components/ai-writer/LoadingSpinner";
import { humanizeText } from "../../lib/textHumanizer";
import { HumanizationOptions, Stats } from "../../types";
import styles from "./page.module.css";
import homeStyle from "../../components/Home/home.module.css";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [options, setOptions] = useState<HumanizationOptions>({
    addPersonalTouch: true,
    varyStructure: true,
    useContractions: true,
    addFillers: true,
    casualTone: true,
  });

  const handleConvert = async () => {
    if (!inputText.trim()) {
      alert("Please enter some text to humanize.");
      return;
    }

    setIsLoading(true);
    setStats(null);

    // Simulate processing time
    setTimeout(() => {
      const result = humanizeText(inputText, options);
      setOutputText(result.text);
      setStats(result.stats);
      setIsLoading(false);
    }, 1500);
  };

  const handleOptionsChange = (newOptions: HumanizationOptions) => {
    setOptions(newOptions);
  };

  return (
    <div className={homeStyle.container}>
      <main className={homeStyle.mainContent}>
        <Header />

        {isLoading ? (
          <>
            <TextInput disabled={true} value={inputText} onChange={setInputText} />
            <LoadingSpinner isVisible={isLoading} />
          </>
        ) : (
          <>
            <SettingsPanel
              options={options}
              onOptionsChange={handleOptionsChange}
            />
            <TextInput value={inputText} onChange={setInputText} />
            <ConvertButton onClick={handleConvert} disabled={isLoading} />
          </>
        )}

        {stats && outputText && (
          <>
            <TextOutput value={outputText} />
            <StatsDisplay stats={stats} />
          </>
        )}
      </main>
    </div>
  );
}
