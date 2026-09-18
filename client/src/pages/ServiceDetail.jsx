import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { serviceAPI, savedAPI } from '../services/api';
import '../styles/services.css';
import { useToast } from '../context/ToastContext.jsx';
import Loader from '../components/Loader.jsx';

export default function ServiceDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await serviceAPI.get(id);
        setService(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Service not found');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  useEffect(() => {
    if (!user) return;
    savedAPI.list().then((r) => {
      setSaved(r.data.some((s) => s.resourceId === id && s.resourceType === 'Service'));
    }).catch(() => {});
  }, [user, id]);

  const handleSave = async () => {
    if (!user) {
      toast.error('Please log in to save services');
      return;
    }
    if (saved) return;
    try {
      await savedAPI.add({ resourceType: 'Service', resourceId: id });
      setSaved(true);
      toast.success('Service saved');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Could not save');
    }
  };

  if (loading) return <Loader label="Loading service..." />;

  if (error)
    return (
      <div className="error-page">
        <h2>ðŸ˜• {error}</h2>
        <Link to="/services" className="btn btn-outline">
          Back to services
        </Link>
      </div>
    );

  return (
    <article className="service-detail">
      <Link to="/services" className="back-link">
        â† Back to services
      </Link>

      <header className="service-detail-head">
        <div className="service-badges">
          <span className="badge badge-category">{service.category}</span>
          {service.verified ? (
            <span className="badge badge-verified">Verified</span>
          ) : (
            <span className="badge badge-sample">Sample listing</span>
          )}
        </div>
        <h1>{service.name}</h1>
        <p className="service-detail-city">ðŸ“ {service.city}</p>
        <p className="service-detail-desc">{service.description}</p>
      </header>

      <div className="service-detail-info">
        {service.address && (
          <div className="info-row">
            <strong>Address:</strong> {service.address}
          </div>
        )}
        {service.phone && (
          <div className="info-row">
            <strong>Phone:</strong>{' '}
            <a href={`tel:${service.phone}`}>{service.phone}</a>
          </div>
        )}
        {service.website && (
          <div className="info-row">
            <strong>Website:</strong>{' '}
            <a href={service.website} target="_blank" rel="noreferrer">
              {service.website}
            </a>
          </div>
        )}
      </div>

      <button
        className={`btn ${saved ? 'btn-ghost' : 'btn-primary'}`}
        onClick={handleSave}
        disabled={saved}
      >
        {saved ? 'â˜… Saved' : 'â˜† Save this service'}
      </button>

      {!service.verified && (
        <div className="guide-disclaimer">
          âš ï¸ This is a sample/demo listing. Verify independently before
          contacting or paying.
        </div>
      )}
    </article>
  );
}
