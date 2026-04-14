'use client';

import React, { useRef, useEffect } from 'react';
import styles from './LogConsole.module.css';

export interface LogEntry {
  id: string;
  timestamp: Date;
  type: 'info' | 'success' | 'error' | 'skip';
  message: string;
  fileName?: string;
}

interface LogConsoleProps {
  logs: LogEntry[];
  onClear: () => void;
  onSave: () => void;
}

const LogConsole: React.FC<LogConsoleProps> = ({ logs, onClear, onSave }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className={`glass ${styles.container}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Operaciones</h2>
        <div className={styles.actions}>
          <button onClick={onSave} className={styles.saveBtn}>F1 GUARDAR</button>
          <button onClick={onClear} className={styles.clearBtn}>F2 LIMPIAR</button>
        </div>
      </div>

      <div className={styles.logArea} ref={scrollRef}>
        {logs.length === 0 ? (
          <div className={styles.empty}>Esperando tareas...</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className={`${styles.logLine} ${styles[log.type]}`}>
              <span className={styles.time}>
                {log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <span className={styles.status}>[{log.type.toUpperCase()}]</span>
              <span className={styles.message}>
                {log.fileName && <strong className={styles.file}>{log.fileName}:</strong>} {log.message}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogConsole;
