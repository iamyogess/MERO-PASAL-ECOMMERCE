import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const Register = () => {

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    password: ""
  })

  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center py-4">
        <div className="card p-4" style={{ maxWidth: '600px', width: '90%' }}>
          <h2 className="text-center mb-4">Register</h2>
          <form>

            <div className="row mb-3">
              <div className="col">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" id="firstName" className="form-control" name='firstName' />
              </div>
              <div className="col">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" id="lastName" className="form-control" name='lastName' />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" id="email" className="form-control" name='email' />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input type="tel" id="phoneNumber" className="form-control" name='phone' />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" id="address" className="form-control" name='address' />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" className="form-control" name='password' />
            </div>
            {/* 
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" id="confirmPassword" className="form-control" />
            </div> */}

            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="isAdmin" />
              <label className="form-check-label" htmlFor="isAdmin"> Admin </label>
            </div>

            <div className="d-grid gap-2">
              <button type="button" className="btn btn-primary btn-block">Register</button>
            </div>

            <div className="text-center mt-3">
              <p>Already a member? <Link to="/login">Login</Link></p>
              <Link to="#!">Forgot password?</Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
