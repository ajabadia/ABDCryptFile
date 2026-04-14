'use client';

import React, { useState, useCallback } from 'react';
import { FolderIcon, ArrowUpIcon, ArrowDownIcon, CloseIcon, EyeIcon, LockIcon } from '@/components/common/Icons';
import styles from './FileProcessor.module.css';

interface SelectedFile {
  file: File;
  id: string;
}

interface FileProcessorProps {
  onProcess: (files: File[], mode: 'encrypt' | 'decrypt') => void;
  isProcessing: boolean;
  clearOnFinish: boolean;
}

const FileProcessor: React.FC<FileProcessorProps> = ({ 
  onProcess, 
  isProcessing,
  clearOnFinish
}) => {
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileList = Array.from(newFiles);
    setFiles(prev => {
      // Avoid duplicates by name + size
      const uniqueNewFiles = fileList.filter(nf => 
        !prev.some(p => p.file.name === nf.name && p.file.size === nf.size)
      ).map(f => ({ file: f, id: Math.random().toString(36).substr(2, 9) }));
      
      return [...prev, ...uniqueNewFiles];
    });
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      addFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const clearFiles = () => setFiles([]);

  const sortFiles = (asc: boolean) => {
    setFiles(prev => {
      const sorted = [...prev].sort((a, b) => 
        asc ? a.file.name.localeCompare(b.file.name) : b.file.name.localeCompare(a.file.name)
      );
      return sorted;
    });
  };

  return (
    <div className={`glass ${styles.container}`}>
      <div 
        className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className={styles.dropZoneContent}>
          <FolderIcon size={48} className={styles.icon} />
          <p>Arrastra archivos aquí o haz clic para seleccionar</p>
        </div>
        <input 
          type="file" 
          multiple 
          className={styles.fileInput} 
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
      </div>

      <div className={styles.listHeader}>
        <div className={styles.listStats}>
          {files.length} archivos seleccionados
        </div>
        <div className={styles.listActions}>
          <button onClick={() => sortFiles(true)} title="Ordenar A-Z">
            <ArrowUpIcon size={16} />
          </button>
          <button onClick={() => sortFiles(false)} title="Ordenar Z-A">
            <ArrowDownIcon size={16} />
          </button>
          <button onClick={clearFiles} className={styles.dangerText}>Limpiar lista</button>
        </div>
      </div>

      <div className={styles.fileList}>
        {files.length === 0 ? (
          <div className={styles.emptyList}>La lista está vacía</div>
        ) : (
          files.map(({ file, id }) => (
            <div key={id} className={styles.fileItem}>
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB</span>
              <button onClick={() => removeFile(id)} className={styles.removeBtn}>
                <CloseIcon size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className={styles.mainActions}>
        <button 
          className={`${styles.btn} ${styles.btnEncrypt}`}
          disabled={files.length === 0 || isProcessing}
          onClick={() => {
            onProcess(files.map(f => f.file), 'encrypt');
            if (clearOnFinish) setFiles([]);
          }}
        >
          {isProcessing ? 'Procesando...' : 'Encriptar Todo'}
        </button>
        <button 
          className={`${styles.btn} ${styles.btnDecrypt}`}
          disabled={files.length === 0 || isProcessing}
          onClick={() => {
            onProcess(files.map(f => f.file), 'decrypt');
            if (clearOnFinish) setFiles([]);
          }}
        >
          {isProcessing ? 'Procesando...' : 'Desencriptar Todo'}
        </button>
      </div>
    </div>
  );
};

export default FileProcessor;
