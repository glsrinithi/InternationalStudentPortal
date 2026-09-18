import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { savedAPI } from '../services/api';

export default function GuideCard({ guide, savedIds = [], onSaved }) {
  const { user } = useAuth();
  const toast = useToast();
  const isSaved = savedIds.includes(guide._id);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to save guides');
      return;
    }
    try {
      await savedAPI.add({
        resourceType: 'Guide',
        resourceId: guide._id,
      });
      toast.success('Guide saved');
      onSaved && onSaved();
    } catch (err) {
      const msg = err?.response?.data?.message || 'Could not save';
      toast.error(msg);
    }
  };

  return (
    <div className="guide-card">
      <div className="guide-card-icon">{guide.icon || '📘'}</div>
      <div className="guide-card-body">
        <span className="badge badge-category">{guide.category}</span>
        <h3 className="guide-card-title">{guide.title}</h3>
        <p className="guide-card-desc">{guide.description}</p>
        <div className="guide-card-actions">
          <Link to={`/guides/${guide._id}`} className="btn btn-outline btn-sm">
            Read guide
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
    </div>
  );
}