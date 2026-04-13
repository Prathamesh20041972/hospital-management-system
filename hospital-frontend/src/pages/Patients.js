import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Patients() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await API.get("/patients");
      console.log("✅ Patients fetched:", res.data);
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Error fetching patients:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

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
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h1>Patients</h1>
          <button onClick={fetchPatients} style={refreshBtn}>🔄 Refresh</button>
        </div>

        {loading && <div style={{textAlign: 'center', padding: '20px', color: '#7f8c8d'}}>Loading patients...</div>}

        {/* Table */}
        <div style={tableBox}>
          <div style={{overflowX: 'auto'}}>
            <table style={table}>
              <thead>
                <tr style={thead}>
                  <th style={th}>ID</th>
                  <th style={th}>Name</th>
                  <th style={th}>Contact</th>
                </tr>
              </thead>

              <tbody>
                {data && data.length > 0 ? (
                  data.map((p) => (
                    <tr key={p.id || p.name}>
                      <td style={td}>{p.id || "N/A"}</td>
                      <td style={td}>{p.name || "N/A"}</td>
                      <td style={td}>{p.contact || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{...td, textAlign: 'center'}}>No patients found</td>
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
  minWidth: "600px"
};

const thead = { background: "#34495e", color: "white" };

const th = { padding: "12px", border: "1px solid #ddd", textAlign: "left", fontWeight: "bold" };

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

export default Patients;