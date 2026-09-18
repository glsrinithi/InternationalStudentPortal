import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { guideAPI, savedAPI } from '../services/api';
import '../styles/guides.css';
import { useToast } from '../context/ToastContext.jsx';
import Loader from '../components/Loader.jsx';

export default function GuideDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await guideAPI.get(id);
        setGuide(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Guide not found');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  useEffect(() => {
    if (!user) return;
    savedAPI.list().then((r) => {
      setSaved(r.data.some((s) => s.resourceId === id && s.resourceType === 'Guide'));
    }).catch(() => {});
  }, [user, id]);

  const handleSave = async () => {
    if (!user) {
      toast.error('Please log in to save guides');
      return;
    }
    if (saved) return;
    try {
      await savedAPI.add({ resourceType: 'Guide', resourceId: id });
      setSaved(true);
      toast.success('Guide saved');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Could not save');
    }
  };

  if (loading) return <Loader label="Loading guide..." />;

  if (error)
    return (
      <div className="error-page">
        <h2>ðŸ˜• {error}</h2>
        <Link to="/guides" className="btn btn-outline">
          Back to guides
        </Link>
      </div>
    );

  return (
    <article className="guide-detail">
      <Link to="/guides" className="back-link">
        â† Back to guides
      </Link>

      <header className="guide-detail-head">
        <div className="guide-detail-icon">{guide.icon || 'ðŸ“˜'}</div>
        <span className="badge badge-category">{guide.category}</span>
        <h1>{guide.title}</h1>
        <p>{guide.description}</p>
        <button
          className={`btn ${saved ? 'btn-ghost' : 'btn-primary'}`}
          onClick={handleSave}
          disabled={saved}
        >
          {saved ? 'â˜… Saved' : 'â˜† Save this guide'}
        </button>
      </header>

      <div className="guide-steps">
        {guide.steps?.map((step, idx) => (
          <section key={idx} className="guide-step">
            <div className="guide-step-num">{idx + 1}</div>
            <div className="guide-step-body">
              <h3>{step.title}</h3>
              <p>{step.description}</p>

              {step.documents?.length > 0 && (
                <div className="guide-block">
                  <h4>ðŸ“„ Required Documents</h4>
                  <ul>
                    {step.documents.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}

              {step.tips?.length > 0 && (
                <div className="guide-block">
                  <h4>ðŸ’¡ Tips</h4>
                  <ul>
                    {step.tips.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}

              {step.resources?.length > 0 && (
                <div className="guide-block">
                  <h4>ðŸ”— Official Resources</h4>
                  <ul>
                    {step.resources.map((r, i) => (
                      <li key={i}>
                        <a href={r.url} target="_blank" rel="noreferrer">
                          {r.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {guide.resources?.length > 0 && (
        <section className="guide-footer">
          <h3>Further Resources</h3>
          <ul>
            {guide.resources.map((r, i) => (
              <li key={i}>
                <a href={r.url} target="_blank" rel="noreferrer">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="guide-disclaimer">
        âš ï¸ Information may change. Always verify visa, immigration, and legal
        details with official government sources.
      </div>
    </article>
  );
}
