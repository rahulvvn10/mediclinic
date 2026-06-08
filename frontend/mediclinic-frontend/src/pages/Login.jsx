import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate,Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  
  useEffect(() => {
    if (user) {
      toast.success("Login successful");

      // clear form
      setForm({ email: "", password: "" });

      // role-based navigation
      const roleRoutes = {
        admin: "/admin",
        doctor: "/doctor",
        patient: "/patient",
      };

      navigate(roleRoutes[user.role] || "/");
    }

    if (error) {
      toast.error(error);
    }
  }, [user, error, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
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
           <div className="forgot-password">
    <span onClick={() => navigate("/forgot-password")}>
      Forgot Password?
    </span>
  </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="reg">
  <p>
    Don't have an account?
    <Link to="/register">
      Register
    </Link>
  </p>
</div>
        </form>
      </div>
    </div>
  );
};

export default Login;