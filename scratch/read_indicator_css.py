with open('css/style.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(418, 445):
    print(f"{i+1}: {lines[i]}", end='')
