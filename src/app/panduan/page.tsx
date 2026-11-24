import { PAIRS, ratio } from '@/lib/contrast';

const steps = [
  ['1', 'Know your user', 'Persona “Rina”; Mode Pemula/Ahli', 'app/panduan, Settings.mode'],
  ['2', 'Business function & task analysis', 'HTA kelola tugas; domain terpisah', 'src/domain/*'],
  ['3', 'Prinsip desain (consistency, simplicity, context)', 'Label seragam lewat dictionary; semua aksi dapat diurungkan (Memento)', 'application/taskService.ts'],
  ['4', 'Menu & navigasi', 'Sidebar 4 menu satu level, aria-current, breadcrumb, pintasan keyboard', 'components/Shell.tsx'],
  ['5–6', 'Window & perangkat interaksi', 'Primary window, modal dialog, status bar; mouse/keyboard/sentuh ≥44px', 'components/Modal.tsx'],
  ['7', 'Kontrol layar', 'Caption, radio, tombol Simpan nonaktif sampai valid', 'components/TaskForm.tsx'],
  ['8', 'Teks & pesan jelas', 'Pesan galat spesifik; kotak konfirmasi berikon', 'i18n/dictionary.ts'],
  ['9', 'Umpan balik & bantuan', 'Status bar, toast + Undo, bunyi 700 Hz opsional, bantuan', 'lib/sound.ts, Providers.tsx'],
  ['10', 'Internasionalisasi & aksesibilitas', 'ID/EN, Intl date, kontras tinggi, ukuran teks, ringkasan teks', 'i18n/, pengaturan/'],
  ['11', 'Grafik & ikon', 'Ikon SVG satu gaya, ukuran minimal 16px, selalu dengan teks; ikon info/bantuan dibedakan dari ikon status; cincin & bar punya padanan teks', 'components/Icon.tsx'],
  ['12', 'Warna', 'Warna dipakai untuk status, prioritas, aksi utama; selalu disertai ikon+teks; audit kontras; simulasi buta warna; uji hitam-putih; tema gelap & kontras tinggi', 'globals.css, lib/contrast.ts'],
];
const arch = [
  ['S – Single Responsibility', 'Domain, service, repository, UI dipisah; Shell hanya layout', 'domain/, application/, infra/'],
  ['O – Open/Closed', 'Aksi baru = kelas Command baru; urutan baru = Strategy baru', 'commands.ts, strategies.ts'],
  ['L – Liskov', 'LocalStorage & Memory repository dapat saling menggantikan', 'infra/repositories.ts'],
  ['I – Interface Segregation', 'TaskReader dan TaskWriter terpisah', 'domain/ports.ts'],
  ['D – Dependency Inversion', 'TaskService bergantung pada TaskRepository, dirakit di container', 'application/container.ts'],
  ['Repository · Factory · Command', 'Akses data · pembuatan Task · aksi sebagai objek', 'infra, domain/task.ts, commands.ts'],
  ['Strategy · Specification', 'Pengurutan · penyaringan yang dapat digabung', 'strategies.ts, specification.ts'],
  ['Observer · Memento · Facade · Singleton', 'EventBus · riwayat Undo · TaskService · getContainer', 'eventBus.ts, taskService.ts, container.ts'],
];
const Table = ({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) => (
  <div className="sc"><table><thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
    <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody></table></div>
);
const sw = (c: string) => <span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: 4, background: c, border: '1px solid #8790A6', verticalAlign: '-2px', marginRight: 6 }} />;

export default function Panduan() {
  const audit = PAIRS.map((p) => {
    const r = ratio(p.fg, p.bg);
    return [p.theme, p.name, <>{sw(p.fg)}{p.fg} / {sw(p.bg)}{p.bg}</>, r.toFixed(2) + ' : 1', `≥ ${p.min}`, r >= p.min ? '✓ Lulus' : '✗ Gagal'];
  });
  const fails = audit.filter((r) => String(r[5]).startsWith('✗')).length;
  return (
    <>
      <h1>Panduan Proyek</h1>
      <div className="card"><h2>Step 1 – Persona</h2>
        <p><b>Rina, 20 tahun</b>, mahasiswi Informatika semester 5, mengelola 6–8 mata kuliah. Tujuan: tidak melewatkan tenggat. Keluhan: catatan tersebar, aplikasi lain terlalu rumit. Kebutuhan: pencatatan cepat (&lt;3 klik), jelas, dapat diurungkan.</p></div>
      <div className="card"><h2>Step 2 – Analisis tugas (HTA)</h2>
        <ul className="tree"><li><b>0. Kelola tugas kuliah</b><ul>
          <li>1. Catat tugas: tekan Tambah → isi nama → pilih tenggat → pilih prioritas → Simpan</li>
          <li>2. Pantau: lihat daftar → cari / filter / urutkan → cek yang terlambat</li>
          <li>3. Perbarui status: tombol status berikutnya</li>
          <li>4. Rapikan: ubah / hapus → Urungkan bila keliru</li></ul></li></ul></div>
      <div className="card"><h2>Penelusuran Step 1–12</h2><Table head={['Step', 'Topik', 'Penerapan', 'Berkas']} rows={steps} /></div>

      <div className="card"><h2>Step 11 – Catatan ikon</h2>
        <ul className="tree"><li>Ikon berbentuk garis sederhana, satu ketebalan, ukuran minimal 16px.</li>
          <li>Ikon benda (kalender, tempat sampah, bendera segitiga) lebih diutamakan; ikon aksi (tambah, berikutnya, urungkan) selalu diberi label teks.</li>
          <li>Status dibedakan oleh bentuk isi (kosong, jam, centang); ikon Info (kotak) dan Bantuan (balon) sengaja tidak berbentuk lingkaran agar berbeda dari ikon status.</li>
          <li>Grafik (cincin progres, bar) punya padanan teks: angka persentase, <code>aria-label</code>, dan ringkasan teks di halaman Statistik.</li></ul></div>

      <div className="card"><h2>Step 12 – Audit kontras warna</h2>
        <p className="hint">Dihitung dengan rumus WCAG 2.x. Teks: minimal 4,5 : 1. Komponen non-teks (garis kolom isian): minimal 3 : 1. {fails === 0 ? 'Semua pasangan warna di bawah lulus.' : `${fails} pasangan gagal; perbaiki warnanya.`}</p>
        <Table head={['Tema', 'Pasangan', 'Warna (depan / belakang)', 'Rasio', 'Minimal', 'Hasil']} rows={audit} />
        <p className="hint">Uji buta warna: Pengaturan → “Simulasi buta warna” (protanopia, deuteranopia, tritanopia). Simulasi bersifat perkiraan; uji dengan pengguna nyata tetap diperlukan.</p></div>

      <div className="card"><h2>Arsitektur: SOLID &amp; Design Pattern</h2><Table head={['Prinsip / Pola', 'Penerapan', 'Berkas']} rows={arch} /></div>
    </>
  );
}
