import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from products.models import Product

images = {
    "Petit Marseillais Lait Corps": ["https://images.notino.fr/photos/le-petit-marseillais-lait-corps-nutrition-karite-400-ml.jpg"],
    "Eucerin Lait Corps":           ["https://images.notino.fr/photos/eucerin-urearepair-original-lotion-10-urea-250ml.jpg"],
    "Garnier Charbon Noir":         ["https://images.notino.fr/photos/garnier-skin-active-masque-purifiant-charbon-noir.jpg"],
    "Mixa Lait Corps":              ["https://images.notino.fr/photos/mixa-lait-corps-hydratant-raffermissant-400ml.jpg"],
    "Mixa Niacinamide":             ["https://images.notino.fr/photos/mixa-niacinamide-400ml.jpg"],
    "Mixa Cica":                    ["https://images.notino.fr/photos/mixa-cica-400ml.jpg"],
    "Dove Gommage Corps":           ["https://images.notino.fr/photos/dove-exfoliating-body-scrub-225ml.jpg"],
    "Vaseline":                     ["https://images.notino.fr/photos/vaseline-intensive-care-cocoa-radiant-body-lotion-400ml.jpg"],
    "Neutrogena":                   ["https://images.notino.fr/photos/neutrogena-norwegian-formula-deep-moisture-body-lotion-400ml.jpg"],
    "Cetaphil":                     ["https://images.notino.fr/photos/cetaphil-moisturising-lotion-1000ml.jpg"],
    "Topicrem DA":                  ["https://images.notino.fr/photos/topicrem-da-lait-corps-400ml.jpg"],
    "Topicrem Ultra":               ["https://images.notino.fr/photos/topicrem-ultra-moisturising-milk-400ml.jpg"],
    "Cerave":                       ["https://images.notino.fr/photos/cerave-moisturising-lotion-473ml.jpg"],
    "Cerave Facial J/N":            ["https://images.notino.fr/photos/cerave-facial-moisturising-lotion-52ml.jpg"],
    "Olay":                         ["https://images.notino.fr/photos/olay-body-lotion-400ml.jpg"],
    "Diadermine":                   ["https://images.notino.fr/photos/diadermine-lift-super-creme-jour-50ml.jpg"],
    "The Ordinary":                 ["https://images.notino.fr/photos/the-ordinary-natural-moisturising-factors-ha-30ml.jpg"],
    "Nubiance":                     ["https://images.notino.fr/photos/nubiance-serum-eclat-30ml.jpg"],
    "Aroma Zone":                   ["https://images.notino.fr/photos/aroma-zone-huile-vegetale-jojoba-100ml.jpg"],
    "Garnier Ultra Doux":           ["https://images.notino.fr/photos/garnier-ultra-doux-masque-nourrissant-300ml.jpg"],
}

updated = 0
for name, urls in images.items():
    try:
        product = Product.objects.get(name=name)
        product.images = urls
        product.save()
        updated += 1
        print(f"✅ {name}")
    except Product.DoesNotExist:
        print(f"❌ Non trouvé : {name}")

print(f"\n✅ {updated} produits mis à jour !")