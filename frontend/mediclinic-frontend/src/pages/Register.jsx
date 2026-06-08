import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { resetSuccess } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  // ✅ handle success + error
  useEffect(() => {
  if (success) {
    toast.success("Account created successfully 🎉");

    setForm({
      name: "",
      email: "",
      password: "",
      role: "patient",
    });
    dispatch(resetSuccess());
    navigate("/login");
  }

  if (error) {
    toast.error(error);
  }
}, [success, error, navigate]);
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
           <p className="auth-switch">
  Already have an account?{" "}
  <span onClick={() => navigate("/login")}>
    Login
  </span>
</p>
        </form>
      </div>
     
    </div>
  );
};

export default Register;