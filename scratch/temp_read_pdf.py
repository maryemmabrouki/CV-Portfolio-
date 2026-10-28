import sys

try:
    import pypdf
    reader = pypdf.PdfReader('assets/CV_Maryem_MABROUKI.pdf')
    for i, page in enumerate(reader.pages):
        print(f"--- PAGE {i+1} ---")
        print(page.extract_text())
except Exception as e:
    print("pypdf error:", e)
    # try strings fallback
    with open('assets/CV_Maryem_MABROUKI.pdf', 'rb') as f:
        bytes_data = f.read()
    import re
    # Extract readable strings
    text = re.findall(b'[a-zA-Z0-9_\\-\\.\xe0-\xff]{4,}', bytes_data)
    print("Found strings count:", len(text))

