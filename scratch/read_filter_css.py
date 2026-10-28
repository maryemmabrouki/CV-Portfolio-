with open('css/style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(1195, 1255):
    print(f"{i+1}: {lines[i]}", end='')
