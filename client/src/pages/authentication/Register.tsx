import { useState, useEffect } from "react";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {};
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="username"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        <button type="submit" className="btn-login">
          Sign In
        </button>

        <div className="form-footer">
          <a href="#">Forgot Password?</a>
        </div>
      </form>
      <div className="animation-bg"></div>
    </div>
  );
};

export default Register;
