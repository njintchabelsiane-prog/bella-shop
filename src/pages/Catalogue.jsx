import { useState, useEffect } from 'react'

const API_URL = 'http://127.0.0.1:8000/api/products/'

export default function Catalogue() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Erreur ' + res.status)
        return res.json()
      })
      .then(data => {
        // Gère les deux cas : réponse paginée (data.results) ou liste simple
        setProducts(Array.isArray(data) ? data : data.results || [])
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: '100vh' }}>
      {/* FILTRES */}
      <div style={{ borderRight: '1px solid #eee', padding: '20px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '11px', letterSpacing: '1px', marginBottom: '12px' }}>CATÉGORIES</div>
        {['Tout', 'Cosmétiques', 'Vêtements', 'Accessoires'].map(c => (
          <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input type="checkbox" />
            <label style={{ fontSize: '12px' }}>{c}</label>
          </div>
        ))}
        <div style={{ fontWeight: 'bold', fontSize: '11px', letterSpacing: '1px', margin: '16px 0 8px' }}>PRIX</div>
        <input type="range" style={{ width: '100%', accentColor: '#111' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#888' }}>
          <span>0€</span><span>200€</span>
        </div>
      </div>

      {/* PRODUITS */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ fontSize: '13px', color: '#666' }}>{products.length} produits</span>
          <select style={{ fontSize: '12px', padding: '4px 8px', border: '1px solid #ddd', borderRadius: '3px' }}>
            <option>Pertinence</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
          </select>
        </div>

        {loading && <p style={{ fontSize: '13px', color: '#888' }}>Chargement des produits…</p>}
        {error && <p style={{ fontSize: '13px', color: '#c62828' }}>Erreur : {error}</p>}

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
                <button style={{ width: '100%', background: '#111', color: '#F8BBD9', border: 'none', padding: '6px', borderRadius: '3px', cursor: 'pointer', fontSize: '11px' }}>
                  Ajouter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}