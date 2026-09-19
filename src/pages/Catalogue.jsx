import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext.jsx'

const PRODUCTS_URL   = 'http://127.0.0.1:8000/api/products/'
const CATEGORIES_URL = 'http://127.0.0.1:8000/api/products/categories/'
const PRIX_MAX_DEFAUT = 200

export default function Catalogue() {
  const [products, setProducts]     = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [addedId, setAddedId]       = useState(null)

  const [selectedCategory, setSelectedCategory] = useState('')
  const [prixMax, setPrixMax]                   = useState(PRIX_MAX_DEFAUT)
  const [sortOrder, setSortOrder]                = useState('')

  const { addToCart } = useCart()

  // Charge les catégories une seule fois au montage
  useEffect(() => {
    fetch(CATEGORIES_URL)
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : data.results || []))
      .catch(() => setCategories([]))
  }, [])

  // Recharge les produits à chaque changement de filtre
  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (selectedCategory) params.set('category', selectedCategory)
    if (prixMax < PRIX_MAX_DEFAUT) params.set('prix_max', prixMax)
    if (sortOrder) params.set('ordering', sortOrder)

    fetch(`${PRODUCTS_URL}?${params.toString()}`)
      .then(res => {
        if (!res.ok) throw new Error('Erreur ' + res.status)
        return res.json()
      })
      .then(data => {
        setProducts(Array.isArray(data) ? data : data.results || [])
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [selectedCategory, prixMax, sortOrder])

  const handleAdd = (product) => {
    addToCart(product)
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1200)
  }

  const handleCategoryClick = (slug) => {
    // Reclique sur la même catégorie → désélectionne (retour à "Tout")
    setSelectedCategory(prev => (prev === slug ? '' : slug))
  }

  // N'affiche que les catégories racines (sans parent) dans le panneau de filtre,
  // pour garder une liste courte et lisible (Cheveux regroupe Perruques + Soins Capillaires)
  const categoriesRacines = categories.filter(c => !c.parent)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: '100vh' }}>
      {/* FILTRES */}
      <div style={{ borderRight: '1px solid #eee', padding: '20px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '11px', letterSpacing: '1px', marginBottom: '12px' }}>CATÉGORIES</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <input
            type="checkbox"
            checked={selectedCategory === ''}
            onChange={() => setSelectedCategory('')}
          />
          <label style={{ fontSize: '12px', cursor: 'pointer' }} onClick={() => setSelectedCategory('')}>Tout</label>
        </div>

        {categoriesRacines.map(c => (
          <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input
              type="checkbox"
              checked={selectedCategory === c.slug}
              onChange={() => handleCategoryClick(c.slug)}
            />
            <label
              style={{ fontSize: '12px', cursor: 'pointer' }}
              onClick={() => handleCategoryClick(c.slug)}
            >
              {c.name_fr}
            </label>
          </div>
        ))}

        <div style={{ fontWeight: 'bold', fontSize: '11px', letterSpacing: '1px', margin: '16px 0 8px' }}>PRIX</div>
        <input
          type="range"
          min="0"
          max={PRIX_MAX_DEFAUT}
          value={prixMax}
          onChange={e => setPrixMax(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#111' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#888' }}>
          <span>0€</span>
          <span>{prixMax >= PRIX_MAX_DEFAUT ? `${PRIX_MAX_DEFAUT}€+` : `${prixMax}€`}</span>
        </div>
      </div>

      {/* PRODUITS */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ fontSize: '13px', color: '#666' }}>{products.length} produits</span>
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            style={{ fontSize: '12px', padding: '4px 8px', border: '1px solid #ddd', borderRadius: '3px' }}
          >
            <option value="">Pertinence</option>
            <option value="price_eur">Prix croissant</option>
            <option value="-price_eur">Prix décroissant</option>
          </select>
        </div>

        {loading && <p style={{ fontSize: '13px', color: '#888' }}>Chargement des produits…</p>}
        {error && <p style={{ fontSize: '13px', color: '#c62828' }}>Erreur : {error}</p>}
        {!loading && !error && products.length === 0 && (
          <p style={{ fontSize: '13px', color: '#888' }}>Aucun produit ne correspond à ces filtres.</p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {products.map((p) => (
            <div key={p.id} style={{ border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ background: '#fff', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderBottom: '1px solid #f5f5f5' }}>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px', boxSizing: 'border-box' }}
                  />
                ) : (
                  <span style={{ fontSize: '36px' }}>🧴</span>
                )}
              </div>
              <div style={{ padding: '10px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '3px' }}>{p.name}</div>
                <div style={{ fontSize: '10px', color: '#888', marginBottom: '6px' }}>{p.brand}</div>
                <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '6px' }}>
                  {Number(p.price_eur).toFixed(2).replace('.', ',')}€
                </div>
                <button
                  onClick={() => handleAdd(p)}
                  style={{
                    width: '100%',
                    background: addedId === p.id ? '#2e7d32' : '#111',
                    color: addedId === p.id ? '#fff' : '#F8BBD9',
                    border: 'none',
                    padding: '6px',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    transition: 'background 0.2s'
                  }}
                >
                  {addedId === p.id ? 'Ajouté ✓' : 'Ajouter'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}