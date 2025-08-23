// components/SettingsPanel.tsx
import { HumanizationOptions } from '../../types';
import styles from '../../app/ai-writer/page.module.css'

interface SettingsPanelProps {
  options: HumanizationOptions;
  onOptionsChange: (options: HumanizationOptions) => void;
}

const SettingsPanel = ({ options, onOptionsChange }: SettingsPanelProps) => {
  const handleCheckboxChange = (key: keyof HumanizationOptions) => {
    onOptionsChange({
      ...options,
      [key]: !options[key]
    });
  };

  const settingsConfig = [
    {
      key: 'addPersonalTouch' as keyof HumanizationOptions,
      label: 'Add personal expressions and interjections'
    },
    {
      key: 'varyStructure' as keyof HumanizationOptions,
      label: 'Vary sentence structure and length'
    },
    {
      key: 'useContractions' as keyof HumanizationOptions,
      label: 'Use contractions and informal language'
    },
    {
      key: 'addFillers' as keyof HumanizationOptions,
      label: 'Add natural speech fillers and transitions'
    },
    {
      key: 'casualTone' as keyof HumanizationOptions,
      label: 'Make tone more conversational'
    }
  ];

  return (
    <div className={styles.settings}>
      <h3 className={styles.settingsTitle}>Humanization Settings</h3>
      {settingsConfig.map(({ key, label }) => (
        <div key={key} className={styles.settingItem}>
          <input
            type="checkbox"
            id={key}
            className={styles.settingCheckbox}
            checked={options[key]}
            onChange={() => handleCheckboxChange(key)}
          />
          <label htmlFor={key} className={styles.settingLabel}>
            {label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SettingsPanel;