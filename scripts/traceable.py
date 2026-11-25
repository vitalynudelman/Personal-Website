"""Every Experience claim must appear in the resume text (ISC-30)."""
import pathlib, re, sys

norm = lambda t: re.sub(
    r'\s+', ' ',
    t.replace('’', "'").replace('—', '-').replace('–', '-'),
).strip().lower()

resume = norm(pathlib.Path('.harness/resume.txt').read_text())
src = pathlib.Path('src/content/experience.ts').read_text()

fields = re.findall(r"(?:title|company|period):\s*'([^']+)'", src)
bullets = re.findall(r"^      ['\"](.+?)['\"],$", src, re.M)
claims = fields + bullets

missing = [c for c in claims if norm(c) not in resume]
for c in missing:
    print(f'  NOT IN RESUME: {c[:90]}')

print(f'{"PASS" if not missing else "FAIL"}: {len(claims) - len(missing)}/{len(claims)} '
      'Experience claims trace to the resume')
sys.exit(0 if not missing else 1)
