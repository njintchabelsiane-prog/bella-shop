import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    api.get('/products/')
      .then(res => { setProducts(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* HERO */}
      <div style={{
        background: 'linear-gradient(135deg, #F8BBD9 0%, #fce4ec 50%, #fff 100%)',
        padding: '80px 32px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Décoration */}
        <div style={{ position: 'absolute', top: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(248,187,217,0.3)' }}/>
        <div style={{ position: 'absolute', bottom: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(248,187,217,0.2)' }}/>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '12px', letterSpacing: '6px', color: '#888', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>
            Collection 2026
          </p>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '52px',
            fontWeight: '900',
            color: '#111',
            lineHeight: '1.2',
            marginBottom: '20px',
          }}>
            Beauté & Style<br/>
            <span style={{ color: '#c2185b' }}>à votre portée</span>
          </h1>
          <p style={{ fontSize: '15px', color: '#555', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px', lineHeight: '1.7' }}>
            Découvrez notre collection exclusive de cosmétiques et vêtements tendance, sélectionnés avec soin pour sublimer votre beauté.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link to="/catalogue">
              <button style={{ background: '#111', color: '#F8BBD9', border: 'none', padding: '14px 36px', fontWeight: '600', borderRadius: '30px', cursor: 'pointer', fontSize: '14px', letterSpacing: '1px' }}>
                Découvrir →
              </button>
            </Link>
            <button style={{ background: 'transparent', color: '#111', border: '1.5px solid #111', padding: '14px 36px', fontWeight: '600', borderRadius: '30px', cursor: 'pointer', fontSize: '14px' }}>
              Nos nouveautés
            </button>
          </div>
        </div>
      </div>

      {/* BANNIÈRE STATS */}
      <div style={{ background: '#111', padding: '20px 32px', display: 'flex', justifyContent: 'center', gap: '60px' }}>
        {[
          { val: '1000+', label: 'Produits' },
          { val: '50+',   label: 'Marques' },
          { val: '4.8★',  label: 'Note moyenne' },
          { val: '24h',   label: 'Livraison' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: '700', color: '#F8BBD9' }}>{s.val}</div>
            <div style={{ fontSize: '11px', color: '#888', letterSpacing: '1px', textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* CATÉGORIES */}
      <div style={{ padding: '40px 32px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>
          Nos catégories
        </h2>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Tout', 'Cosmétiques', 'Vêtements', 'Maquillage', 'Soins'].map(cat => (
            <button key={cat} style={{
              background: cat === 'Tout' ? '#111' : 'transparent',
              color: cat === 'Tout' ? '#F8BBD9' : '#111',
              border: '1.5px solid #111',
              padding: '8px 22px',
              borderRadius: '30px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              letterSpacing: '0.5px',
            }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* TITRE SECTION PRODUITS */}
      <div style={{ padding: '0 32px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: '700' }}>
          Nos produits
        </h2>
        <Link to="/catalogue" style={{ color: '#111', fontSize: '13px', fontWeight: '600', textDecoration: 'none', borderBottom: '1px solid #111' }}>
          Voir tout →
        </Link>
      </div>

      {/* PRODUITS */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#888', fontSize: '14px' }}>
          Chargement...
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
          Aucun produit pour le moment.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '0 32px 48px' }}>
          {products.slice(0, 8).map(p => (
            <Link key={p.id} to={`/produit/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                border: '1px solid #eee',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                background: '#fff',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ background: 'linear-gradient(135deg, #fdf0f6, #fce4ec)', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ fontSize: '48px' }}>🧴</span>
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#111', color: '#F8BBD9', fontSize: '10px', padding: '3px 8px', borderRadius: '10px', fontWeight: '600' }}>
                    Nouveau
                  </div>
                </div>
                <div style={{ padding: '14px' }}>
                  <div style={{ fontSize: '10px', color: '#F8BBD9', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{p.brand}</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: '600', fontSize: '14px', marginBottom: '8px', color: '#111' }}>{p.name}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: '700', fontSize: '16px', color: '#111' }}>{p.price_eur}€</div>
                    <button style={{ background: '#111', color: '#F8BBD9', border: 'none', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '11px', fontWeight: '600' }}>
                      + Panier
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* FOOTER MINI */}
      <div style={{ background: '#F8BBD9', padding: '40px 32px', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
          Livraison gratuite dès 50€
        </h3>
        <p style={{ fontSize: '13px', color: '#555' }}>Paiement sécurisé · Retours gratuits · Support 7j/7</p>
      </div>
    </div>
  )
}