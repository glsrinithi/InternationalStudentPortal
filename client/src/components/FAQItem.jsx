import { useState } from 'react';

export default function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button
        className="faq-question"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="faq-question-text">{faq.question}</span>
        <span className="faq-chevron" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>

      {open && (
        <div className="faq-answer">
          <p>{faq.answer}</p>
          <span className="faq-category">Category: {faq.category}</span>
        </div>
      )}
    </div>
  );
}