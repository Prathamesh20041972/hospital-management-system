import { useState } from "react";
import API from "../services/api";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "PATIENT"
  });

  const handleRegister = async () => {
    await API.post("/auth/register", user);
    alert("Registered!");
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name"
        onChange={e => setUser({...user, name: e.target.value})} />
      <input placeholder="Email"
        onChange={e => setUser({...user, email: e.target.value})} />
      <input placeholder="Password" type="password"
        onChange={e => setUser({...user, password: e.target.value})} />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;