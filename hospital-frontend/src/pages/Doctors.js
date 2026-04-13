import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Doctors() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await API.get("/doctors");
      console.log("✅ Doctors fetched:", res.data);
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Error fetching doctors:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
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
          <h1>Doctors</h1>
          <button onClick={fetchDoctors} style={refreshBtn}>🔄 Refresh</button>
        </div>

        {loading && <div style={{textAlign: 'center', padding: '20px', color: '#7f8c8d'}}>Loading doctors...</div>}

        {/* Table */}
        <div style={tableBox}>
          <div style={{overflowX: 'auto'}}>
            <table style={table}>
              <thead>
                <tr style={thead}>
                  <th style={th}>ID</th>
                  <th style={th}>Name</th>
                  <th style={th}>Specialization</th>
                </tr>
              </thead>

              <tbody>
                {data && data.length > 0 ? (
                  data.map((d) => (
                    <tr key={d.id || d.name}>
                      <td style={td}>{d.id || "N/A"}</td>
                      <td style={td}>{d.name || "N/A"}</td>
                      <td style={td}>{d.specialization || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{...td, textAlign: 'center'}}>No doctors found</td>
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
  background: "#2c3e50",
  color: "white",
  height: "100vh",
  padding: "20px",
  position: "fixed",
  boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
};

const menu = { listStyle: "none", padding: 0 };

const link = {
  color: "white",
  textDecoration: "none",
  display: "block",
  margin: "10px 0",
  padding: "10px 12px",
  borderRadius: "4px",
  transition: "background 0.3s",
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
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
};

const table = { 
  width: "100%", 
  borderCollapse: "collapse",
  fontSize: "13px",
  minWidth: "600px"
};

const thead = { background: "#34495e", color: "white" };

const th = { padding: "12px", border: "1px solid #ddd", textAlign: "left", fontWeight: "bold" };

const td = { padding: "10px", border: "1px solid #ddd" };

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

export default Doctors;