import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const Login = () => {
  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="card p-4" style={{ maxWidth: '600px', width: '90%' }}>
          <h2 className="text-center mb-4">Login</h2>
          <form>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" id="email" className="form-control" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" className="form-control" />
            </div>

            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe"> Remember me </label>
            </div>

            <div className="d-grid gap-2">
              <button type="button" className="btn btn-primary btn-block">Login</button>
            </div>

            <div className="text-center mt-3">
              <p>New user? <Link to="/register">Register</Link></p>
              <Link to="#!">Forgot password?</Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
