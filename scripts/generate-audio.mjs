/**
 * Generates a gentle ambient harp-style loop for the birthday page.
 * Pure Node — no external dependencies. Output: public/audio/birthday-loop.wav
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SAMPLE_RATE = 22050;
const SECONDS = 32;
const CHANNELS = 1;
const BITS = 16;
const TOTAL = SAMPLE_RATE * SECONDS;

const buf = new Float32Array(TOTAL);

const N = {
  A3: 220.0,
  B3: 246.94,
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F3: 174.61,
  G3: 196.0,
  G4: 392.0,
};

const CHORD_CYCLE = [
  { bass: N.C4, chord: [N.C4, N.E4, N.G4, N.C4 + 261.63] }, // Cmaj7
  { bass: N.A3, chord: [N.A3, N.C4, N.E4, N.G4] }, // Am7
  { bass: N.F3, chord: [N.F3, N.A3, N.C4, N.E4] }, // Fmaj7
  { bass: N.G3, chord: [N.G3, N.B3, N.D4, N.G4] }, // G
];

const STEP = 1.0;
const CHORD_LEN = STEP * 8;

const PATTERN = [0, 1, 2, 3, 2, 1, 3, 2];

function addPluck(start, freq, amp) {
  const startIdx = Math.floor(start * SAMPLE_RATE);
  const len = Math.floor(3.6 * SAMPLE_RATE);
  const decay = 1.7;
  for (let i = 0; i < len; i++) {
    const idx = startIdx + i;
    if (idx >= TOTAL) break;
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * decay) * Math.min(1, t / 0.012);
    const wave =
      Math.sin(2 * Math.PI * freq * t) +
      0.3 * Math.sin(2 * Math.PI * freq * 2 * t);
    buf[idx] += amp * env * wave;
  }
}

function addPad(start, freq, amp) {
  const startIdx = Math.floor(start * SAMPLE_RATE);
  const len = Math.floor(CHORD_LEN * SAMPLE_RATE);
  const attack = 0.9;
  const release = 1.4;
  for (let i = 0; i < len; i++) {
    const idx = startIdx + i;
    if (idx >= TOTAL) break;
    const t = i / SAMPLE_RATE;
    let env = amp;
    if (t < attack) env *= t / attack;
    if (t > CHORD_LEN - release) env *= (CHORD_LEN - t) / release;
    const wobble = 0.05 * Math.sin(2 * Math.PI * 0.4 * t);
    const wave =
      Math.sin(2 * Math.PI * freq * (1 + wobble) * t) +
      0.25 * Math.sin(2 * Math.PI * freq * 2 * t);
    buf[idx] += env * wave;
  }
}

let cursor = 0;
let chordIndex = 0;
while (cursor < SECONDS) {
  const { bass, chord } = CHORD_CYCLE[chordIndex % CHORD_CYCLE.length];
  addPad(cursor, bass, 0.11);
  for (let step = 0; step < 8; step++) {
    const note = chord[PATTERN[step] % chord.length];
    addPluck(cursor + step * STEP, note, 0.17);
  }
  if (chordIndex % 2 === 1) {
    addPluck(cursor + 4 * STEP, chord[3] * 2, 0.06);
  }
  cursor += CHORD_LEN;
  chordIndex += 1;
}

let peak = 0;
for (let i = 0; i < TOTAL; i++) {
  const v = Math.abs(buf[i]);
  if (v > peak) peak = v;
}
const gain = peak > 0 ? 0.82 / peak : 1;
for (let i = 0; i < TOTAL; i++) {
  buf[i] *= gain;
}

function writeWav(filePath, data) {
  const samples = new Int16Array(data.length);
  for (let i = 0; i < data.length; i++) {
    const v = Math.max(-1, Math.min(1, data[i]));
    samples[i] = Math.round(v * 0x7fff);
  }
  const buffer = Buffer.alloc(44 + samples.length * 2);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + samples.length * 2, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(CHANNELS, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE((SAMPLE_RATE * CHANNELS * BITS) / 8, 28);
  buffer.writeUInt16LE((CHANNELS * BITS) / 8, 32);
  buffer.writeUInt16LE(BITS, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(samples.length * 2, 40);
  Buffer.from(samples.buffer).copy(buffer, 44);
  writeFileSync(filePath, buffer);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "audio");
const outFile = join(outDir, "birthday-loop.wav");
mkdirSync(outDir, { recursive: true });
writeWav(outFile, buf);

console.log(`Generated ${outFile}`);
console.log(
  `  ${SECONDS}s @ ${SAMPLE_RATE}Hz, ${(44 + buf.length * 2).toLocaleString()} bytes`,
);
