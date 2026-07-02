export default function Cart() {
  const items = [
    { nom: 'Sérum Éclat Intense 30ml', marque: 'La Roche-Posay', prix: 29.90, qte: 1 },
    { nom: 'Rouge à lèvres Mat N°07',  marque: 'MAC Cosmetics',   prix: 22.00, qte: 2 },
    { nom: 'Robe Florale Été — Taille M', marque: 'Bella Collection', prix: 49.90, qte: 1 },
  ]

  const total = items.reduce((acc, i) => acc + i.prix * i.qte, 0)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', padding: '24px' }}>
      {/* ARTICLES */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Mon panier ({items.length} articles)</h2>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px', border: '1px solid #eee', borderRadius: '6px', marginBottom: '12px' }}>
            <div style={{ width: '70px', height: '70px', background: '#fdf0f6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '28px' }}>🧴</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '3px' }}>{item.nom}</div>
              <div style={{ fontSize: '11px', color: '#888', marginBottom: '10px' }}>{item.marque}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button style={{ width: '26px', height: '26px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', borderRadius: '3px' }}>−</button>
                  <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{item.qte}</span>
                  <button style={{ width: '26px', height: '26px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', borderRadius: '3px' }}>+</button>
                </div>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{(item.prix * item.qte).toFixed(2)}€</span>
                <span style={{ color: '#ccc', cursor: 'pointer', fontSize: '18px' }}>🗑</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RÉSUMÉ */}
      <div style={{ background: '#fdf0f6', borderRadius: '8px', padding: '20px', height: 'fit-content' }}>
        <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '16px' }}>Récapitulatif</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
          <span>Sous-total</span><span>{total.toFixed(2)}€</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
          <span>Livraison</span><span style={{ color: '#2e7d32' }}>Gratuite</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '15px', borderTop: '1.5px solid #F8BBD9', paddingTop: '10px', marginTop: '8px' }}>
          <span>Total</span><span>{total.toFixed(2)}€</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', margin: '14px 0' }}>
          <input type="text" placeholder="Code promo" style={{ flex: 1, border: '1px solid #ddd', padding: '8px', fontSize: '12px', borderRadius: '3px' }} />
          <button style={{ background: '#111', color: '#F8BBD9', border: 'none', padding: '8px 14px', fontSize: '12px', borderRadius: '3px', cursor: 'pointer' }}>OK</button>
        </div>
        <button style={{ width: '100%', background: '#111', color: '#F8BBD9', border: 'none', padding: '14px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
          Commander →
        </button>
      </div>
    </div>
  )
}