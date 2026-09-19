import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { saveAuth } from '../api/auth.js'

const API_URL = 'http://127.0.0.1:8000/api/auth/login/'

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Email ou mot de passe incorrect')
      }
      saveAuth(data)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fdf0f6' }}>
      <div style={{ background: '#fff', borderRadius: '8px', padding: '40px', width: '100%', maxWidth: '400px', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111', marginBottom: '6px', textAlign: 'center' }}>Connexion</h2>
        <p style={{ fontSize: '12px', color: '#888', textAlign: 'center', marginBottom: '24px' }}>Bienvenue sur Bella Shop</p>

        {error && (
          <div style={{ background: '#fdecea', color: '#c62828', fontSize: '12px', padding: '10px', borderRadius: '4px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '6px' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="votre@email.com"
            style={{ width: '100%', border: '1px solid #ddd', padding: '10px 12px', fontSize: '13px', borderRadius: '4px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '6px' }}>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ width: '100%', border: '1px solid #ddd', padding: '10px 12px', fontSize: '13px', borderRadius: '4px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ width: '100%', background: '#111', color: '#F8BBD9', border: 'none', padding: '13px', fontWeight: 'bold', borderRadius: '4px', cursor: loading ? 'default' : 'pointer', fontSize: '14px', marginBottom: '16px', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#666' }}>
          Pas encore de compte ?{' '}
          <Link to="/register" style={{ color: '#111', fontWeight: 'bold' }}>S'inscrire</Link>
        </p>
      </div>
    </div>
  )
}