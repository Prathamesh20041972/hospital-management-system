import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function BookAppointment() {
  const [data, setData] = useState({
    patientName: "",
    patientContact: "",
    doctorName: "",
    date: "",
    time: "",
    queueNumber: 0,
    fees: 500
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const book = async () => {
    if (!data.patientName || !data.patientContact || !data.doctorName || !data.date || !data.time) {
      setMessage("❌ Please fill all fields!");
      return;
    }

    try {
      console.log("Sending appointment data:", data);
      const response = await API.post("/appointments/book", data);
      console.log("Response from server:", response.data);
      
      setMessage("✅ Appointment Booked Successfully!");
      
      // ✅ Wait for API response before redirecting
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (err) {
      console.error("Full error:", err);
      const errorMsg = err.response?.data?.message || err.message || "Unknown error";
      setMessage("❌ Error: " + errorMsg);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={container}>
      {/* Sidebar */}
      <div style={sidebar}>
        <h2>Hospital System</h2>

        <ul style={menu}>
          <li><Link to="/dashboard" style={link}>Dashboard</Link></li>
          <li><Link to="/doctors" style={link}>Doctors</Link></li>
          <li><Link to="/patients" style={link}>Patients</Link></li>
          <li><Link to="/book" style={link}>Appointments</Link></li>
        </ul>

        <button style={logoutBtn} onClick={logout}>Logout</button>
      </div>

      {/* Main Content */}
      <div style={main}>
        <h1>Book Appointment</h1>

        <div style={formBox}>
          <div style={formGroup}>
            <label style={label}>Patient Name:</label>
            <input 
              type="text"
              name="patientName"
              value={data.patientName}
              onChange={handleChange}
              placeholder="Enter patient name"
              style={input} 
            />
          </div>

          <div style={formGroup}>
            <label style={label}>Patient Contact:</label>
            <input 
              type="text"
              name="patientContact"
              value={data.patientContact}
              onChange={handleChange}
              placeholder="Enter phone number"
              style={input} 
            />
          </div>

          <div style={formGroup}>
            <label style={label}>Doctor Name:</label>
            <input 
              type="text"
              name="doctorName"
              value={data.doctorName}
              onChange={handleChange}
              placeholder="Enter doctor name"
              style={input} 
            />
          </div>

          <div style={formGroup}>
            <label style={label}>Date:</label>
            <input 
              type="date"
              name="date"
              value={data.date}
              onChange={handleChange}
              style={input}
            />
          </div>

          <div style={formGroup}>
            <label style={label}>Time:</label>
            <input 
              type="time"
              name="time"
              value={data.time}
              onChange={handleChange}
              style={input}
            />
          </div>

          <div style={formGroup}>
            <label style={label}>Fees:</label>
            <input 
              type="number"
              name="fees"
              value={data.fees}
              onChange={handleChange}
              style={input}
            />
          </div>

          {message && <div style={{...messageBox, backgroundColor: message.includes("❌") ? "#e74c3c" : "#27ae60"}}>{message}</div>}

          <button onClick={book} style={submitBtn}>Book Appointment</button>
        </div>
      </div>
    </div>
  );
}

// 🎨 Styles
const container = { display: "flex", fontFamily: "Arial, sans-serif" };

const sidebar = {
  width: "220px",
  background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
  color: "white",
  height: "100vh",
  padding: "20px",
  position: "fixed",
  boxShadow: "2px 0 8px rgba(0,0,0,0.15)"
};

const menu = { listStyle: "none", padding: 0 };

const link = {
  color: "white",
  textDecoration: "none",
  display: "block",
  margin: "10px 0",
  padding: "10px 12px",
  borderRadius: "4px",
  transition: "all 0.3s",
  cursor: "pointer"
};

const logoutBtn = {
  marginTop: "20px",
  padding: "10px",
  width: "100%",
  background: "#e74c3c",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "4px",
  fontSize: "14px",
  fontWeight: "bold",
  transition: "background 0.3s"
};

const main = {
  marginLeft: "260px",
  flex: 1,
  padding: "30px",
  background: "#ecf0f1",
  minHeight: "100vh"
};

const formBox = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  maxWidth: "500px"
};

const formGroup = {
  marginBottom: "20px"
};

const label = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "bold",
  color: "#2c3e50",
  fontSize: "14px"
};

const input = {
  width: "100%",
  padding: "10px",
  border: "1px solid #bdc3c7",
  borderRadius: "4px",
  fontSize: "14px",
  boxSizing: "border-box",
  transition: "border 0.3s"
};

const submitBtn = {
  width: "100%",
  padding: "12px",
  background: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "background 0.3s"
};

const messageBox = {
  padding: "12px",
  borderRadius: "4px",
  marginBottom: "20px",
  color: "white",
  textAlign: "center",
  fontWeight: "bold"
};

export default BookAppointment;