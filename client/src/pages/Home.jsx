import { Link } from 'react-router-dom';
import '../styles/home.css';

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <span className="hero-badge">For International Students</span>
            <h1>Your Guide to Starting Life in India</h1>
            <p className="hero-sub">
              Simple, reliable guidance for international students arriving and
              settling in India.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-lg">Get Started</Link>
              <Link to="/guides" className="btn btn-outline btn-lg">Explore Arrival Guide</Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-art-card">
              <span>Visa</span>
              <span>Housing</span>
              <span>Bank</span>
              <span>SIM</span>
              <span>Transport</span>
              <span>Health</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Why Use This Portal?</h2>
        <p className="section-sub">Everything you need in one place - organized, practical, and student-focused.</p>
        <div className="grid grid-4">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Structured Guides</h3>
            <p>Step-by-step checklists for before, during, and after arrival.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Trusted Services</h3>
            <p>Searchable listings for housing, banks, SIM, healthcare.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Save Resources</h3>
            <p>Bookmark guides and services for quick access later.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏛️</div>
            <h3>Official Links</h3>
            <p>Direct links to MEA, Ministry of Education, UGC, and more.</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <h2 className="section-title">Before You Arrive</h2>
        <div className="grid grid-3">
          <div className="mini-card">
            <span>🛂</span>
            <h4>Visa and Passport</h4>
            <p>Know your documents before you book the flight.</p>
          </div>
          <div className="mini-card">
            <span>🎓</span>
            <h4>Admission Papers</h4>
            <p>Originals, copies, and digital backups.</p>
          </div>
          <div className="mini-card">
            <span>🏠</span>
            <h4>Accommodation</h4>
            <p>Hostel or rental - decide early.</p>
          </div>
        </div>
        <div className="section-cta">
          <Link to="/guides?category=pre-arrival" className="btn btn-primary">See all pre-arrival guides</Link>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">After You Arrive</h2>
        <div className="grid grid-3">
          <div className="mini-card">
            <span>🏦</span>
            <h4>Bank Account</h4>
            <p>Open a student account quickly.</p>
          </div>
          <div className="mini-card">
            <span>📱</span>
            <h4>SIM Card</h4>
            <p>Get connected with a local number.</p>
          </div>
          <div className="mini-card">
            <span>🏥</span>
            <h4>Healthcare</h4>
            <p>Know nearby clinics and emergency numbers.</p>
          </div>
        </div>
        <div className="section-cta">
          <Link to="/guides?category=post-arrival" className="btn btn-primary">See all post-arrival guides</Link>
        </div>
      </section>

      <section className="section section-alt">
        <h2 className="section-title">Essential Services</h2>
        <p className="section-sub">Browse by category and city - with verified official links where possible.</p>
        <div className="grid grid-4">
          <Link to="/services?category=Accommodation" className="cat-tile"><span className="cat-icon">🏠</span><span className="cat-label">Accommodation</span></Link>
          <Link to="/services?category=Healthcare" className="cat-tile"><span className="cat-icon">🏥</span><span className="cat-label">Healthcare</span></Link>
          <Link to="/services?category=Transportation" className="cat-tile"><span className="cat-icon">🚆</span><span className="cat-label">Transportation</span></Link>
          <Link to="/services?category=Banking" className="cat-tile"><span className="cat-icon">🏦</span><span className="cat-label">Banking</span></Link>
          <Link to="/services?category=SIM/Telecom" className="cat-tile"><span className="cat-icon">📱</span><span className="cat-label">SIM/Telecom</span></Link>
          <Link to="/services?category=Emergency Services" className="cat-tile"><span className="cat-icon">☎️</span><span className="cat-label">Emergency</span></Link>
          <Link to="/services?category=Utilities" className="cat-tile"><span className="cat-icon">💡</span><span className="cat-label">Utilities</span></Link>
          <Link to="/services?category=Student Support" className="cat-tile"><span className="cat-icon">🎓</span><span className="cat-label">Student Support</span></Link>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="grid grid-3">
          <div className="mini-card">
            <h4>Do I need a student visa?</h4>
            <p>Most international students do. Check official sources.</p>
          </div>
          <div className="mini-card">
            <h4>What is the emergency number?</h4>
            <p>Dial 112 - police, fire, and ambulance.</p>
          </div>
          <div className="mini-card">
            <h4>How do I open a bank account?</h4>
            <p>Bring passport, visa, admission letter, and photos.</p>
          </div>
        </div>
        <div className="section-cta">
          <Link to="/faqs" className="btn btn-outline">Browse all FAQs</Link>
        </div>
      </section>

      <section className="emergency-banner">
        <div className="emergency-inner">
          <span className="emergency-icon">🚨</span>
          <div>
            <h3>Emergency in India? Dial 112</h3>
            <p>Unified number for Police, Fire, and Ambulance services.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Important Official Resources</h2>
        <div className="grid grid-3">
          <a href="https://www.mea.gov.in/" target="_blank" rel="noreferrer" className="official-card">
            <h4>Ministry of External Affairs</h4>
            <p>mea.gov.in</p>
          </a>
          <a href="https://www.education.gov.in/" target="_blank" rel="noreferrer" className="official-card">
            <h4>Ministry of Education</h4>
            <p>education.gov.in</p>
          </a>
          <a href="https://www.ugc.gov.in/" target="_blank" rel="noreferrer" className="official-card">
            <h4>University Grants Commission</h4>
            <p>ugc.gov.in</p>
          </a>
        </div>
      </section>
    </div>
  );
}
