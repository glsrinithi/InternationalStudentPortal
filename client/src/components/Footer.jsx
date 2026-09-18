import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h4>India Student Guide</h4>
          <p>
            Simple, reliable guidance for international students arriving and
            settling in India.
          </p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/guides">Arrival Guide</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Official Resources</h4>
          <ul>
            <li><a href="https://www.mea.gov.in/" target="_blank" rel="noreferrer">Ministry of External Affairs</a></li>
            <li><a href="https://www.education.gov.in/" target="_blank" rel="noreferrer">Ministry of Education</a></li>
            <li><a href="https://www.ugc.gov.in/" target="_blank" rel="noreferrer">UGC</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Emergency</h4>
          <p><strong>Dial 112</strong> - Police, Fire, Ambulance</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          (c) {new Date().getFullYear()} India Student Guide. This portal is not
          an official government service. Always verify visa/immigration
          information with official sources.
        </p>
      </div>
    </footer>
  );
}
