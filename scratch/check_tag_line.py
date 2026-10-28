with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(705, 722):
    print(f"{i+1}: {repr(lines[i])}")
