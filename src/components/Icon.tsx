const O = 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0';
const P: Record<string, string> = {
  book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  chart: 'M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3',
  gear: 'M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2',
  doc: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7',
  cal: 'M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3 10h18M8 3v4M16 3v4',
  todo: O, prog: `${O}M12 7v5l3 2`, done: `${O}M8 12.5l3 3 5-6`,
  flag: 'M5 21V4M5 4h12l-2 4 2 4H5', trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  edit: 'M4 20h4L19 9l-4-4L4 16z', plus: 'M12 5v14M5 12h14', next: 'M9 6l6 6-6 6',
  undo: 'M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3', help: 'M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12zM10 9.5a2 2 0 1 1 3 1.7c-.6.4-1 .8-1 1.5M12 16h.01',
  warn: 'M12 3L2 20h20zM12 10v4M12 17h.01', info: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM12 11v6M12 7h.01', x: 'M6 6l12 12M18 6L6 18',
};
/** Minimal 16px (Step 11: ikon harus tetap dikenali pada ukuran kecil). */
export function Icon({ n, size = 20 }: { n: string; size?: number }) {
  const px = Math.max(size, 16);
  return <svg className="ic" width={px} height={px} viewBox="0 0 24 24" aria-hidden="true"><path d={P[n]} /></svg>;
}
