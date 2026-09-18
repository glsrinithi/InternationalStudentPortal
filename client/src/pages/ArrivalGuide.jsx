import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { guideAPI, savedAPI } from '../services/api';
import GuideCard from '../components/GuideCard.jsx';
import Loader from '../components/Loader.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { GUIDE_CATEGORIES } from '../utils/cities.js';
import '../styles/guides.css';

export default function ArrivalGuide() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get('category') || 'all';
  const search = searchParams.get('search') || '';

  const [guides, setGuides] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeCat !== 'all') params.category = activeCat;
        if (search) params.search = search;
        const res = await guideAPI.list(params);
        setGuides(res.data);
      } catch {
        setGuides([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activeCat, search]);

  useEffect(() => {
    if (!user) return;
    savedAPI.list().then((r) => setSaved(r.data)).catch(() => {});
  }, [user]);

  const savedGuideIds = saved
    .filter((s) => s.resourceType === 'Guide')
    .map((s) => s.resourceId);

  const reloadSaved = () => {
    if (!user) return;
    savedAPI.list().then((r) => setSaved(r.data)).catch(() => {});
  };

  const setCategory = (cat) => {
    const next = new URLSearchParams(searchParams);
    if (cat === 'all') next.delete('category');
    else next.set('category', cat);
    setSearchParams(next);
  };

  const setSearch = (val) => {
    const next = new URLSearchParams(searchParams);
    if (!val) next.delete('search');
    else next.set('search', val);
    setSearchParams(next);
  };

  return (
    <div className="guides-page">
      <header className="page-header">
        <h1>Arrival Guide</h1>
        <p>Step-by-step help for before, during, and after your arrival.</p>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="Search guides..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <div className="chip-row">
          <button
            className={`chip ${activeCat === 'all' ? 'active' : ''}`}
            onClick={() => setCategory('all')}
          >
            All
          </button>
          {GUIDE_CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`chip ${activeCat === c.key ? 'active' : ''}`}
              onClick={() => setCategory(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader label="Loading guides..." />
      ) : guides.length === 0 ? (
        <EmptyState
          title="No guides found"
          message="Try changing your filters or search terms."
          icon="ðŸ“˜"
        />
      ) : (
        <div className="grid grid-2">
          {guides.map((g) => (
            <GuideCard
              key={g._id}
              guide={g}
              savedIds={savedGuideIds}
              onSaved={reloadSaved}
            />
          ))}
        </div>
      )}
    </div>
  );
}
