with open('js/script.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(350, 450):
    print(f"{i+1}: {lines[i]}", end='')
