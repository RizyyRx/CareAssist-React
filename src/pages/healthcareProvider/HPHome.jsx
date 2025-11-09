import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";
import "./HPHome.css";
import axios from "axios";

function HPHome() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsername = async () => {
      if (!user?.username) return; 
      try {
        const response = await axios.get(
          `http://localhost:8080/api/auth/get-username/${user.username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDisplayName(response.data);
      } catch (error) {
        console.error("Error fetching username:", error);
        setDisplayName(user.username); 
      }
    };

    fetchUsername();
  }, [user, token]);

  return (
    <div className="hp-home-container">
      <div className="welcome-section">
        <h1>Welcome Healthcare Provider{displayName ? `, ${displayName}` : ""}</h1>
        <p>
          Welcome to <strong>CareAssist</strong> — a unified platform for managing
          medical billing and patient records with ease.  
          <br />
          Generate invoices, track their status, and view patient details — all in one secure place.
        </p>
      </div>

      <div className="section about-section">
        <h2>About CareAssist</h2>
        <p>
          CareAssist simplifies healthcare operations by bridging the gap between
          providers, patients, and insurance companies. It ensures accuracy,
          transparency, and faster claim processing for all parties involved.
        </p>
        <ul>
          <li>Create accurate invoices instantly for patients.</li>
          <li>Monitor payment and claim progress in real time.</li>
          <li>Maintain digital access to patient profiles and histories.</li>
          <li>Reduce paperwork and speed up reimbursement cycles.</li>
        </ul>
      </div>

      <div className="section how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step-box">
            <h3>1. Create Patient Invoice</h3>
            <p>
              Quickly generate invoices for consultations, treatments, or medical
              services — all with structured patient and fee details.
            </p>
          </div>

          <div className="step-box">
            <h3>2. Track Invoice Status</h3>
            <p>
              Stay updated on your submitted invoices — view payment progress and claim status in real time.
            </p>
          </div>

          <div className="step-box">
            <h3>3. View Patient Details</h3>
            <p>
              Access patient information securely, including medical history and
              contact details, for accurate record-keeping.
            </p>
          </div>
        </div>
      </div>

      <div className="section benefits-section">
        <h2>Why Use CareAssist?</h2>
        <ul>
          <li>Enhances efficiency in hospital billing processes.</li>
          <li>Minimizes manual errors through automation.</li>
          <li>Improves coordination between patients and insurers.</li>
          <li>Ensures secure and organized data management.</li>
        </ul>
      </div>
    </div>
  );
}

export default HPHome;
