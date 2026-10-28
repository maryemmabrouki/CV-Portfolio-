with open('index.html', 'r', encoding='utf-8') as f:
    html = f.readlines()

for i in range(2995, 3025):
    print(f"{i+1}: {html[i]}", end='')
