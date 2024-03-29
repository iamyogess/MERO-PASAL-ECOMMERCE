import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    password: "",
    answer: "",
  });

  const handleRegister = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/register/",
        registerData
      );
      if (res.data.success === true) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center py-4">
        <div className="card p-4" style={{ maxWidth: "600px", width: "90%" }}>
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  name="firstName"
                  onChange={handleRegister}
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  name="lastName"
                  onChange={handleRegister}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                name="email"
                onChange={handleRegister}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="form-control"
                name="phone"
                onChange={handleRegister}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="form-control"
                name="address"
                onChange={handleRegister}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="answer" className="form-label">
                What is your school principal's name?
              </label>
              <input
                type="text"
                id="answer"
                className="form-control"
                name="answer"
                onChange={handleRegister}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                name="password"
                onChange={handleRegister}
                required
              />
            </div>
            {/* 
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" id="confirmPassword" className="form-control" />
            </div> */}

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isAdmin"
              />
              <label className="form-check-label" htmlFor="isAdmin">
                Admin
              </label>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            </div>

            <div className="text-center mt-3">
              <p>
                Already a member? <Link to="/login">Login</Link>
              </p>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
