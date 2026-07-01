export default function Catalogue() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: '100vh' }}>
      {/* FILTRES */}
      <div style={{ borderRight: '1px solid #eee', padding: '20px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '11px', letterSpacing: '1px', marginBottom: '12px' }}>CATÉGORIES</div>
        {['Tout', 'Cosmétiques', 'Vêtements', 'Accessoires'].map(c => (
          <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input type="checkbox" />
            <label style={{ fontSize: '12px' }}>{c}</label>
          </div>
        ))}
        <div style={{ fontWeight: 'bold', fontSize: '11px', letterSpacing: '1px', margin: '16px 0 8px' }}>PRIX</div>
        <input type="range" style={{ width: '100%', accentColor: '#111' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#888' }}>
          <span>0€</span><span>200€</span>
        </div>
      </div>

      {/* PRODUITS */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ fontSize: '13px', color: '#666' }}>142 produits</span>
          <select style={{ fontSize: '12px', padding: '4px 8px', border: '1px solid #ddd', borderRadius: '3px' }}>
            <option>Pertinence</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
          </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { nom: 'Sérum Éclat',     marque: 'La Roche-Posay', prix: '29,90€' },
            { nom: 'Rouge à lèvres',  marque: 'MAC Cosmetics',   prix: '22,00€' },
            { nom: 'Robe Florale',    marque: 'Bella Collection', prix: '49,90€' },
            { nom: 'Crème Hydra',     marque: 'Nivea',            prix: '14,50€' },
            { nom: 'Palette Smoky',   marque: 'NYX',              prix: '18,90€' },
            { nom: 'Top Satiné Rose', marque: 'Bella Collection', prix: '34,90€' },
          ].map((p, i) => (
            <div key={i} style={{ border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ background: '#fdf0f6', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '36px' }}>🧴</span>
              </div>
              <div style={{ padding: '10px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '3px' }}>{p.nom}</div>
                <div style={{ fontSize: '10px', color: '#888', marginBottom: '6px' }}>{p.marque}</div>
                <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '6px' }}>{p.prix}</div>
                <button style={{ width: '100%', background: '#111', color: '#F8BBD9', border: 'none', padding: '6px', borderRadius: '3px', cursor: 'pointer', fontSize: '11px' }}>
                  Ajouter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}