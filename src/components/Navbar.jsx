import { Link } from 'react-router-dom'

export default function Navbar() {
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
        <Link to="/panier" style={{ color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}>
          🛒 Panier
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