import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';
import Loader from '../components/Loader.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function SavedResources() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const res = await savedAPI.list();
      setItems(res.data);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    try {
      await savedAPI.remove(id);
      setItems((prev) => prev.filter((i) => i._id !== id));
      toast.success('Removed from saved');
    } catch {
      toast.error('Could not remove');
    }
  };

  if (loading) return <Loader label="Loading saved resources..." />;

  return (
    <div className="saved-page">
      <header className="page-header">
        <h1>Saved Resources</h1>
        <p>Your bookmarked guides, services, and FAQs.</p>
      </header>

      {items.length === 0 ? (
        <EmptyState
          title="No saved resources yet"
          message="Browse guides and services and tap Save to add them here."
          icon="â­"
          action={
            <Link to="/guides" className="btn btn-primary">
              Browse Guides
            </Link>
          }
        />
      ) : (
        <div className="saved-list">
          {items.map((item) => (
            <div key={item._id} className="saved-item">
              <div className="saved-item-body">
                <span className="badge badge-category">{item.resourceType}</span>
                <h3>{item.title}</h3>
              </div>
              <div className="saved-item-actions">
                {item.link && (
                  <Link to={item.link} className="btn btn-outline btn-sm">
                    Open
                  </Link>
                )}
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => remove(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

