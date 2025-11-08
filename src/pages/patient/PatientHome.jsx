import React from "react";
import "./PatientHome.css";

function PatientHome() {
  return (
    <div className="patient-home-container">
      <div className="welcome-section">
        <h1>Welcome Patient</h1>
        <p>
          Welcome to <strong>CareAssist</strong> — your all-in-one healthcare companion.
          <br />
          Manage your medical records, insurance plans, and claims easily in one secure place.
        </p>
      </div>

      <div className="section about-section">
        <h2>About CareAssist</h2>
        <p>
          CareAssist is a modern medical billing and insurance claim management system 
          built to simplify your healthcare journey. Our platform connects patients, 
          healthcare providers, and insurance companies — making the entire process 
          transparent, faster, and hassle-free.
        </p>
        <ul>
          <li>View and manage your medical invoices effortlessly.</li>
          <li>Submit insurance claims online and track their progress in real time.</li>
          <li>Keep your health and insurance records secure and easily accessible.</li>
          <li>Receive instant updates on claim approvals and payments.</li>
        </ul>
      </div>

      <div className="section how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step-box">
            <h3>1. Update Your Profile</h3>
            <p>Keep your personal and medical details up to date for smooth processing.</p>
          </div>
          <div className="step-box">
            <h3>2. Choose an Insurance Plan</h3>
            <p>Select the insurance plan that best suits your healthcare needs.</p>
          </div>
          <div className="step-box">
            <h3>3. Manage Invoices</h3>
            <p>View your invoices, track payment status, and access past records anytime.</p>
          </div>
          <div className="step-box">
            <h3>4. Submit and Track Claims</h3>
            <p>File insurance claims easily and track them from submission to approval.</p>
          </div>
        </div>
      </div>

      <div className="section health-tips">
        <h2>Health and Wellness Tips</h2>
        <ul>
          <li>Get checkups once a period of time to stay ahead of potential health issues.</li>
          <li>Eat a balanced diet and drink plenty of water.</li>
          <li>Stay active — even 30 minutes of walking makes a big difference.</li>
          <li>Prioritize good sleep and mental well-being.</li>
        </ul>
      </div>
    </div>
  );
}

export default PatientHome;
