import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ABDFN Encryptor - Secure Portable Utility',
  description: 'AES-256-GCM Bulk Encryption Tool. All processing happens locally in your browser.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Roboto+Mono:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
