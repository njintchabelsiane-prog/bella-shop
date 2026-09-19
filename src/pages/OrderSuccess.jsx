import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { authFetch } from '../api/auth.js'
import { useCart } from '../context/CartContext.jsx'

const CONFIRM_URL = 'http://127.0.0.1:8000/api/orders/confirm/'

export default function OrderSuccess() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [order, setOrder]     = useState(null)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(true)
  const { clearCart } = useCart()

  useEffect(() => {
    if (!sessionId) {
      setError('Session de paiement introuvable.')
      setLoading(false)
      return
    }
    authFetch(`${CONFIRM_URL}?session_id=${sessionId}`)
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Erreur de confirmation')
        setOrder(data)
        clearCart()
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId])

  if (loading) {
    return <p style={{ textAlign: 'center', padding: '80px 24px', fontSize: '13px', color: '#888' }}>Vérification du paiement…</p>
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Un souci est survenu</h2>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '24px' }}>{error}</p>
        <Link to="/catalogue" style={{ background: '#111', color: '#F8BBD9', padding: '12px 24px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>
          Retour au catalogue
        </Link>
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center', padding: '80px 24px' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Merci pour votre commande !</h2>
      <p style={{ fontSize: '13px', color: '#888', marginBottom: '4px' }}>
        Commande n° <strong>{order.order_number}</strong>
      </p>
      <p style={{ fontSize: '13px', color: '#888', marginBottom: '24px' }}>
        Total payé : {Number(order.total_amount).toFixed(2).replace('.', ',')}€
      </p>
      <Link to="/catalogue" style={{ background: '#111', color: '#F8BBD9', padding: '12px 24px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}>
        Continuer mes achats
      </Link>
    </div>
  )
}