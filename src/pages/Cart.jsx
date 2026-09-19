import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { authFetch, isAuthenticated } from '../api/auth.js'

const CHECKOUT_URL = 'http://127.0.0.1:8000/api/orders/checkout/'

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart()
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError]     = useState('')
  const navigate = useNavigate()

  const handleCheckout = async () => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }
    setCheckoutError('')
    setCheckoutLoading(true)
    try {
      const res = await authFetch(CHECKOUT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ product_id: i.id, quantity: i.quantity })),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur lors de la création du paiement')
      window.location.href = data.checkout_url
    } catch (err) {
      setCheckoutError(err.message)
      setCheckoutLoading(false)
    }
  }

  // PANIER VIDE
  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Votre panier est vide</h2>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '24px' }}>
          Découvrez nos produits et faites-vous plaisir !
        </p>
        <Link
          to="/catalogue"
          style={{ background: '#111', color: '#F8BBD9', padding: '12px 24px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}
        >
          Voir le catalogue →
        </Link>
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', padding: '24px' }}>
      {/* ARTICLES */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
          Mon panier ({totalItems} article{totalItems > 1 ? 's' : ''})
        </h2>
        {items.map((item) => (
          <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px', border: '1px solid #eee', borderRadius: '6px', marginBottom: '12px' }}>
            <div style={{ width: '70px', height: '70px', background: '#fdf0f6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
              {item.image ? (
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <span style={{ fontSize: '28px' }}>🧴</span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '3px' }}>{item.name}</div>
              <div style={{ fontSize: '11px', color: '#888', marginBottom: '10px' }}>
                {Number(item.price_eur).toFixed(2).replace('.', ',')}€ l'unité
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '26px', height: '26px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', borderRadius: '3px' }}>−</button>
                  <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '26px', height: '26px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', borderRadius: '3px' }}>+</button>
                </div>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
                  {(Number(item.price_eur) * item.quantity).toFixed(2).replace('.', ',')}€
                </span>
                <button onClick={() => removeFromCart(item.id)} title="Supprimer l'article" style={{ color: '#ccc', cursor: 'pointer', fontSize: '18px', background: 'none', border: 'none', padding: 0 }}>🗑</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RÉSUMÉ */}
      <div style={{ background: '#fdf0f6', borderRadius: '8px', padding: '20px', height: 'fit-content' }}>
        <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '16px' }}>Récapitulatif</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
          <span>Sous-total</span><span>{totalPrice.toFixed(2).replace('.', ',')}€</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
          <span>Livraison</span><span style={{ color: '#2e7d32' }}>Gratuite</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '15px', borderTop: '1.5px solid #F8BBD9', paddingTop: '10px', marginTop: '8px' }}>
          <span>Total</span><span>{totalPrice.toFixed(2).replace('.', ',')}€</span>
        </div>

        {checkoutError && (
          <div style={{ background: '#fdecea', color: '#c62828', fontSize: '12px', padding: '10px', borderRadius: '4px', margin: '12px 0' }}>
            {checkoutError}
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', margin: '14px 0' }}>
          <input type="text" placeholder="Code promo" style={{ flex: 1, border: '1px solid #ddd', padding: '8px', fontSize: '12px', borderRadius: '3px' }} />
          <button style={{ background: '#111', color: '#F8BBD9', border: 'none', padding: '8px 14px', fontSize: '12px', borderRadius: '3px', cursor: 'pointer' }}>OK</button>
        </div>

        <button
          onClick={handleCheckout}
          disabled={checkoutLoading}
          style={{ width: '100%', background: '#111', color: '#F8BBD9', border: 'none', padding: '14px', fontWeight: 'bold', borderRadius: '4px', cursor: checkoutLoading ? 'default' : 'pointer', fontSize: '14px', opacity: checkoutLoading ? 0.7 : 1 }}
        >
          {checkoutLoading ? 'Redirection…' : 'Commander →'}
        </button>
      </div>
    </div>
  )
}