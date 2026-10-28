with open('index.html', 'r', encoding='utf-8') as f:
    html = f.readlines()

print("--- Header brand mark (line 110-116) ---")
for i in range(109, 116):
    print(f"{i+1}: {html[i]}", end='')

print("\n--- Card reseaux tags (line 695-715) ---")
for i in range(695, 715):
    print(f"{i+1}: {html[i]}", end='')

print("\n--- Footer brand mark (line 2985-2995) ---")
for i in range(2985, 2995):
    print(f"{i+1}: {html[i]}", end='')
