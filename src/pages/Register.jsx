import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { saveAuth } from '../api/auth.js'

const REGISTER_URL = 'http://127.0.0.1:8000/api/auth/register/'
const LOGIN_URL     = 'http://127.0.0.1:8000/api/auth/login/'

export default function Register() {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '', password: '', confirm: ''
  })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    if (form.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }

    setLoading(true)
    try {
      // 1. Création du compte
      const { confirm, ...payload } = form
      const res = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        const firstError = Object.values(data)[0]
        throw new Error(Array.isArray(firstError) ? firstError[0] : (firstError || 'Erreur lors de la création du compte'))
      }

      // 2. Connexion automatique juste après l'inscription
      const loginRes = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      })
      const loginData = await loginRes.json()
      if (!loginRes.ok) throw new Error('Compte créé, mais connexion automatique impossible. Connecte-toi manuellement.')

      saveAuth(loginData)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fdf0f6', padding: '24px' }}>
      <div style={{ background: '#fff', borderRadius: '8px', padding: '40px', width: '100%', maxWidth: '480px', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111', marginBottom: '6px', textAlign: 'center' }}>Créer un compte</h2>
        <p style={{ fontSize: '12px', color: '#888', textAlign: 'center', marginBottom: '24px' }}>Rejoignez Bella Shop</p>

        {error && (
          <div style={{ background: '#fdecea', color: '#c62828', fontSize: '12px', padding: '10px', borderRadius: '4px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>Prénom</label>
            <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="Belsiane"
              style={{ width: '100%', border: '1px solid #ddd', padding: '10px', fontSize: '13px', borderRadius: '4px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>Nom</label>
            <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Njintcha"
              style={{ width: '100%', border: '1px solid #ddd', padding: '10px', fontSize: '13px', borderRadius: '4px', boxSizing: 'border-box' }} />
          </div>
        </div>

        {[
          { name: 'email',    label: 'Email',        type: 'email',    placeholder: 'votre@email.com' },
          { name: 'phone',    label: 'Téléphone',    type: 'tel',      placeholder: '+33 6 12 34 56 78' },
          { name: 'password', label: 'Mot de passe', type: 'password', placeholder: '••••••••' },
          { name: 'confirm',  label: 'Confirmer',    type: 'password', placeholder: '••••••••' },
        ].map(f => (
          <div key={f.name} style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>{f.label}</label>
            <input name={f.name} type={f.type} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder}
              style={{ width: '100%', border: '1px solid #ddd', padding: '10px 12px', fontSize: '13px', borderRadius: '4px', boxSizing: 'border-box' }} />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ width: '100%', background: '#111', color: '#F8BBD9', border: 'none', padding: '13px', fontWeight: 'bold', borderRadius: '4px', cursor: loading ? 'default' : 'pointer', fontSize: '14px', marginBottom: '16px', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Création…' : 'Créer mon compte'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#666' }}>
          Déjà un compte ?{' '}
          <Link to="/login" style={{ color: '#111', fontWeight: 'bold' }}>Se connecter</Link>
        </p>
      </div>
    </div>
  )
}