/** Step 9: nada tunggal 700 Hz (rentang 500-1000 Hz), pendek, volume dapat diatur; selalu dipasangkan dengan umpan balik visual. */
let ctx: AudioContext | undefined;
export function beep(volume: number) {
  try {
    ctx ??= new AudioContext();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = 700; g.gain.value = volume / 1000;
    o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.12);
  } catch { /* audio tidak tersedia */ }
}
