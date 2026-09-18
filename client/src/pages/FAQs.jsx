import { useEffect, useState } from 'react';
import '../styles/faq.css';
import FAQItem from '../components/FAQItem.jsx';
import Loader from '../components/Loader.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { FAQ_CATEGORIES } from '../utils/cities.js';

export default function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category) params.category = category;
        if (search) params.search = search;
        const res = await faqAPI.list(params);
        setFaqs(res.data);
      } catch {
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category, search]);

  return (
    <div className="faq-page">
      <header className="page-header">
        <h1>Frequently Asked Questions</h1>
        <p>Quick answers to common questions from international students.</p>
      </header>

      <div className="filters">
        <input
          type="text"
          className="search-input"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="chip-row">
          <button
            className={`chip ${category === '' ? 'active' : ''}`}
            onClick={() => setCategory('')}
          >
            All
          </button>
          {FAQ_CATEGORIES.map((c) => (
            <button
              key={c}
              className={`chip ${category === c ? 'active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader label="Loading FAQs..." />
      ) : faqs.length === 0 ? (
        <EmptyState
          title="No FAQs found"
          message="Try a different search or category."
          icon="â“"
        />
      ) : (
        <div className="faq-list">
          {faqs.map((f) => (
            <FAQItem key={f._id} faq={f} />
          ))}
        </div>
      )}
    </div>
  );
}
