import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API from "../services/api";

function Dashboard() {

  // ✅ STATE (DATA)
  const [patients, setPatients] = useState(0);
  const [doctors, setDoctors] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH DATA FUNCTION
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch counts and revenue
      const pRes = await API.get("/patients/count").catch(() => ({ data: 0 }));
      const dRes = await API.get("/doctors/count").catch(() => ({ data: 0 }));
      const rRes = await API.get("/appointments/revenue").catch(() => ({ data: 0 }));
      
      setPatients(pRes.data || 0);
      setDoctors(dRes.data || 0);
      setRevenue(rRes.data || 0);

      // Try to fetch appointments - with error handling
      try {
        const aRes = await API.get("/appointments");
        console.log("✅ Fetched appointments:", aRes.data);
        setAppointments(Array.isArray(aRes.data) ? aRes.data : []);
      } catch (appointmentError) {
        console.error("❌ Error fetching appointments:", appointmentError);
        console.log("Trying alternative approach...");
        
        // Fallback: Just show appointment count without details
        try {
          const countRes = await API.get("/appointments/count");
          console.log("Appointment count:", countRes.data);
        } catch (e) {
          console.error("❌ Could not fetch appointment count:", e);
        }
        setAppointments([]); // Set empty array so UI doesn't break
      }
    } catch (err) {
      console.error("❌ Error fetching dashboard data:", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h1>Dashboard</h1>
          <button onClick={fetchData} style={refreshBtn}>🔄 Refresh</button>
        </div>

        {loading && <div style={{textAlign: 'center', padding: '20px', color: '#7f8c8d'}}>Loading...</div>}

        {/* Cards (Dynamic) */}
        <div style={cardContainer}>
          <div style={card}>Patients: {patients}</div>
          <div style={card}>Doctors: {doctors}</div>
          <div style={card}>Appointments: {appointments.length}</div>
          <div style={card}>Revenue: ₹{revenue}</div>
        </div>

        {/* Table (Dynamic) */}
        <div style={tableBox}>
          <h2>Appointments</h2>

          <div style={{overflowX: 'auto'}}>
            <table style={table}>
              <thead>
                <tr style={thead}>
                  <th style={th}>Patient</th>
                  <th style={th}>Contact</th>
                  <th style={th}>Date</th>
                  <th style={th}>Time</th>
                  <th style={th}>Doctor</th>
                  <th style={th}>Queue</th>
                  <th style={th}>Fees</th>
                  <th style={th}>Status</th>
                </tr>
              </thead>

              <tbody>
                {appointments && appointments.length > 0 ? (
                  appointments.map((a, i) => (
                    <tr key={i} style={{
                      background: i % 2 === 0 ? '#f9f9f9' : 'white',
                      transition: 'background 0.2s',
                      cursor: 'pointer'
                    }} 
                    onMouseOver={(e) => e.currentTarget.style.background = '#e8f4f8'}
                    onMouseOut={(e) => e.currentTarget.style.background = i % 2 === 0 ? '#f9f9f9' : 'white'}
                    >
                      <td style={td}><strong>{a.patientName || "N/A"}</strong></td>
                      <td style={td}>{a.patientContact || "N/A"}</td>
                      <td style={td}>{a.date || "N/A"}</td>
                      <td style={td}>{a.time || "N/A"}</td>
                      <td style={td}>{a.doctorName || "N/A"}</td>
                      <td style={{...td, textAlign: 'center'}}>{a.queueNumber || "N/A"}</td>
                      <td style={{...td, textAlign: 'right'}}><strong>₹{typeof a.fees === 'number' ? a.fees : 0}</strong></td>
                      <td style={{...td, textAlign: 'center'}}>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          backgroundColor: 
                            a.status === 'Completed' ? '#27ae60' : 
                            a.status === 'CANCELLED' ? '#e74c3c' : 
                            a.status === 'ACTIVE' ? '#3498db' : '#95a5a6',
                          color: 'white',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          whiteSpace: 'nowrap',
                          display: 'inline-block'
                        }}>
                          ● {a.status || "ACTIVE"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{...td, textAlign: 'center', padding: '30px', color: '#7f8c8d'}}>
                      <strong>No appointments found</strong>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

// 🔐 Logout
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

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

const cardContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "30px"
};

const card = {
  background: "white",
  padding: "25px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  fontSize: "18px",
  fontWeight: "bold",
  color: "#2c3e50",
  border: "2px solid transparent",
  transition: "all 0.3s"
};

const tableBox = {
  background: "white",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const table = { 
  width: "100%", 
  borderCollapse: "collapse",
  fontSize: "13px",
  minWidth: "900px"
};

const thead = { background: "#34495e", color: "white" };

const th = { padding: "12px", border: "1px solid #ddd", textAlign: "left", fontWeight: "bold", minWidth: "80px" };

const td = { padding: "12px", border: "1px solid #ddd" };

const refreshBtn = {
  padding: "10px 20px",
  background: "#27ae60",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "bold",
  transition: "background 0.3s"
};

export default Dashboard;