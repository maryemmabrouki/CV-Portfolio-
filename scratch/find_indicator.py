with open('js/script.js', 'r', encoding='utf-8') as f:
    js = f.readlines()
for i, l in enumerate(js):
    if any(k in l for k in ['indicator', 'nav-pill', 'active-pill', 'IntersectionObserver']):
        print(f"js/script.js line {i+1}: {l.strip()[:100]}")

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.readlines()
for i, l in enumerate(css):
    if any(k in l for k in ['indicator', 'nav-pill']):
        print(f"css/style.css line {i+1}: {l.strip()[:100]}")

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.readlines()
for i, l in enumerate(html):
    if any(k in l for k in ['indicator', 'nav-pill']):
        print(f"index.html line {i+1}: {l.strip()[:100]}")
