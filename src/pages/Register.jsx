import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '', password: '', confirm: ''
  })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Register:', form)
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fdf0f6', padding: '24px' }}>
      <div style={{ background: '#fff', borderRadius: '8px', padding: '40px', width: '100%', maxWidth: '480px', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111', marginBottom: '6px', textAlign: 'center' }}>Créer un compte</h2>
        <p style={{ fontSize: '12px', color: '#888', textAlign: 'center', marginBottom: '24px' }}>Rejoignez Bella Shop</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>Prénom</label>
            <input name="first_name" onChange={handleChange} placeholder="Belsiane"
              style={{ width: '100%', border: '1px solid #ddd', padding: '10px', fontSize: '13px', borderRadius: '4px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>Nom</label>
            <input name="last_name" onChange={handleChange} placeholder="Njintcha"
              style={{ width: '100%', border: '1px solid #ddd', padding: '10px', fontSize: '13px', borderRadius: '4px' }} />
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
            <input name={f.name} type={f.type} onChange={handleChange} placeholder={f.placeholder}
              style={{ width: '100%', border: '1px solid #ddd', padding: '10px 12px', fontSize: '13px', borderRadius: '4px' }} />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          style={{ width: '100%', background: '#111', color: '#F8BBD9', border: 'none', padding: '13px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', marginBottom: '16px' }}
        >
          Créer mon compte
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#666' }}>
          Déjà un compte ?{' '}
          <Link to="/login" style={{ color: '#111', fontWeight: 'bold' }}>Se connecter</Link>
        </p>
      </div>
    </div>
  )
}