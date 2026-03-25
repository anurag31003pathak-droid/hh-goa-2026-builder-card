import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'AI Legislative Analyzer | Hackathon Edition',
  description: 'Understand complex laws in simple terms.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Defaulting to Dark Mode for the Premium Cyber/AI Hackathon Vibe
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased text-slate-800 dark:text-slate-100`}>
        <div className="mesh-bg"></div>
        <div className="relative z-0 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
