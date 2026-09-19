import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const PRODUCT_URL = 'http://127.0.0.1:8000/api/products/'

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct]     = useState(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [quantity, setQuantity]   = useState(1)
  const [activeImage, setActiveImage] = useState(null)
  const [added, setAdded]         = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`${PRODUCT_URL}${id}/`)
      .then(res => {
        if (!res.ok) throw new Error('Erreur ' + res.status)
        return res.json()
      })
      .then(data => {
        setProduct(data)
        setActiveImage(data.image)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <p style={{ padding: '32px', textAlign: 'center', fontSize: '13px', color: '#888' }}>Chargement…</p>
  }

  if (error || !product) {
    return <p style={{ padding: '32px', textAlign: 'center', fontSize: '13px', color: '#c62828' }}>Erreur : {error || 'Produit introuvable.'}</p>
  }

  const gallery = [product.image, ...(product.images || [])].filter(Boolean)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* GALERIE */}
      <div>
        <div style={{ background: '#fdf0f6', borderRadius: '8px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {activeImage ? (
            <img src={activeImage} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          ) : (
            <span style={{ fontSize: '80px' }}>🧴</span>
          )}
        </div>
        {gallery.length > 1 && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            {gallery.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImage(img)}
                style={{
                  width: '60px', height: '60px', background: '#fdf0f6',
                  border: img === activeImage ? '2px solid #111' : '2px solid #F8BBD9',
                  borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', overflow: 'hidden'
                }}
              >
                <img src={img} alt={`${product.name} ${i + 1}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* INFOS */}
      <div>
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>
          {product.brand} · {product.category_name}
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111', marginBottom: '10px' }}>
          {product.name}
        </h2>
        {product.average_rating != null && (
          <div style={{ color: '#F8BBD9', fontSize: '18px', marginBottom: '8px' }}>
            {'★'.repeat(Math.round(product.average_rating))}{'☆'.repeat(5 - Math.round(product.average_rating))}
          </div>
        )}
        <div style={{
          display: 'inline-block',
          background: product.stock > 0 ? '#e8f5e9' : '#fdecea',
          color: product.stock > 0 ? '#2e7d32' : '#c62828',
          padding: '3px 12px', borderRadius: '10px', fontSize: '11px', marginBottom: '14px'
        }}>
          {product.stock > 0 ? 'En stock' : 'Rupture de stock'}
        </div>
        <div style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '16px' }}>
          {Number(product.price_eur).toFixed(2).replace('.', ',')}€
        </div>

        {/* QUANTITÉ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            style={{ width: '32px', height: '32px', border: '1.5px solid #111', background: '#fff', cursor: 'pointer', borderRadius: '3px', fontSize: '16px' }}
          >−</button>
          <span style={{ fontWeight: 'bold' }}>{quantity}</span>
          <button
            onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
            style={{ width: '32px', height: '32px', border: '1.5px solid #111', background: '#fff', cursor: 'pointer', borderRadius: '3px', fontSize: '16px' }}
          >+</button>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          style={{
            width: '100%',
            background: added ? '#2e7d32' : '#111',
            color: added ? '#fff' : '#F8BBD9',
            border: 'none', padding: '14px',
            fontWeight: 'bold', borderRadius: '4px',
            cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
            marginBottom: '8px', fontSize: '14px',
            opacity: product.stock === 0 ? 0.5 : 1,
            transition: 'background 0.2s'
          }}
        >
          {added ? 'Ajouté ✓' : '🛒 Ajouter au panier'}
        </button>
        <button style={{ width: '100%', background: '#fff', color: '#111', border: '1.5px solid #111', padding: '14px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
          ♡ Ajouter aux favoris
        </button>

        <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.6', marginTop: '16px' }}>
          {product.description}
        </p>
      </div>
    </div>
  )
}