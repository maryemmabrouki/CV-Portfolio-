import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print('=== 1. TEST DES CARTES PROJETS ET FILTRES ===')
cards = re.findall(r'<article class="[^"]*project-card[^"]*"[^>]*data-category="([^"]+)"[^>]*id="([^"]+)"', html)
print(f'Projets trouves : {len(cards)}/7')
counts = {'all': len(cards), 'ia': 0, 'fullstack': 0, 'data': 0, 'algo': 0}
for cats, pid in cards:
    if 'ia' in cats: counts['ia'] += 1
    if 'fullstack' in cats: counts['fullstack'] += 1
    if 'data' in cats: counts['data'] += 1
    if 'algo' in cats: counts['algo'] += 1
    print(f'  - {pid} : {cats}')

print('Decompte calcule :', counts)
assert counts['all'] == 7, f'Attendu 7 projets, trouve {counts["all"]}'
assert counts['ia'] == 2, f'Attendu 2 IA, trouve {counts["ia"]}'
assert counts['fullstack'] == 5, f'Attendu 5 Full-Stack, trouve {counts["fullstack"]}'
assert counts['data'] == 1, f'Attendu 1 Data, trouve {counts["data"]}'
assert counts['algo'] == 1, f'Attendu 1 Algo, trouve {counts["algo"]}'
print('Validation filtres FLIP : SUCCES')

print('\n=== 2. TEST DES 7 TIROIRS ET STEPPERS ===')
drawers = re.findall(r'class="proj-expand-btn"[^>]*aria-controls="([^"]+)"', html)
assert len(drawers) == 7, f'Attendu 7 boutons d\'expansion, trouve {len(drawers)}'
for d in drawers:
    assert f'id="{d}"' in html, f'Tiroir manquant : {d}'
print('Validation des 7 tiroirs (drawers) : SUCCES')

steppers = re.findall(r'class="proj-stepper"[^>]*data-total-steps="(\d+)"', html)
assert len(steppers) == 7, f'Attendu 7 steppers, trouve {len(steppers)}'
print(f'Validation des 7 steppers ({len(steppers)}/7) : SUCCES')

print('\n=== 3. TEST DES WIDGETS INTERACTIFS ===')
widgets = [
    'hashKeyInput', 'hashFeedbackMsg', 'rendezySlotFeedback',
    'skillSearch', 'skillsGrid', 'skillEmptyState', 'searchFeedback',
    'toastBox', 'contactForm', 'cName', 'cEmail', 'cSubject', 'cMsg',
    'themeToggle', 'navToggle', 'navLinks', 'siteNav', 'readingProgressBar',
    'floatingTopBtn', 'heroRoleTrack', 'heroPhotoWrap', 'heroBgCanvas',
    'metricsStrip'
]
for w in widgets:
    assert f'id="{w}"' in html, f'Widget DOM ID manquant : {w}'
print(f'Validation des 23 IDs interactifs : SUCCES ({len(widgets)}/23)')

print('\n=== 4. TEST DES VALEURS DU HERO ===')
hero_metric = re.search(r'data-target="177"\s+data-suffix=" Patients">177 Patients</div>', html)
assert hero_metric is not None, 'Compteur 177 Patients introuvable dans le Hero'
assert "Données anonymisées de 177 patients du CHU" in html, 'Description 177 patients CHU introuvable'
print('Validation de la metrique 177 Patients : SUCCES')

print('\n=== 5. TEST DE LA STRUCTURE ET BALISES HTML ===')
from html.parser import HTMLParser
class HTMLCheck(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []
        self.void_tags = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
    def handle_starttag(self, tag, attrs):
        if tag.lower() not in self.void_tags:
            self.stack.append((tag.lower(), self.getpos()))
    def handle_endtag(self, tag):
        tag = tag.lower()
        if tag in self.void_tags:
            return
        if not self.stack:
            self.errors.append(f'Closing tag </{tag}> without opener at line {self.getpos()[0]}')
            return
        last, pos = self.stack.pop()
        if last != tag:
            self.errors.append(f'Tag mismatch </{tag}> line {self.getpos()[0]} (opened <{last}> line {pos[0]})')

chk = HTMLCheck()
chk.feed(html)
assert len(chk.errors) == 0, f'Erreurs HTML : {chk.errors}'
assert len(chk.stack) == 0, f'Balises non fermees : {chk.stack}'
print('Validation de la structure HTML : SUCCES (0 erreur, 0 balise orpheline)')

print('\nTOUS LES TESTS FONCTIONNELS SONT VALIDES AVEC SUCCES !')
