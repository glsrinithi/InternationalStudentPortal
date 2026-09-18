import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { savedAPI } from '../services/api';

export default function ServiceCard({ service, savedIds = [], onSaved }) {
  const { user } = useAuth();
  const toast = useToast();
  const isSaved = savedIds.includes(service._id);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to save resources');
      return;
    }
    try {
      await savedAPI.add({
        resourceType: 'Service',
        resourceId: service._id,
      });
      toast.success('Saved to your resources');
      onSaved && onSaved();
    } catch (err) {
      const msg = err?.response?.data?.message || 'Could not save';
      toast.error(msg);
    }
  };

  return (
    <div className="service-card">
      <div className="service-card-top">
        <span className="badge badge-category">{service.category}</span>
        {service.verified ? (
          <span className="badge badge-verified">Verified</span>
        ) : (
          <span className="badge badge-sample">Sample</span>
        )}
      </div>

      <h3 className="service-card-title">{service.name}</h3>
      <p className="service-card-city">📍 {service.city}</p>
      <p className="service-card-desc">{service.description}</p>

      <div className="service-card-actions">
        <Link to={`/services/${service._id}`} className="btn btn-outline btn-sm">
          View details
        </Link>
        <button
          className={`btn btn-sm ${isSaved ? 'btn-ghost' : 'btn-primary'}`}
          onClick={handleSave}
          disabled={isSaved}
        >
          {isSaved ? '★ Saved' : '☆ Save'}
        </button>
      </div>
    </div>
  );
}