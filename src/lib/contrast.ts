/** Rasio kontras WCAG 2.x. Dipakai untuk audit warna di halaman Panduan (Step 12). */
const lin = (c: number) => { const v = c / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = (h: string) => { const n = parseInt(h.slice(1), 16); return 0.2126 * lin(n >> 16) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255); };
export const ratio = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

export interface Pair { theme: string; name: string; fg: string; bg: string; min: 3 | 4.5 }
/** Nilai disalin dari globals.css; perbarui keduanya bersamaan. */
export const PAIRS: Pair[] = [
  { theme: 'Terang', name: 'Teks utama / kartu', fg: '#16192B', bg: '#FFFFFF', min: 4.5 },
  { theme: 'Terang', name: 'Teks sekunder / kartu', fg: '#566074', bg: '#FFFFFF', min: 4.5 },
  { theme: 'Terang', name: 'Tombol utama (teks putih / biru)', fg: '#FFFFFF', bg: '#2F5FD0', min: 4.5 },
  { theme: 'Terang', name: 'Tombol utama (teks putih / indigo)', fg: '#FFFFFF', bg: '#3D4FC7', min: 4.5 },
  { theme: 'Terang', name: 'Lencana Belum', fg: '#3A4254', bg: '#ECEFF5', min: 4.5 },
  { theme: 'Terang', name: 'Lencana Dikerjakan', fg: '#7A4E00', bg: '#FFF1CF', min: 4.5 },
  { theme: 'Terang', name: 'Lencana Selesai', fg: '#14612F', bg: '#DEF4E6', min: 4.5 },
  { theme: 'Terang', name: 'Label terlambat / prioritas tinggi', fg: '#B42334', bg: '#FDE7EA', min: 4.5 },
  { theme: 'Terang', name: 'Teks banner / biru tua', fg: '#FFFFFF', bg: '#2447A0', min: 4.5 },
  { theme: 'Terang', name: 'Teks banner / biru terang', fg: '#FFFFFF', bg: '#3560C9', min: 4.5 },
  { theme: 'Terang', name: 'Garis kolom isian / kartu', fg: '#8790A6', bg: '#FFFFFF', min: 3 },
  { theme: 'Gelap', name: 'Teks utama / kartu', fg: '#EEF1F8', bg: '#161B2C', min: 4.5 },
  { theme: 'Gelap', name: 'Teks sekunder / kartu', fg: '#AEB7CC', bg: '#161B2C', min: 4.5 },
  { theme: 'Gelap', name: 'Tombol utama', fg: '#0E1624', bg: '#8DB4FF', min: 4.5 },
  { theme: 'Gelap', name: 'Lencana Dikerjakan', fg: '#FFD98A', bg: '#43350F', min: 4.5 },
  { theme: 'Gelap', name: 'Lencana Selesai', fg: '#8FE0AC', bg: '#16372A', min: 4.5 },
  { theme: 'Gelap', name: 'Label terlambat / prioritas tinggi', fg: '#FF9AA5', bg: '#3F1B22', min: 4.5 },
  { theme: 'Gelap', name: 'Garis kolom isian / kartu', fg: '#6E7899', bg: '#161B2C', min: 3 },
  { theme: 'Kontras tinggi', name: 'Teks / latar', fg: '#FFFFFF', bg: '#000000', min: 4.5 },
  { theme: 'Kontras tinggi', name: 'Aksen kuning / latar', fg: '#FFEB3B', bg: '#000000', min: 4.5 },
  { theme: 'Kontras tinggi', name: 'Status Selesai / latar', fg: '#7CFC9A', bg: '#000000', min: 4.5 },
];
