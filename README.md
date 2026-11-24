# TugasKu — Proyek IMK (UI Design Process Step 1–12)

Next.js 14 (App Router) + TypeScript. Tanpa library UI/state tambahan.

## Menjalankan
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Struktur (Clean Architecture ringan)
```
src/domain/       aturan bisnis murni (Task, Factory, validasi, Specification, ports)
src/application/  Command, Strategy, EventBus (Observer), TaskService (Facade+Memento), container (DI)
src/infra/        Repository (LocalStorage / Memory)
src/components/   UI (Shell, TaskBoard, TaskForm, Modal, Icon, Providers)
src/app/          halaman: / , /statistik, /pengaturan, /panduan
```
Penelusuran Step 1–12 dan peta SOLID/pattern ada di halaman **/panduan**.

## Mengganti penyimpanan
Buat kelas baru yang `implements TaskRepository` (mis. memanggil API Route/DB), lalu berikan ke `createContainer(repo)` — tidak ada kode lain yang berubah (OCP/DIP).
