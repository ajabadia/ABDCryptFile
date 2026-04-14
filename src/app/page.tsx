'use client';

import React, { useState, useCallback } from 'react';
import SettingsPanel from '@/components/SettingsPanel';
import FileProcessor from '@/components/FileProcessor';
import LogConsole, { LogEntry } from '@/components/LogConsole';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { ShieldIcon } from '@/components/common/Icons';
import { CryptoService } from '@/lib/services/crypto.service';
import styles from './page.module.css';

export default function Home() {
  const [password, setPassword] = useState('');
  const [batchMode, setBatchMode] = useState(false);
  const [outputSuffix, setOutputSuffix] = useState('_decrypted');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addLog = useCallback((type: LogEntry['type'], message: string, fileName?: string) => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      type,
      message,
      fileName
    };
    setLogs(prev => [...prev, newLog]);
  }, []);

  const handleProcess = async (files: File[], mode: 'encrypt' | 'decrypt') => {
    if (!password) {
      addLog('error', 'La contraseña es obligatoria para procesar archivos.');
      return;
    }

    setIsProcessing(true);
    addLog('info', `Iniciando proceso de ${mode === 'encrypt' ? 'encriptación' : 'desencriptación'} masiva...`);

    let successCount = 0;
    let errorCount = 0;
    let skipCount = 0;

    for (const file of files) {
      try {
        // Validation logic matching funcional.txt
        if (mode === 'encrypt' && file.name.endsWith('.enc')) {
          addLog('skip', 'Archivo ya encriptado, saltando.', file.name);
          skipCount++;
          continue;
        }

        if (mode === 'decrypt' && !file.name.endsWith('.enc')) {
          addLog('skip', 'No es un archivo .enc, saltando.', file.name);
          skipCount++;
          continue;
        }

        let resultBlob: Blob;
        let finalName: string;

        if (mode === 'encrypt') {
          resultBlob = await CryptoService.encryptFile(file, password);
          finalName = `${file.name}.enc`;
        } else {
          resultBlob = await CryptoService.decryptFile(file, password);
          // Remove .enc and add suffix if it's not the original name (conflict handling)
          const baseName = file.name.replace(/\.enc$/, '');
          finalName = `${baseName}${outputSuffix}`;
        }

        // Trigger Download
        const url = URL.createObjectURL(resultBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = finalName;
        a.click();
        URL.revokeObjectURL(url);

        addLog('success', 'Operación completada con éxito.', file.name);
        successCount++;
      } catch (error: any) {
        addLog('error', error.message || 'Error inesperado.', file.name);
        errorCount++;
      }
    }

    addLog('info', t('logs.summary', { s: successCount, e: errorCount, k: skipCount }));
    setIsProcessing(false);
  };

  const handleSaveLogs = useCallback(() => {
    if (logs.length === 0) return;
    const logText = logs
      .map(l => `[${l.timestamp.toISOString()}] [${l.type.toUpperCase()}] ${l.fileName ? l.fileName + ': ' : ''}${l.message}`)
      .join('\n');
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `log_abdfn_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [logs]);

  return (
    <main className={styles.main} role="main">
      <header className={styles.header}>
        <div className={styles.headerMain}>
          <div className={styles.logo}>
            <ShieldIcon size={48} className={styles.logoIcon} aria-hidden="true" />
            <div className={styles.logoText}>
              <h1>{t('ui.title')}</h1>
              <span>{t('ui.subtitle')}</span>
            </div>
          </div>
          <div className={styles.headerControls}>
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <div className={styles.contentGrid}>
        <section className={styles.leftCol}>
          <FileProcessor
            onProcess={handleProcess}
            isProcessing={isProcessing}
            clearOnFinish={!batchMode}
          />
        </section>

        <section className={styles.rightCol}>
          <SettingsPanel
            password={password}
            setPassword={setPassword}
            batchMode={batchMode}
            setBatchMode={setBatchMode}
            outputSuffix={outputSuffix}
            setOutputSuffix={setOutputSuffix}
          />
          <LogConsole
            logs={logs}
            onClear={() => setLogs([])}
            onSave={handleSaveLogs}
          />
        </section>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2026 ABD-IA Systems. Funciona 100% Offline. Ni sus datos ni sus archivos salen nunca de su navegador.</p>
      </footer>
    </main>
  );
}
