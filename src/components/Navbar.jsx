import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{ background: '#111111', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: '#F8BBD9', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none', letterSpacing: '2px' }}>
        BELLA SHOP
      </Link>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/catalogue" style={{ color: '#fff', textDecoration: 'none', fontSize: '13px' }}>Catalogue</Link>
        <Link to="/panier"    style={{ color: '#fff', textDecoration: 'none', fontSize: '13px' }}>Panier</Link>
        <Link to="/login"     style={{ color: '#F8BBD9', textDecoration: 'none', fontSize: '13px' }}>Connexion</Link>
      </div>
    </nav>
  )
}