"use client";

// pages/index.tsx or app/page.tsx (depending on your Next.js version)
import { useState } from "react";
import HeroSection from "../../components/shared/HeroSection";
import SettingsPanel from "../../components/ai-writer/SettingsPanel";
import TextInput from "../../components/shared/TextInput";
import ConvertButton from "../../components/ai-writer/ConvertButton";
import TextOutput from "../../components/ai-writer/TextOutput";
import StatsDisplay from "../../components/ai-writer/StatsDisplay";
import LoadingSpinner from "../../components/ai-writer/LoadingSpinner";
import { humanizeText } from "../../lib/textHumanizer";
import { HumanizationOptions, Stats } from "../../types";
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
        <HeroSection
          icon={"🤖➡️👤"}
          title=" AI to Human Text Converter"
          text="Transform AI-generated text into natural, human-like content"
        />

        {isLoading ? (
          <>
            <TextInput
              disabled={true}
              value={inputText}
              onChange={setInputText}
              title="Input Text (AI-generated)"
              placeholder="Paste your AI-generated text here..."
            />
            <LoadingSpinner isVisible={isLoading} />
          </>
        ) : (
          <>
            <SettingsPanel
              options={options}
              onOptionsChange={handleOptionsChange}
            />
            <TextInput
              disabled={false}
              value={inputText}
              onChange={setInputText}
              title="Input Text (AI-generated)"
              placeholder="Paste your AI-generated text here..."
            />
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
