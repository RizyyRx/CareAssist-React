import React from "react";
import { useAuth } from "../../components/AuthContext";
import "./ICHome.css";

function ICHome() {
  const { user } = useAuth();

  return (
    <div className="ic-home-container">
      <div className="welcome-section">
        <h1>Welcome Insurance Partner</h1>
        <p>
          Welcome to <strong>CareAssist</strong> — the complete insurance claim
          management and billing solution.
          <br />
          Simplify claim approvals, manage insurance plans, and process
          payments with ease and accuracy.
        </p>
      </div>

      <div className="section about-section">
        <h2>About CareAssist for Insurance Companies</h2>
        <p>
          CareAssist empowers insurance companies to handle medical claims
          digitally and transparently. It connects insurers, healthcare
          providers, and patients — creating a smooth workflow that ensures
          quick claim settlements and minimal manual effort.
        </p>
        <ul>
          <li>Create and manage insurance plans effortlessly.</li>
          <li>Review claims submitted by patients and verify supporting data.</li>
          <li>Approve, reject, or request additional details in one place.</li>
          <li>Process payments securely and maintain full transaction history.</li>
        </ul>
      </div>

      <div className="section how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step-box">
            <h3>1. Create Insurance Plans</h3>
            <p>
              Design and publish insurance plans with customizable coverage,
              premium, and policy terms to meet your customer needs.
            </p>
          </div>
          <div className="step-box">
            <h3>2. Review and Approve Claims</h3>
            <p>
              Evaluate claim details, verify documents, and make quick approval
              or rejection decisions with complete visibility.
            </p>
          </div>
          <div className="step-box">
            <h3>3. Process Payments</h3>
            <p>
              Approve approved claims and process reimbursements instantly,
              keeping patients and providers informed in real time.
            </p>
          </div>
        </div>
      </div>

      <div className="section benefits-section">
        <h2>Why Use CareAssist?</h2>
        <ul>
          <li>Faster claim approvals with automated workflows.</li>
          <li>Reduced manual errors and paperwork.</li>
          <li>Secure data handling with full audit trails.</li>
          <li>Improved coordination between insurers and hospitals.</li>
        </ul>
      </div>
    </div>
  );
}

export default ICHome;
