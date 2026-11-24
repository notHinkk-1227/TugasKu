import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Shell } from '@/components/Shell';

export const metadata: Metadata = {
  title: 'TugasKu – Pengelola Tugas Kuliah',
  description: 'Proyek IMK: UI Design Process Step 1–12 dengan Next.js, SOLID, dan design pattern.',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body><Providers><Shell>{children}</Shell></Providers></body>
    </html>
  );
}
