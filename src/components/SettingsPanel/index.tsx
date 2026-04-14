'use client';

import React, { useState } from 'react';
import { EyeIcon, LockIcon } from '@/components/common/Icons';
import { useLanguage } from '@/lib/context/LanguageContext';
import styles from './SettingsPanel.module.css';

interface SettingsPanelProps {
  password: string;
  setPassword: (val: string) => void;
  batchMode: boolean;
  setBatchMode: (val: boolean) => void;
  outputSuffix: string;
  setOutputSuffix: (val: string) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  password,
  setPassword,
  batchMode,
  setBatchMode,
  outputSuffix,
  setOutputSuffix
}) => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className={`glass ${styles.container}`} aria-labelledby="settings-title">
      <h2 id="settings-title" className={styles.title}>{t('settings.title')}</h2>
      
      <div className={styles.field}>
        <label htmlFor="master-pwd">{t('settings.password')}</label>
        <div className={styles.passwordWrapper}>
          <input
            id="master-pwd"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('settings.password_placeholder')}
            className={styles.input}
          />
          <button 
            onClick={() => setShowPassword(!showPassword)}
            className={styles.toggleBtn}
            title={showPassword ? t('settings.hide_pwd') : t('settings.show_pwd')}
            aria-label={showPassword ? t('settings.hide_pwd') : t('settings.show_pwd')}
          >
            {showPassword ? <EyeIcon size={20} aria-hidden="true" /> : <LockIcon size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className={styles.optionsGrid}>
        <div className={styles.checkboxField}>
          <input
            type="checkbox"
            id="batchMode"
            checked={batchMode}
            onChange={(e) => setBatchMode(e.target.checked)}
          />
          <label htmlFor="batchMode">{t('settings.batch_mode')}</label>
        </div>

        <div className={styles.field}>
          <label htmlFor="suffix-input">{t('settings.suffix')}</label>
          <input
            id="suffix-input"
            type="text"
            value={outputSuffix}
            onChange={(e) => setOutputSuffix(e.target.value)}
            placeholder="_decrypted"
            className={styles.smallInput}
          />
        </div>
      </div>
    </section>
  );
};

export default SettingsPanel;
