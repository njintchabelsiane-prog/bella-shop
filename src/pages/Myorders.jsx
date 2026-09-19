import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { authFetch, isAuthenticated } from '../api/auth.js'

const ORDERS_URL = 'https://bellashop-api.onrender.com/api/orders/'

const STATUS_LABELS = {
  PENDING:   { label: 'En attente',  color: '#f9a825', bg: '#fff8e1' },
  CONFIRMED: { label: 'Confirmée',   color: '#2e7d32', bg: '#e8f5e9' },
  SHIPPED:   { label: 'Expédiée',    color: '#1565c0', bg: '#e3f2fd' },
  DELIVERED: { label: 'Livrée',      color: '#111',    bg: '#eeeeee' },
  CANCELLED: { label: 'Annulée',     color: '#c62828', bg: '#fdecea' },
}

function StatusBadge({ status }) {
  const info = STATUS_LABELS[status] || { label: status, color: '#888', bg: '#f5f5f5' }
  return (
    <span style={{
      display: 'inline-block',
      background: info.bg,
      color: info.color,
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: 'bold',
      letterSpacing: '0.3px'
    }}>
      {info.label}
    </span>
  )
}

export default function MyOrders() {
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    if (!isAuthenticated()) {
      setError('Vous devez être connectée pour voir vos commandes.')
      setLoading(false)
      return
    }

    authFetch(ORDERS_URL)
      .then(async (res) => {
        if (!res.ok) throw new Error('Impossible de charger vos commandes.')
        const data = await res.json()
        setOrders(Array.isArray(data) ? data : data.results || [])
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <p style={{ textAlign: 'center', padding: '80px 24px', fontSize: '13px', color: '#888' }}>
        Chargement de vos commandes…
      </p>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <p style={{ fontSize: '13px', color: '#c62828', marginBottom: '20px' }}>{error}</p>
        <Link
          to="/login"
          style={{ background: '#111', color: '#F8BBD9', padding: '12px 24px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none' }}
        >
          Se connecter
        </Link>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Aucune commande pour le moment</h2>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '24px' }}>
          Vos commandes passées apparaîtront ici.
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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Mes commandes</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: '1px solid #eee',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px',
            background: '#fff'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
                Commande n° {order.order_number}
              </div>
              <div style={{ fontSize: '11px', color: '#888' }}>
                Passée le {new Date(order.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </div>
            </div>
            <StatusBadge status={order.status} />
          </div>

          {Array.isArray(order.items) && order.items.length > 0 && (
            <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: '12px', marginBottom: '12px' }}>
              {order.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#555', marginBottom: '6px' }}>
                  <span>
                    {item.product_name || item.product?.name || 'Produit'} × {item.quantity}
                  </span>
                  <span>
                    {Number(item.subtotal ?? (item.unit_price * item.quantity)).toFixed(2).replace('.', ',')}€
                  </span>
                </div>
              ))}
            </div>
          )}

          {order.tracking_number && (
            <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>
              N° de suivi : <strong>{order.tracking_number}</strong>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid #F8BBD9', paddingTop: '10px', marginTop: '8px' }}>
            <span style={{ fontSize: '12px', color: '#888' }}>Total</span>
            <span style={{ fontWeight: 'bold', fontSize: '15px' }}>
              {Number(order.total_amount).toFixed(2).replace('.', ',')}€
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}