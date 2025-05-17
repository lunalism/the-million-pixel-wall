import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import TopNav from '@/components/TopNav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <TopNav /> {/* 우상단 네비게이션 포함 */}
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
