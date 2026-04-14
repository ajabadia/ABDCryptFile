import type { Metadata } from 'next';
import { Space_Mono, Roboto_Mono } from 'next/font/google';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import './globals.css';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto-mono',
});

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
      <body className={`${spaceMono.variable} ${robotoMono.variable}`}>
        <LanguageProvider initialLang="es">
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
