import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';
import { guideAPI, serviceAPI, savedAPI } from '../services/api';
import GuideCard from '../components/GuideCard.jsx';
import Loader from '../components/Loader.jsx';

const DEFAULT_CHECKLIST = [
  { id: 'passport', label: 'Passport valid 6+ months' },
  { id: 'visa', label: 'Student visa approved' },
  { id: 'admission', label: 'Admission documents ready' },
  { id: 'insurance', label: 'Travel/medical insurance purchased' },
  { id: 'accommodation', label: 'Accommodation arranged' },
  { id: 'sim', label: 'Local SIM card obtained' },
  { id: 'bank', label: 'Bank account opened' },
  { id: 'university', label: 'University registration complete' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [guides, setGuides] = useState([]);
  const [services, setServices] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checklist, setChecklist] = useState(() => {
    const raw = localStorage.getItem(`checklist_${user?._id}`);
    return raw ? JSON.parse(raw) : DEFAULT_CHECKLIST.map((c) => ({ ...c, done: false }));
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [g, s, sv] = await Promise.all([
          guideAPI.list(),
          serviceAPI.list(user?.destinationCity ? { city: user.destinationCity } : {}),
          savedAPI.list(),
        ]);
        setGuides(g.data.slice(0, 4));
        setServices(s.data.slice(0, 4));
        setSaved(sv.data);
      } catch (err) {
        // handled silently; UI stays consistent
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.destinationCity]);

  useEffect(() => {
    if (user?._id) {
      localStorage.setItem(`checklist_${user._id}`, JSON.stringify(checklist));
    }
  }, [checklist, user?._id]);

  const toggleCheck = (id) => {
    setChecklist((prev) =>
      prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c))
    );
  };

  const progress = Math.round(
    (checklist.filter((c) => c.done).length / checklist.length) * 100
  );

  const savedGuideIds = saved
    .filter((s) => s.resourceType === 'Guide')
    .map((s) => s.resourceId);

  const reloadSaved = async () => {
    try {
      const sv = await savedAPI.list();
      setSaved(sv.data);
    } catch {
      // ignore
    }
  };

  if (loading) return <Loader label="Loading your dashboard..." />;

  return (
    <div className="dashboard">
      <section className="dash-hero">
        <div>
          <h1>
            Welcome, {user?.name?.split(' ')[0] || 'Student'} ðŸ‘‹
          </h1>
          <p className="dash-sub">
            From {user?.country || 'â€”'} to{' '}
            <strong>{user?.destinationCity || 'â€”'}</strong>
          </p>
        </div>
        <div className="dash-progress">
          <div className="dash-progress-label">
            <span>Arrival Progress</span>
            <strong>{progress}%</strong>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <section className="dash-grid">
        {/* CHECKLIST */}
        <div className="dash-card">
          <h2>ðŸ“‹ Arrival Checklist</h2>
          <p className="dash-card-sub">
            Track your preparation step by step.
          </p>
          <ul className="checklist">
            {checklist.map((item) => (
              <li key={item.id} className={item.done ? 'done' : ''}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleCheck(item.id)}
                  />
                  <span>{item.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* EMERGENCY */}
        <div className="dash-card emergency">
          <h2>ðŸš¨ Emergency Contacts</h2>
          <p className="dash-card-sub">Save these before you travel.</p>
          <ul className="contact-list">
            <li>
              <strong>All-in-one Emergency</strong>
              <span>112</span>
            </li>
            <li>
              <strong>Police</strong>
              <span>100</span>
            </li>
            <li>
              <strong>Fire</strong>
              <span>101</span>
            </li>
            <li>
              <strong>Ambulance</strong>
              <span>102</span>
            </li>
            <li>
              <strong>Women&apos;s Helpline</strong>
              <span>1091</span>
            </li>
          </ul>
        </div>
      </section>

      {/* QUICK NAV */}
      <section className="dash-quick">
        <h2>âš¡ Quick Actions</h2>
        <div className="grid grid-4">
          <Link to="/guides" className="quick-card">
            <span>ðŸ“˜</span>
            <h4>Arrival Guides</h4>
            <p>Step-by-step help</p>
          </Link>
          <Link to="/services" className="quick-card">
            <span>ðŸ™ï¸</span>
            <h4>Services</h4>
            <p>Near {user?.destinationCity || 'you'}</p>
          </Link>
          <Link to="/faqs" className="quick-card">
            <span>â“</span>
            <h4>FAQs</h4>
            <p>Quick answers</p>
          </Link>
          <Link to="/saved" className="quick-card">
            <span>â­</span>
            <h4>Saved</h4>
            <p>{saved.length} item(s)</p>
          </Link>
        </div>
      </section>

      {/* RECOMMENDED GUIDES */}
      <section className="dash-section">
        <div className="dash-section-head">
          <h2>ðŸ“˜ Recommended Guides</h2>
          <Link to="/guides" className="link-more">
            View all â†’
          </Link>
        </div>
        {guides.length === 0 ? (
          <p className="muted">No guides yet.</p>
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
      </section>

      {/* SERVICES NEAR CITY */}
      <section className="dash-section">
        <div className="dash-section-head">
          <h2>ðŸ™ï¸ Services in {user?.destinationCity || 'your city'}</h2>
          <Link to="/services" className="link-more">
            View all â†’
          </Link>
        </div>
        {services.length === 0 ? (
          <p className="muted">No services listed for this city yet.</p>
        ) : (
          <div className="grid grid-2">
            {services.map((s) => (
              <div key={s._id} className="mini-service">
                <span className="badge badge-category">{s.category}</span>
                <h4>{s.name}</h4>
                <p>{s.description}</p>
                <Link to={`/services/${s._id}`} className="link-more">
                  Details â†’
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
