const id = {
  navT: 'Tugas', navS: 'Statistik', navP: 'Pengaturan', navD: 'Panduan Proyek', help: 'Bantuan', home: 'Beranda', here: 'Anda di sini', skip: 'Lompat ke konten utama',
  add: 'Tambah tugas', edit: 'Ubah tugas', name: 'Nama tugas', due: 'Tenggat', prio: 'Prioritas', p1: 'Rendah', p2: 'Sedang', p3: 'Tinggi',
  save: 'Simpan', cancel: 'Batal', del: 'Hapus', undo: 'Urungkan', close: 'Tutup', search: 'Cari tugas', all: 'Semua', s1: 'Belum', s2: 'Dikerjakan', s3: 'Selesai', late: 'Terlambat',
  e_name: 'Nama tugas wajib diisi. Ketik minimal 3 huruf.', e_due: 'Pilih tanggal tenggat.', savehint: 'Tombol Simpan aktif setelah nama dan tenggat terisi.',
  saved: 'Tugas disimpan.', changed: 'Status tugas diubah.', deleted: 'Tugas dihapus.', undone: 'Aksi diurungkan.', nothing: 'Tidak ada aksi untuk diurungkan.', ready: 'Siap.',
  empty: 'Belum ada tugas di sini. Tekan “Tambah tugas” untuk mulai.', count: 'tugas ditampilkan', cdel: 'Hapus tugas ini?', cdelt: 'Tugas ini akan dihapus. Anda bisa mengurungkannya.',
  lang: 'Bahasa', theme: 'Tampilan', auto: 'Ikuti perangkat', light: 'Terang', dark: 'Gelap', contrast: 'Kontras tinggi', fs: 'Ukuran teks', mode: 'Mode pengguna', novice: 'Pemula', expert: 'Ahli',
  sound: 'Bunyi notifikasi (selalu disertai tampilan visual)', volume: 'Volume', tdur: 'Lama pesan tampil (detik, 0 = tetap)', bw: 'Uji tampilan hitam-putih',
  reset: 'Setel ulang data', cb: 'Simulasi buta warna (hanya untuk menguji)', cbnone: 'Tidak ada', cbpro: 'Protanopia (merah lemah)', cbdeu: 'Deuteranopia (hijau lemah)', cbtri: 'Tritanopia (biru lemah)', cbnote: 'Simulasi bersifat perkiraan dan tidak menggantikan uji dengan pengguna nyata.', resetq: 'Setel ulang semua data?', resetb: 'Setel ulang', sort: 'Urutkan', sdue: 'Tenggat terdekat', sprio: 'Prioritas tertinggi',
  total: 'Total tugas', done: 'selesai', helpb: 'Daftar tugas diurutkan sesuai pilihan Anda. Tombol panah mengubah status (Belum → Dikerjakan → Selesai). Setiap aksi dapat diurungkan dengan Urungkan atau Ctrl+Z.',
  shorts: 'Pintasan', sum: 'Ringkasan teks',
};
export type Key = keyof typeof id;
const en: Record<Key, string> = {
  navT: 'Tasks', navS: 'Statistics', navP: 'Settings', navD: 'Project Guide', help: 'Help', home: 'Home', here: 'You are here', skip: 'Skip to main content',
  add: 'Add task', edit: 'Edit task', name: 'Task name', due: 'Due date', prio: 'Priority', p1: 'Low', p2: 'Medium', p3: 'High',
  save: 'Save', cancel: 'Cancel', del: 'Delete', undo: 'Undo', close: 'Close', search: 'Search tasks', all: 'All', s1: 'To do', s2: 'In progress', s3: 'Done', late: 'Overdue',
  e_name: 'Task name is required. Type at least 3 letters.', e_due: 'Choose a due date.', savehint: 'Save is enabled once name and due date are filled in.',
  saved: 'Task saved.', changed: 'Task status changed.', deleted: 'Task deleted.', undone: 'Action undone.', nothing: 'Nothing to undo.', ready: 'Ready.',
  empty: 'No tasks here yet. Press “Add task” to start.', count: 'tasks shown', cdel: 'Delete this task?', cdelt: 'This task will be deleted. You can undo it.',
  lang: 'Language', theme: 'Appearance', auto: 'Follow device', light: 'Light', dark: 'Dark', contrast: 'High contrast', fs: 'Text size', mode: 'User mode', novice: 'Beginner', expert: 'Expert',
  sound: 'Notification sound (always paired with a visual cue)', volume: 'Volume', tdur: 'Message display time (seconds, 0 = keep)', bw: 'Test black-and-white view',
  reset: 'Reset data', cb: 'Color-blindness simulation (for testing only)', cbnone: 'None', cbpro: 'Protanopia (weak red)', cbdeu: 'Deuteranopia (weak green)', cbtri: 'Tritanopia (weak blue)', cbnote: 'The simulation is approximate and does not replace testing with real users.', resetq: 'Reset all data?', resetb: 'Reset', sort: 'Sort', sdue: 'Nearest due date', sprio: 'Highest priority',
  total: 'Total tasks', done: 'done', helpb: 'The list is sorted by your choice. The arrow button changes status (To do → In progress → Done). Every action can be undone with Undo or Ctrl+Z.',
  shorts: 'Shortcuts', sum: 'Text summary',
};
export const dict = { id, en };
export type Lang = keyof typeof dict;
