import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from products.models import Category, Product

soins = Category.objects.get(slug='soins-corps')

produits = [
    {"name": "Sérum Visage",           "brand": "Générique",          "price": 9.90,  "desc": "Sérum hydratant visage"},
    {"name": "La Crème Visage",        "brand": "Générique",          "price": 7.90,  "desc": "Crème hydratante visage"},
    {"name": "Le Gommage",             "brand": "Générique",          "price": 5.90,  "desc": "Gommage corps doux"},
    {"name": "BeoVitamines",           "brand": "BeoVitamines",       "price": 12.90, "desc": "Vitamines pour la peau"},
    {"name": "Brumes Corps",           "brand": "Générique",          "price": 7.50,  "desc": "Brume hydratante corps"},
    {"name": "Mixa Lait Corps",        "brand": "Mixa",               "price": 6.50,  "desc": "Lait corps hydratant Mixa"},
    {"name": "Mixa Niacinamide",       "brand": "Mixa",               "price": 8.90,  "desc": "Soin niacinamide Mixa"},
    {"name": "Mixa Cica",              "brand": "Mixa",               "price": 7.90,  "desc": "Soin cica réparateur Mixa"},
    {"name": "Huile Anti-Vergetures",  "brand": "Générique",          "price": 9.90,  "desc": "Huile anti-vergetures"},
    {"name": "Garnier Ultra Doux",     "brand": "Garnier",            "price": 4.90,  "desc": "Soin ultra doux Garnier"},
    {"name": "Topicrem DA",            "brand": "Topicrem",           "price": 11.90, "desc": "Crème Topicrem DA"},
    {"name": "Topicrem Ultra",         "brand": "Topicrem",           "price": 8.90,  "desc": "Crème ultra Topicrem"},
    {"name": "Dove Gommage Corps",     "brand": "Dove",               "price": 6.90,  "desc": "Gommage corps Dove"},
    {"name": "Oxyprolane",             "brand": "Oxyprolane",         "price": 14.90, "desc": "Soin oxyprolane"},
    {"name": "Amlactin",               "brand": "Amlactin",           "price": 12.90, "desc": "Lotion hydratante Amlactin"},
    {"name": "Dexeryl Huile Lavante",  "brand": "Dexeryl",            "price": 9.90,  "desc": "Huile lavante Dexeryl"},
    {"name": "Cerave Facial J/N",      "brand": "Cerave",             "price": 13.90, "desc": "Crème visage Cerave"},
    {"name": "SVR",                    "brand": "SVR",                "price": 9.90,  "desc": "Soin SVR"},
    {"name": "Medicube",               "brand": "Medicube",           "price": 12.90, "desc": "Soin coréen Medicube"},
    {"name": "Cosrx",                  "brand": "Cosrx",              "price": 10.90, "desc": "Soin coréen Cosrx"},
    {"name": "Arko Collagène",         "brand": "Arko",               "price": 19.90, "desc": "Crème collagène Arko"},
    {"name": "The Ordinary",           "brand": "The Ordinary",       "price": 8.90,  "desc": "Soin The Ordinary"},
    {"name": "Nubiance",               "brand": "Nubiance",           "price": 19.90, "desc": "Soin Nubiance"},
    {"name": "Nuhanciam",              "brand": "Nuhanciam",          "price": 22.90, "desc": "Soin Nuhanciam"},
    {"name": "Medix 5.5",              "brand": "Medix",              "price": 11.90, "desc": "Soin Medix 5.5"},
    {"name": "Cetaphil",               "brand": "Cetaphil",           "price": 9.90,  "desc": "Crème Cetaphil"},
    {"name": "Olay",                   "brand": "Olay",               "price": 11.90, "desc": "Soin Olay"},
    {"name": "Super Sérum",            "brand": "Générique",          "price": 10.90, "desc": "Super sérum éclat"},
    {"name": "Aroma Zone",             "brand": "Aroma Zone",         "price": 6.90,  "desc": "Soin naturel Aroma Zone"},
    {"name": "Anua 70+",               "brand": "Anua",               "price": 13.90, "desc": "Soin Anua 70+"},
    {"name": "Vaseline",               "brand": "Vaseline",           "price": 4.90,  "desc": "Vaseline hydratante"},
    {"name": "Bébé Cadum",             "brand": "Cadum",              "price": 4.90,  "desc": "Soin Bébé Cadum"},
    {"name": "Dr Tealo",               "brand": "Dr Tealo",           "price": 8.90,  "desc": "Soin Dr Tealo"},
    {"name": "Crème Dépilatoire",      "brand": "Générique",          "price": 3.90,  "desc": "Crème dépilatoire"},
    {"name": "Neutrogena",             "brand": "Neutrogena",         "price": 8.90,  "desc": "Soin Neutrogena"},
    {"name": "Skin by Zanon",          "brand": "Zanon",              "price": 10.90, "desc": "Soin Skin by Zanon"},
    {"name": "Gel de Douche",          "brand": "Générique",          "price": 9.90,  "desc": "Gel de douche"},
    {"name": "Advanced Korean",        "brand": "Advanced Korean",    "price": 12.90, "desc": "Soin coréen"},
    {"name": "Cerave",                 "brand": "Cerave",             "price": 10.90, "desc": "Soin Cerave"},
    {"name": "Advanced Clinicals",     "brand": "Advanced Clinicals", "price": 12.90, "desc": "Soin Advanced Clinicals"},
    {"name": "Diadermine",             "brand": "Diadermine",         "price": 4.90,  "desc": "Soin visage Diadermine"},
]

created = 0
for p in produits:
    obj, created_bool = Product.objects.get_or_create(
        name=p["name"],
        defaults={
            "brand":       p["brand"],
            "price_eur":   p["price"],
            "description": p["desc"],
            "stock":       50,
            "category":    soins,
            "is_active":   True,
            "images":      [],
        }
    )
    if created_bool:
        created += 1
        print(f"✅ {p['name']}")
    else:
        print(f"⏭ Déjà existant : {p['name']}")

print(f"\n✅ {created} produits ajoutés !")