with open('index.html', 'r', encoding='utf-8') as f:
    html = f.readlines()
for i, l in enumerate(html):
    if 'brand-mark' in l:
        print(f"index.html line {i+1}: {l.strip()}")

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.readlines()
for i, l in enumerate(css):
    if 'brand-mark' in l:
        print(f"css/style.css line {i+1}: {l.strip()}")

with open('js/script.js', 'r', encoding='utf-8') as f:
    js = f.readlines()
for i, l in enumerate(js):
    if 'brand-mark' in l:
        print(f"js/script.js line {i+1}: {l.strip()}")
