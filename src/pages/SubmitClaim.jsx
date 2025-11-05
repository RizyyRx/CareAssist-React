import React, { useEffect, useState } from "react";
import axios from "axios";
import CurrentClaims from "../components/CurrentClaims";

function SubmitClaim() {
  const [invoices, setInvoices] = useState([]);
  const [plans, setPlans] = useState([]);
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
        setMessage(error.response.data.message || "Failed to submit claim.");
      } else {
        setMessage("Server not reachable.");
      }
    }
  };

  return (
    <div>
      <h2>Submit Insurance Claim</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <select name="invoiceId" value={formData.invoiceId} onChange={handleChange} required>
          <option value="">-- Select Invoice --</option>
          {invoices.map((inv) => (
            <option key={inv.invoiceId} value={inv.invoiceId}>
              Invoice #{inv.invoiceId} - ₹{inv.totalAmount} ({inv.status})
            </option>
          ))}
        </select>
        <select name="insurancePlanId" value={formData.insurancePlanId} onChange={handleChange} required>
          <option value="">-- Select Plan --</option>
          {plans.map((plan) => (
            <option key={plan.planId} value={plan.planId}>
              {plan.planName} (Coverage: ₹{plan.coverageAmount})
            </option>
          ))}
        </select>
        <input type="text" name="diagnosis" placeholder="Diagnosis" value={formData.diagnosis} onChange={handleChange} required />
        <input type="text" name="treatment" placeholder="Treatment" value={formData.treatment} onChange={handleChange} required />
        <input type="date" name="dateOfService" value={formData.dateOfService} onChange={handleChange} required />
        <button type="submit">Submit Claim</button>
      </form>
      {<CurrentClaims/>}
    </div>
  );
}

export default SubmitClaim;
