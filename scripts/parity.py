"""Compare the server-rendered page content against .harness/baseline.txt."""
import html, pathlib, re, sys

rendered = pathlib.Path('.harness/rendered.html').read_text()
baseline = [l.split('\t') for l in pathlib.Path('.harness/baseline.txt').read_text().splitlines() if l]

HEADINGS = {
    'Skills': 'Skills &amp; Technologies',
    'Certifications': 'Professional Certifications',
    'Projects': 'My Projects',
}
starts = sorted(((rendered.find(h), k) for k, h in HEADINGS.items()))
if starts[0][0] == -1:
    print('FAIL: a section heading is missing from the render')
    sys.exit(1)

bounds = {}
for n, (start, kind) in enumerate(starts):
    bounds[kind] = (start, starts[n + 1][0] if n + 1 < len(starts) else len(rendered))

ok = True
for kind in HEADINGS:
    start, end = bounds[kind]
    chunk = html.unescape(re.sub(r'<[^>]+>', '\x00', rendered[start:end]))
    want = [n for k, n in baseline if k == kind]
    missing = [n for n in want if chunk.find(n) == -1]
    got = sorted((n for n in want if n not in missing), key=chunk.find)
    good = not missing and got == want
    ok &= good
    print(f'{"PASS" if good else "FAIL"}: {kind} {len(want)} items'
          + (f' missing={missing}' if missing else '')
          + (f' order={got}' if got != want else ' in original order'))

sys.exit(0 if ok else 1)
