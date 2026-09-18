import { useEffect, useState } from 'react';
import { userAPI, guideAPI, serviceAPI, faqAPI, feedbackAPI } from '../services/api';
import Loader from '../components/Loader.jsx';
import EmptyState from '../components/EmptyState.jsx';
import '../styles/admin.css';
import { CITIES, SERVICE_CATEGORIES, FAQ_CATEGORIES } from '../utils/cities.js';

const TABS = ['Overview', 'Guides', 'Services', 'FAQs', 'Users', 'Feedback'];

export default function Admin() {
  const [tab, setTab] = useState('Overview');
  const [stats, setStats] = useState({ users: 0, guides: 0, services: 0, faqs: 0 });
  const [users, setUsers] = useState([]);
  const [guides, setGuides] = useState([]);
  const [services, setServices] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const loadAll = async () => {
    setLoading(true);
    try {
      const [u, g, s, f, fb] = await Promise.all([
        userAPI.list(),
        guideAPI.list(),
        serviceAPI.list(),
        faqAPI.list(),
        feedbackAPI.list().catch(() => ({ data: [] })),
      ]);
      setUsers(u.data);
      setGuides(g.data);
      setServices(s.data);
      setFaqs(f.data);
      setFeedback(fb.data);
      setStats({
        users: u.data.length,
        guides: g.data.length,
        services: s.data.length,
        faqs: f.data.length,
      });
    } catch {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Delete this ${type}?`)) return;
    try {
      if (type === 'guide') await guideAPI.remove(id);
      if (type === 'service') await serviceAPI.remove(id);
      if (type === 'faq') await faqAPI.remove(id);
      toast.success(`${type} deleted`);
      loadAll();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <Loader label="Loading admin panel..." fullScreen />;

  return (
    <div className="admin">
      <header className="page-header">
        <h1>Admin Panel</h1>
        <p>Manage users, content, and platform activity.</p>
      </header>

      <div className="admin-tabs">
        {TABS.map((t) => (
          <button
            key={t}
            className={`admin-tab ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Overview' && (
        <>
          <div className="grid grid-4">
            <div className="stat-card">
              <span>ðŸ‘¥</span>
              <h3>{stats.users}</h3>
              <p>Total Users</p>
            </div>
            <div className="stat-card">
              <span>ðŸ“˜</span>
              <h3>{stats.guides}</h3>
              <p>Total Guides</p>
            </div>
            <div className="stat-card">
              <span>ðŸ™ï¸</span>
              <h3>{stats.services}</h3>
              <p>Total Services</p>
            </div>
            <div className="stat-card">
              <span>â“</span>
              <h3>{stats.faqs}</h3>
              <p>Total FAQs</p>
            </div>
          </div>
          <section className="dash-card">
            <h2>Recent Activity</h2>
            <ul className="activity-list">
              {users.slice(0, 5).map((u) => (
                <li key={u._id}>
                  <strong>{u.name}</strong> joined from {u.country} â†’ {u.destinationCity}
                </li>
              ))}
              {users.length === 0 && <li className="muted">No activity yet</li>}
            </ul>
          </section>
        </>
      )}

      {tab === 'Guides' && (
        <AdminList
          items={guides}
          renderItem={(g) => (
            <>
              <span className="badge badge-category">{g.category}</span>
              <h4>{g.title}</h4>
              <p>{g.description}</p>
            </>
          )}
          onDelete={(id) => handleDelete('guide', id)}
          emptyMessage="No guides yet."
        />
      )}

      {tab === 'Services' && (
        <AdminList
          items={services}
          renderItem={(s) => (
            <>
              <span className="badge badge-category">{s.category}</span>
              <h4>{s.name}</h4>
              <p>
                {s.city} â€” {s.description}
              </p>
            </>
          )}
          onDelete={(id) => handleDelete('service', id)}
          emptyMessage="No services yet."
        />
      )}

      {tab === 'FAQs' && (
        <AdminList
          items={faqs}
          renderItem={(f) => (
            <>
              <span className="badge badge-category">{f.category}</span>
              <h4>{f.question}</h4>
              <p>{f.answer}</p>
            </>
          )}
          onDelete={(id) => handleDelete('faq', id)}
          emptyMessage="No FAQs yet."
        />
      )}

      {tab === 'Users' && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Country</th>
                <th>City</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.country}</td>
                  <td>{u.destinationCity}</td>
                  <td>
                    <span className={`role-tag role-${u.role}`}>{u.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'Feedback' && (
        <div className="feedback-list">
          {feedback.length === 0 ? (
            <EmptyState title="No feedback yet" icon="ðŸ’¬" />
          ) : (
            feedback.map((f) => (
              <div key={f._id} className="feedback-item">
                <strong>{f.user?.name || 'Anonymous'}</strong>
                <span className="rating">{'â˜…'.repeat(f.rating)}</span>
                <p>{f.message}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function AdminList({ items, renderItem, onDelete, emptyMessage }) {
  if (items.length === 0) return <EmptyState title={emptyMessage} icon="ðŸ“¦" />;
  return (
    <div className="admin-list">
      {items.map((item) => (
        <div key={item._id} className="admin-item">
          <div className="admin-item-body">{renderItem(item)}</div>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(item._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
