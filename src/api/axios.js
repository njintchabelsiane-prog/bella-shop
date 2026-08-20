import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios.js'
import { CartContext } from '../context/CartContext' // ⚠️ à vérifier — dis-moi le bon chemin

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(null)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setError(null)

    api.get(`/products/${id}/`)
      .then(res => {
        if (!isMounted) return
        setProduct(res.data)
        setActiveImage(res.data.image)
      })
      .catch(err => {
        if (!isMounted) return
        setError("Impossible de charger ce produit.")
        console.error(err)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => { isMounted = false }
  }, [id])

  if (loading) {
    return <div style={{ padding: '32px', textAlign: 'center' }}>Chargement...</div>
  }

  if (error || !product) {
    return <div style={{ padding: '32px', textAlign: 'center', color: '#c00' }}>{error || 'Produit introuvable.'}</div>
  }

  const gallery = [product.image, ...(product.images || [])].filter(Boolean)

  const handleAddToCart = () => {
    addToCart(product, quantity)
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
          {product.price_eur}€
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
            width: '100%', background: '#111', color: '#F8BBD9', border: 'none', padding: '14px',
            fontWeight: 'bold', borderRadius: '4px', cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
            marginBottom: '8px', fontSize: '14px', opacity: product.stock === 0 ? 0.5 : 1
          }}
        >
          🛒 Ajouter au panier
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