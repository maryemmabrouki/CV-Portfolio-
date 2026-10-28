with open('css/style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if any(k in l for k in ['projects-filter-bar', 'filter-btn', '.filter-pill']):
        print(f"{i+1}: {l.strip()[:100]}")
