import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { serviceAPI, savedAPI } from '../services/api';
import ServiceCard from '../components/ServiceCard.jsx';
import Loader from '../components/Loader.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { SERVICE_CATEGORIES, CITIES } from '../utils/cities.js';
import '../styles/services.css';

export default function Services() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const city = searchParams.get('city') || '';
  const search = searchParams.get('search') || '';

  const [services, setServices] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category) params.category = category;
        if (city) params.city = city;
        if (search) params.search = search;
        const res = await serviceAPI.list(params);
        setServices(res.data);
      } catch {
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category, city, search]);

  useEffect(() => {
    if (!user) return;
    savedAPI.list().then((r) => setSaved(r.data)).catch(() => {});
  }, [user]);

  const savedServiceIds = saved
    .filter((s) => s.resourceType === 'Service')
    .map((s) => s.resourceId);

  const reloadSaved = () => {
    if (!user) return;
    savedAPI.list().then((r) => setSaved(r.data)).catch(() => {});
  };

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value) next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };

  return (
    <div className="services-page">
      <header className="page-header">
        <h1>Services</h1>
        <p>Find housing, banks, SIM providers, and more in your city.</p>
      </header>

      <div className="filters">
        <input
          type="text"
          className="search-input"
          placeholder="Search services..."
          value={search}
          onChange={(e) => updateParam('search', e.target.value)}
        />

        <div className="filter-row">
          <select
            value={city}
            onChange={(e) => updateParam('city', e.target.value)}
          >
            <option value="">All Cities</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => updateParam('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {SERVICE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <Loader label="Loading services..." />
      ) : services.length === 0 ? (
        <EmptyState
          title="No services found"
          message="Try clearing filters or searching for something else."
          icon="ðŸ™ï¸"
        />
      ) : (
        <div className="grid grid-3">
          {services.map((s) => (
            <ServiceCard
              key={s._id}
              service={s}
              savedIds={savedServiceIds}
              onSaved={reloadSaved}
            />
          ))}
        </div>
      )}
    </div>
  );
}
