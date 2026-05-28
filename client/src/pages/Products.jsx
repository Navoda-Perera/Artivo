import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import { FiFilter, FiX } from 'react-icons/fi';

const CATEGORIES = ['Sri Lankan Heritage','Modern','Portraits & Figures','Nautical & Coastal','Horses','Elephants','Abstract','Nature','Cityscape','Floral'];
const PIECE_TYPES = ['Single Canvas','2-Piece Set','3-Piece Triptych','4-Piece Set','5-Piece Set'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const category = searchParams.get('category') || '';
  const pieceType = searchParams.get('pieceType') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'newest';

  useEffect(() => {
    setLoading(true);
    getProducts({ category, pieceType, search, sort, page, limit: 12 })
      .then(({ data }) => {
        setProducts(data.products);
        setTotal(data.count);
        setPages(data.pages);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category, pieceType, search, sort, page]);

  const setFilter = (key, val) => {
    const p = new URLSearchParams(searchParams);
    val ? p.set(key, val) : p.delete(key);
    p.delete('page');
    setPage(1);
    setSearchParams(p);
  };

  return (
    <div className="products-page" style={{ paddingTop: '7rem' }}>
      <div className="container">
        {/* Header */}
        <div className="products-page__header">
          <div>
            <p className="section-subtitle">Our Collection</p>
            <h1 className="section-title">
              {category || pieceType || search ? (category || pieceType || `"${search}"`) : 'All Artworks'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{total} products found</p>
          </div>
          <div className="products-page__controls">
            <select className="form-input" style={{ width: 'auto' }} value={sort} onChange={e => setFilter('sort', e.target.value)}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <button className="btn btn-outline" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FiFilter /> Filters
            </button>
          </div>
        </div>

        <div className="products-page__body">
          {/* Sidebar */}
          <aside className={`products-sidebar${sidebarOpen ? ' products-sidebar--open' : ''}`}>
            <div className="products-sidebar__header">
              <h3>Filters</h3>
              <button onClick={() => setSidebarOpen(false)}><FiX /></button>
            </div>

            <div className="sidebar-section">
              <h4 className="sidebar-section__title">Category</h4>
              <ul className="sidebar-list">
                <li><button className={`sidebar-list__btn${!category ? ' active' : ''}`} onClick={() => setFilter('category', '')}>All</button></li>
                {CATEGORIES.map(c => (
                  <li key={c}><button className={`sidebar-list__btn${category === c ? ' active' : ''}`} onClick={() => setFilter('category', c)}>{c}</button></li>
                ))}
              </ul>
            </div>

            <div className="sidebar-section">
              <h4 className="sidebar-section__title">Piece Type</h4>
              <ul className="sidebar-list">
                <li><button className={`sidebar-list__btn${!pieceType ? ' active' : ''}`} onClick={() => setFilter('pieceType', '')}>All</button></li>
                {PIECE_TYPES.map(t => (
                  <li key={t}><button className={`sidebar-list__btn${pieceType === t ? ' active' : ''}`} onClick={() => setFilter('pieceType', t)}>{t}</button></li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Grid */}
          <div className="products-page__main">
            {loading ? (
              <div className="spinner" />
            ) : products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No artworks found</p>
                <Link to="/products" className="btn btn-gold">Clear Filters</Link>
              </div>
            ) : (
              <>
                <div className="products-grid">
                  {products.map(p => <ProductCard key={p._id} product={p} />)}
                </div>
                {pages > 1 && (
                  <div className="pagination">
                    {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
                      <button key={n} className={`pagination__btn${n === page ? ' active' : ''}`} onClick={() => setPage(n)}>{n}</button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .products-page__header { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:2rem; flex-wrap:wrap; gap:1rem; }
        .products-page__controls { display:flex; gap:0.75rem; align-items:center; }
        .products-page__body { display:grid; grid-template-columns:220px 1fr; gap:2rem; align-items:start; }
        .products-sidebar { background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-md); padding:1.5rem; position:sticky; top:7rem; }
        .products-sidebar__header { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; }
        .products-sidebar__header h3 { font-family:var(--font-display); font-size:1.2rem; }
        .products-sidebar__header button { color:var(--text-muted); font-size:1.1rem; }
        .sidebar-section { margin-bottom:1.5rem; }
        .sidebar-section__title { font-size:0.7rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--gold); margin-bottom:0.75rem; }
        .sidebar-list { display:flex; flex-direction:column; gap:0.25rem; }
        .sidebar-list__btn { text-align:left; width:100%; padding:0.4rem 0.6rem; font-size:0.83rem; color:var(--text-secondary); border-radius:var(--radius-sm); transition:var(--transition); font-family:var(--font-body); }
        .sidebar-list__btn:hover, .sidebar-list__btn.active { color:var(--gold); background:rgba(201,168,76,0.08); }
        .products-page__main { min-height:400px; }
        .pagination { display:flex; justify-content:center; gap:0.5rem; margin-top:2.5rem; }
        .pagination__btn { width:38px; height:38px; border:1px solid var(--border); border-radius:var(--radius-sm); color:var(--text-secondary); font-size:0.85rem; transition:var(--transition); font-family:var(--font-body); }
        .pagination__btn:hover,.pagination__btn.active { border-color:var(--gold); color:var(--gold); background:rgba(201,168,76,0.08); }
        @media(max-width:768px){ .products-page__body{grid-template-columns:1fr;} .products-sidebar{display:none;} .products-sidebar--open{display:block;} }
      `}</style>
    </div>
  );
}
