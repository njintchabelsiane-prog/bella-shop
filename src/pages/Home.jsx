export default function Home() {
  return (
    <div>
      {/* HERO */}
      <div style={{ background: '#F8BBD9', padding: '60px 32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111', marginBottom: '12px' }}>
          Beauté & Style à votre portée
        </h1>
        <p style={{ fontSize: '14px', color: '#444', marginBottom: '24px' }}>
          Découvrez notre collection exclusive de cosmétiques et vêtements tendance
        </p>
        <button style={{ background: '#111', color: '#F8BBD9', border: 'none', padding: '12px 32px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
          Découvrir la collection
        </button>
      </div>

      {/* CATEGORIES */}
      <div style={{ display: 'flex', gap: '12px', padding: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {['Tout', 'Cosmétiques', 'Vêtements', 'Maquillage', 'Soins'].map(cat => (
          <button key={cat} style={{ background: '#111', color: '#F8BBD9', border: 'none', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUITS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '0 24px 32px' }}>
        {[
          { nom: 'Sérum Éclat Intense', marque: 'La Roche-Posay', prix: '29,90€' },
          { nom: 'Rouge à lèvres Mat', marque: 'MAC Cosmetics',   prix: '22,00€' },
          { nom: 'Robe Florale Été',   marque: 'Bella Collection', prix: '49,90€' },
          { nom: 'Crème Hydratante',   marque: 'Nivea',            prix: '14,50€' },
        ].map((p, i) => (
          <div key={i} style={{ border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ background: '#fdf0f6', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '40px' }}>🧴</span>
            </div>
            <div style={{ padding: '12px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>{p.nom}</div>
              <div style={{ fontSize: '11px', color: '#888', marginBottom: '8px' }}>{p.marque}</div>
              <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}>{p.prix}</div>
              <button style={{ width: '100%', background: '#111', color: '#F8BBD9', border: 'none', padding: '8px', borderRadius: '3px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}