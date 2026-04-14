'use client';

import React, { useState } from 'react';
import { EyeIcon, LockIcon } from '@/components/common/Icons';
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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`glass ${styles.container}`}>
      <h2 className={styles.title}>Configuración</h2>
      
      <div className={styles.field}>
        <label>Contraseña Maestra</label>
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduce la clave de encriptación..."
            className={styles.input}
          />
          <button 
            onClick={() => setShowPassword(!showPassword)}
            className={styles.toggleBtn}
            title={showPassword ? 'Ocultar' : 'Mostrar'}
          >
            {showPassword ? <EyeIcon size={20} /> : <LockIcon size={20} />}
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
          <label htmlFor="batchMode">Modo Batch (Mantener lista)</label>
        </div>

        <div className={styles.field}>
          <label>Sufijo Desencriptación</label>
          <input
            type="text"
            value={outputSuffix}
            onChange={(e) => setOutputSuffix(e.target.value)}
            placeholder="_decrypted"
            className={styles.smallInput}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
