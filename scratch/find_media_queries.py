with open('css/style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if '@media' in l:
        print(f"css/style.css line {i+1}: {l.strip()}")
