import os
import django
import io

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.core.management import call_command

buf = io.StringIO()
call_command('dumpdata', 'products.Product', 'products.Category', indent=2, stdout=buf)

with open('products_export.json', 'w', encoding='utf-8') as f:
    f.write(buf.getvalue())

print("Export terminé avec succès en UTF-8.")