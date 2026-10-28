import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

srcs = re.findall(r'src=["\']([^"\']+)["\']', html)
hrefs = re.findall(r'href=["\']([^"\']+)["\']', html)
ids = set(re.findall(r'id=["\']([^"\']+)["\']', html))

print('=== CHECKING SRCS ===')
for src in srcs:
    if src.startswith('http') or src.startswith('//') or src.startswith('data:'):
        continue
    exists = os.path.exists(src)
    print(f'Src: {src} -> exists: {exists}')

print('\n=== CHECKING INTERNAL ANCHORS ===')
missing_anchors = 0
for href in set(hrefs):
    if href.startswith('#'):
        target = href[1:]
        if target and target not in ids:
            print(f'Anchor: {href} -> missing ID: {target}')
            missing_anchors += 1

if missing_anchors == 0:
    print('All internal anchor links are valid!')

print('\n=== CHECKING LOCAL FILE HREFS ===')
for href in set(hrefs):
    if not href.startswith('http') and not href.startswith('#') and not href.startswith('mailto:') and not href.startswith('tel:') and not href.startswith('data:'):
        exists = os.path.exists(href)
        print(f'Href: {href} -> exists: {exists}')

