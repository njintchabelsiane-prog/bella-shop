import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login:', email, password)
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fdf0f6' }}>
      <div style={{ background: '#fff', borderRadius: '8px', padding: '40px', width: '100%', maxWidth: '400px', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111', marginBottom: '6px', textAlign: 'center' }}>Connexion</h2>
        <p style={{ fontSize: '12px', color: '#888', textAlign: 'center', marginBottom: '24px' }}>Bienvenue sur Bella Shop</p>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '6px' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="votre@email.com"
            style={{ width: '100%', border: '1px solid #ddd', padding: '10px 12px', fontSize: '13px', borderRadius: '4px', outline: 'none' }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '6px' }}>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ width: '100%', border: '1px solid #ddd', padding: '10px 12px', fontSize: '13px', borderRadius: '4px', outline: 'none' }}
          />
        </div>

        <button
          onClick={handleSubmit}
          style={{ width: '100%', background: '#111', color: '#F8BBD9', border: 'none', padding: '13px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', marginBottom: '16px' }}
        >
          Se connecter
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#666' }}>
          Pas encore de compte ?{' '}
          <Link to="/register" style={{ color: '#111', fontWeight: 'bold' }}>S'inscrire</Link>
        </p>
      </div>
    </div>
  )
}