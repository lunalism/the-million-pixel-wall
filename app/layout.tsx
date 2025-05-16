import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <LanguageSelector />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
