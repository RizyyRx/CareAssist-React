import React from "react";
import HomeNav from "../components/HomeNav";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <HomeNav />

      <section className="hero-section">
        <h1>Welcome to CareAssist</h1>
        <p>
          Your trusted platform for managing medical billing, insurance, and claims
          — all in one place.  
          CareAssist connects patients, healthcare providers, and insurance companies
          seamlessly to simplify healthcare operations.
        </p>
      </section>

      <section className="features-section">
        <h2>Why Choose CareAssist?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>For Patients</h3>
            <p>
              Easily manage your insurance plans, view invoices, and track claims
              with complete transparency and ease.
            </p>
          </div>
          <div className="feature-card">
            <h3>For Healthcare Providers</h3>
            <p>
              Create and manage invoices, view patient information, and streamline
              billing — all from one dashboard.
            </p>
          </div>
          <div className="feature-card">
            <h3>For Insurance Companies</h3>
            <p>
              Review and approve claims, process payments, and maintain detailed
              policy and plan records efficiently.
            </p>
          </div>
        </div>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          At <strong>CareAssist</strong>, we aim to eliminate the complexity of
          healthcare billing and claims.  
          We bring together technology, transparency, and trust to ensure a
          smooth, secure, and efficient healthcare experience for everyone.
        </p>
      </section>

      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p>
          Have questions or need support? We’re here to help you every step of the way.
        </p>
        <p>Email: <a href="mailto:support@careassist.com">support@careassist.com</a></p>
        <p>Phone: +91 12345 67890</p>
      </section>

      <footer className="footer">
        <p>© 2025 CareAssist. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
