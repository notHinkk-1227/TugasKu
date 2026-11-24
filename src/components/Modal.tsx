'use client';
import { useEffect, useRef } from 'react';
import { Icon } from './Icon';

/** Secondary window bergaya modal (Step 5). Memakai <dialog> native: fokus terkunci & Esc menutup. */
export function Modal({ open, onClose, title, icon, children }: {
  open: boolean; onClose: () => void; title: string; icon?: string; children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current; if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} onClose={onClose} aria-labelledby="mt">
      {open && (<><h2 id="mt">{icon && <Icon n={icon} />}{title}</h2>{children}</>)}
    </dialog>
  );
}
