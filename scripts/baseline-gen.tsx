// Writes the intended content set from the content modules.
// The parity check then compares it against what the page actually renders,
// which catches a render path that silently drops or reorders items.
import { skills } from '../src/content/skills';
import { certifications } from '../src/content/certifications';
import { experience } from '../src/content/experience';

const lines = [
  ...experience.map((r) => `Experience\t${r.title}`),
  ...skills.map((s) => `Skills\t${s.name}`),
  ...certifications.map((c) => `Certifications\t${c.name}`),
];
console.log(lines.join('\n'));
