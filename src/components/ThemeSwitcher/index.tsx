'use client';

import React, { useState } from 'react';
import { useTheme, ThemeMode } from '@/lib/hooks/useTheme';
import { SunIcon, MoonIcon, SystemIcon, ClockIcon } from '@/components/common/Icons';
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher: React.FC = () => {
  const { mode, setMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const options: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'light', label: 'Claro', icon: <SunIcon size={20} /> },
    { mode: 'dark', label: 'Oscuro', icon: <MoonIcon size={20} /> },
    { mode: 'system', label: 'Sistema', icon: <SystemIcon size={20} /> },
    { mode: 'auto', label: 'Automático', icon: <ClockIcon size={20} /> },
  ];

  const currentOption = options.find(o => o.mode === mode) || options[1];

  return (
    <div className={styles.wrapper}>
      <button 
        className={`glass ${styles.toggleBtn}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Cambiar tema"
      >
        <span className={styles.icon}>{currentOption.icon}</span>
        <span className={styles.label}>{currentOption.label}</span>
      </button>

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />
          <div className={`glass ${styles.menu} animate-fade-in`}>
            {options.map((opt) => (
              <button
                key={opt.mode}
                className={`${styles.menuItem} ${mode === opt.mode ? styles.active : ''}`}
                onClick={() => {
                  setMode(opt.mode);
                  setIsOpen(false);
                }}
              >
                <span className={styles.optIcon}>{opt.icon}</span>
                <span>{opt.label}</span>
                {opt.mode === 'auto' && <small className={styles.hint}>(8:00 - 20:00)</small>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSwitcher;
