import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [resetData, setResetData] = useState({
    email: "",
    newPassword: "",
    answer:""
  });

  const handleReset = (e) => {
    const { name, value } = e.target;
    setResetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/forgot-password/",
        resetData
      );
      if (res && res.data.success) {
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
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="card p-4" style={{ maxWidth: "600px", width: "90%" }}>
          <h2 className="text-center mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                name="email"
                onChange={handleReset}
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
                onChange={handleReset}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
              New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                name="newPassword"
                onChange={handleReset}
              />
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-block">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
