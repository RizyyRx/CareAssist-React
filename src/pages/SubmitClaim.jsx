import React, { useEffect, useState } from "react";
import axios from "axios";
import CurrentClaims from "../components/CurrentClaims";
import "./SubmitClaim.css";

function SubmitClaim() {
  const [invoices, setInvoices] = useState([]);
  const [plans, setPlans] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const [formData, setFormData] = useState({
    invoiceId: "",
    insurancePlanId: "",
    diagnosis: "",
    treatment: "",
    dateOfService: "",
    medicalDocuments: "",
  });

  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const getInvoices = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/patient/invoices", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvoices(result.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const getInsurancePlans = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/patient/selected-plans", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlans(result.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  useEffect(() => {
    getInvoices();
    getInsurancePlans();
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:8080/api/patient/submit-claim",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(result.data);
      setRefreshTrigger(prev => !prev);
      setFormData({
        invoiceId: "",
        insurancePlanId: "",
        diagnosis: "",
        treatment: "",
        dateOfService: "",
        medicalDocuments: "",
      });
    } catch (error) {
      console.error("Error submitting claim:", error);
      if (error.response) {
        const data = error.response.data;

        if (typeof data === "object") {
            const formatted = Object.values(data).join(", ");
            setMessage(formatted);
        }
        else {
            setMessage(data);
        }
      } else {
        setMessage("Server not reachable.");
      }
    }
  };

  return (
<div className="submit-claim-page">
  <h2>Submit Insurance Claim</h2>

  <div className="claim-form-container">
    <form className="claim-form" onSubmit={handleSubmit}>
      <label htmlFor="invoiceId">Select Invoice</label>
      <select id="invoiceId" name="invoiceId" value={formData.invoiceId} onChange={handleChange} required>
        <option value="">-- Select Invoice --</option>
        {invoices.map((inv) => (
          <option key={inv.invoiceId} value={inv.invoiceId}>
            Invoice #{inv.invoiceId} - ₹{inv.totalAmount} ({inv.status})
          </option>
        ))}
      </select>

      <label htmlFor="insurancePlanId">Select Insurance Plan</label>
      <select id="insurancePlanId" name="insurancePlanId" value={formData.insurancePlanId} onChange={handleChange} required>
        <option value="">-- Select Plan --</option>
        {plans.map((plan) => (
          <option key={plan.planId} value={plan.planId}>
            {plan.planName} (Coverage: ₹{plan.coverageAmount})
          </option>
        ))}
      </select>

      <label htmlFor="diagnosis">Diagnosis</label>
      <input type="text" id="diagnosis" name="diagnosis" placeholder="Diagnosis" value={formData.diagnosis} onChange={handleChange} required />

      <label htmlFor="treatment">Treatment</label>
      <input type="text" id="treatment" name="treatment" placeholder="Treatment" value={formData.treatment} onChange={handleChange} required />

      <label htmlFor="dateOfService">Date of Service</label>
      <input type="date" id="dateOfService" name="dateOfService" value={formData.dateOfService} onChange={handleChange} required />

      <button type="submit">Submit Claim</button>
      {message && <p>{message}</p>}
    </form>
  </div>

  <div className="current-claims-section">
    <CurrentClaims refresh={refreshTrigger} />
  </div>
</div>

  );
}

export default SubmitClaim;
