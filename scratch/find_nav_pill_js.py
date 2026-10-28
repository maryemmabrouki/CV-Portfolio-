with open('js/script.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if any(k in l for k in ['navPillIndicator', 'moveIndicator', 'nav-links', 'activeLink', 'updateActive']):
        print(f"js/script.js line {i+1}: {l.strip()[:100]}")
