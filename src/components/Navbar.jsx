import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav style={{
      background: '#111111',
      padding: '14px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
    }}>
      {/* LOGO */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '38px',
          height: '38px',
          background: 'linear-gradient(135deg, #F8BBD9, #f48fb1)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
        }}>
          🌸
        </div>
        <div>
          <div style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '20px',
            fontWeight: '700',
            color: '#F8BBD9',
            letterSpacing: '2px',
            lineHeight: '1',
          }}>
            BELLA
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '9px',
            color: '#888',
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}>
            SHOP
          </div>
        </div>
      </Link>

      {/* LIENS */}
      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        <Link to="/catalogue" style={{ color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: '500', letterSpacing: '0.5px' }}>
          Catalogue
        </Link>
        <Link to="/panier" style={{ color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: '500', position: 'relative', paddingRight: totalItems > 0 ? '14px' : '0' }}>
          🛒 Panier
          {totalItems > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-4px',
              background: '#F8BBD9',
              color: '#111',
              fontSize: '10px',
              fontWeight: '700',
              minWidth: '18px',
              height: '18px',
              borderRadius: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 4px',
              boxSizing: 'border-box',
            }}>
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </Link>
        <Link to="/login" style={{
          color: '#111',
          background: '#F8BBD9',
          textDecoration: 'none',
          fontSize: '12px',
          fontWeight: '700',
          padding: '8px 20px',
          borderRadius: '20px',
          letterSpacing: '0.5px',
        }}>
          Connexion
        </Link>
      </div>
    </nav>
  )
}