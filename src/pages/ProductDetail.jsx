export default function ProductDetail() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* GALERIE */}
      <div>
        <div style={{ background: '#fdf0f6', borderRadius: '8px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '80px' }}>🧴</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ width: '60px', height: '60px', background: '#fdf0f6', border: '2px solid #F8BBD9', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '20px' }}>🧴</span>
            </div>
          ))}
        </div>
      </div>

      {/* INFOS */}
      <div>
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>La Roche-Posay · Cosmétiques</div>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111', marginBottom: '10px' }}>Sérum Éclat Intense 30ml</h2>
        <div style={{ color: '#F8BBD9', fontSize: '18px', marginBottom: '8px' }}>★★★★☆ <span style={{ fontSize: '12px', color: '#888' }}>(47 avis)</span></div>
        <div style={{ display: 'inline-block', background: '#e8f5e9', color: '#2e7d32', padding: '3px 12px', borderRadius: '10px', fontSize: '11px', marginBottom: '14px' }}>
          En stock
        </div>
        <div style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '16px' }}>29,90€</div>

        {/* QUANTITÉ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <button style={{ width: '32px', height: '32px', border: '1.5px solid #111', background: '#fff', cursor: 'pointer', borderRadius: '3px', fontSize: '16px' }}>−</button>
          <span style={{ fontWeight: 'bold' }}>1</span>
          <button style={{ width: '32px', height: '32px', border: '1.5px solid #111', background: '#fff', cursor: 'pointer', borderRadius: '3px', fontSize: '16px' }}>+</button>
        </div>

        <button style={{ width: '100%', background: '#111', color: '#F8BBD9', border: 'none', padding: '14px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', marginBottom: '8px', fontSize: '14px' }}>
          🛒 Ajouter au panier
        </button>
        <button style={{ width: '100%', background: '#fff', color: '#111', border: '1.5px solid #111', padding: '14px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
          ♡ Ajouter aux favoris
        </button>

        <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.6', marginTop: '16px' }}>
          Sérum concentré à l'acide hyaluronique et à la vitamine C pour un éclat intense et une hydratation longue durée.
        </p>
      </div>
    </div>
  )
}