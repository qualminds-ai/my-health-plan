import React, { useState } from 'react';
import PropTypes from 'prop-types';
import authService from '../services/authService';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.login(formData);
      onLogin(response.user, response.token);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="login-page" className="min-h-screen flex">
      {/* Left Side - Login Form - 618px out of 1440px = ~43% */}
      <div id="login-form-section" className="bg-white flex flex-col" style={{ width: '42.9%' }}>        <div className="flex-1 flex items-center justify-center px-12 py-12">
        <div className="w-full max-w-xl">            {/* Logo and Header */}
          <div id="login-header" className="mb-12 text-center">
            <div className="flex items-center justify-center">
              <svg
                id="login-logo-icon"
                width="56" height="57" viewBox="0 0 56 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
                <path d="M50.6818 28.4136H44.9686C43.9618 28.4114 42.982 28.7391 42.179 29.3465C41.3761 29.9539 40.7942 30.8076 40.5224 31.777L35.1087 51.036C35.0738 51.1556 35.001 51.2607 34.9013 51.3355C34.8017 51.4102 34.6804 51.4506 34.5558 51.4506C34.4312 51.4506 34.3099 51.4102 34.2102 51.3355C34.1105 51.2607 34.0378 51.1556 34.0029 51.036L21.2864 5.79113C21.2515 5.6715 21.1788 5.56642 21.0791 5.49165C20.9794 5.41688 20.8581 5.37646 20.7335 5.37646C20.6089 5.37646 20.4877 5.41688 20.388 5.49165C20.2883 5.56642 20.2155 5.6715 20.1806 5.79113L14.7669 25.0501C14.4962 26.0157 13.9177 26.8666 13.1195 27.4737C12.3212 28.0807 11.3467 28.4107 10.3438 28.4136H4.60757" stroke="#2563EB" strokeWidth="4.60741" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h1
                id="login-brand-title"
                style={{ color: '#2563EB', fontSize: '37.231px', fontWeight: '700', lineHeight: 'normal' }}>
                MyHealthPlan
              </h1>
            </div>
          </div>          {/* Login Form */}
          <form id="login-form" onSubmit={handleSubmit} className="space-y-6">            {/* Form Container - Centers all elements */}
            <div className="flex flex-col items-center">              {/* Email Field */}
              <div id="email-field-container" className="relative mb-6">
                <svg
                  id="email-icon"
                  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                  style={{ position: 'absolute', left: '-32px', top: '50%', transform: 'translateY(-50%)', aspectRatio: '1/1' }}>
                  <path d="M8 8C8.69223 8 9.36892 7.79473 9.9445 7.41015C10.5201 7.02556 10.9687 6.47894 11.2336 5.83939C11.4985 5.19985 11.5678 4.49612 11.4327 3.81719C11.2977 3.13825 10.9644 2.51461 10.4749 2.02513C9.98539 1.53564 9.36175 1.2023 8.68282 1.06725C8.00388 0.932205 7.30015 1.00152 6.66061 1.26642C6.02107 1.53133 5.47444 1.97993 5.08986 2.55551C4.70527 3.13108 4.5 3.80777 4.5 4.5C4.5 5.42826 4.86875 6.3185 5.52513 6.97487C6.1815 7.63125 7.07174 8 8 8ZM8 9C5.83063 9 1.5 10.34 1.5 13V15H14.5V13C14.5 10.34 10.1694 9 8 9Z" fill="#8A8BA8" />
                </svg>
                <input
                  id="email-input"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="focus:outline-none transition-colors duration-200"
                  placeholder="EMAIL*"
                  disabled={isLoading}
                  style={{
                    width: '484px',
                    height: '65px',
                    border: '1px solid #B7BABA',
                    background: '#F4F6F5',
                    color: '#2563EB',
                    fontFamily: 'Inter',
                    fontSize: '15.3px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: 'normal',
                    paddingLeft: '20px',
                    paddingRight: '20px'
                  }}
                />
              </div>              {/* Password Field */}
              <div id="password-field-container" className="relative mb-10">
                <svg
                  id="password-icon"
                  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                  style={{ position: 'absolute', left: '-32px', top: '50%', transform: 'translateY(-50%)', aspectRatio: '1/1' }}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.00001 2.28571C7.3938 2.28571 6.81242 2.52653 6.38376 2.95518C5.95511 3.38384 5.71429 3.96522 5.71429 4.57143V5.71429H10.2857V4.57143C10.2857 3.96522 10.0449 3.38384 9.61625 2.95518C9.1876 2.52653 8.60622 2.28571 8.00001 2.28571ZM3.42858 4.57143V5.71429C2.97392 5.71429 2.53789 5.8949 2.2164 6.21639C1.89491 6.53788 1.71429 6.97392 1.71429 7.42857V14.2857C1.71429 14.7404 1.89491 15.1764 2.2164 15.4979C2.53789 15.8194 2.97392 16 3.42858 16H12.5714C13.0261 16 13.4621 15.8194 13.7836 15.4979C14.1051 15.1764 14.2857 14.7404 14.2857 14.2857V7.42857C14.2857 6.97392 14.1051 6.53788 13.7836 6.21639C13.4621 5.8949 13.0261 5.71429 12.5714 5.71429V4.57143C12.5714 3.35901 12.0898 2.19625 11.2325 1.33894C10.3752 0.481631 9.21243 0 8.00001 0C6.78759 0 5.62483 0.481631 4.76752 1.33894C3.91021 2.19625 3.42858 3.35901 3.42858 4.57143ZM8.00001 12.2857C8.18761 12.2857 8.37338 12.2488 8.5467 12.177C8.72002 12.1052 8.87751 12 9.01016 11.8673C9.14282 11.7346 9.24804 11.5772 9.31984 11.4038C9.39163 11.2305 9.42858 11.0447 9.42858 10.8571C9.42858 10.6695 9.39163 10.4838 9.31984 10.3105C9.24804 10.1371 9.14282 9.97965 9.01016 9.84699C8.87751 9.71434 8.72002 9.60911 8.5467 9.53732C8.37338 9.46552 8.18761 9.42857 8.00001 9.42857C7.62113 9.42857 7.25776 9.57908 6.98986 9.84699C6.72195 10.1149 6.57144 10.4783 6.57144 10.8571C6.57144 11.236 6.72195 11.5994 6.98986 11.8673C7.25776 12.1352 7.62113 12.2857 8.00001 12.2857Z" fill="#8A8BA8" />
                </svg>
                <input
                  id="password-input"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="focus:outline-none transition-colors duration-200"
                  placeholder="PASSWORD*"
                  disabled={isLoading}
                  style={{
                    width: '484px',
                    height: '65px',
                    border: '1px solid #B7BABA',
                    background: '#F4F6F5',
                    color: '#2563EB',
                    fontFamily: 'Inter',
                    fontSize: '15.3px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: 'normal',
                    paddingLeft: '20px',
                    paddingRight: '50px'
                  }}
                />
                <button
                  id="password-visibility-toggle"
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="26" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#8A8BA8" />
                    </svg>
                  ) : (
                    <svg width="26" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#8A8BA8" />
                      <path d="M2 2l20 20" stroke="#8A8BA8" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded p-3 mb-6" style={{ width: '484px' }}>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}              {/* Login Button */}
              <button
                id="login-submit-button"
                type="submit"
                disabled={isLoading}
                className="focus:outline-none transition-colors duration-200 mb-3"
                style={{
                  width: '481px',
                  height: '57px',
                  backgroundColor: '#2563EB',
                  color: '#FFF',
                  fontSize: '15.7px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                  borderRadius: '3px',
                  border: 'none',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                {isLoading ? 'Signing In...' : 'LOGIN'}
              </button>

              {/* Links */}
              <div id="form-links" className="flex justify-between mb-6" style={{ width: '481px' }}>
                <button
                  id="forgot-password-link"
                  type="button"
                  className="transition-colors duration-200 hover:opacity-80 bg-transparent border-none p-0 cursor-pointer"
                  style={{
                    color: '#2563EB',
                    fontSize: '15.2px',
                    fontWeight: '500',
                    fontFamily: 'Inter',
                    textDecoration: 'underline'
                  }}
                  onClick={() => console.log('Forgot password clicked')}
                >
                  Forgot Password
                </button>
                <button
                  id="sign-up-link"
                  type="button"
                  className="transition-colors duration-200 hover:opacity-80 bg-transparent border-none p-0 cursor-pointer"
                  style={{
                    color: '#2563EB',
                    fontSize: '15.2px',
                    fontWeight: '500',
                    fontFamily: 'Inter',
                    textDecoration: 'underline'
                  }}
                  onClick={() => console.log('Sign up clicked')}
                >
                  Sign Up
                </button>
              </div>              {/* Divider */}
              <div id="divider-section" className="relative mb-6" style={{ width: '481px' }}>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full" style={{ borderTop: '1.5px solid #2563EB' }}></div>
                </div>
                <div className="relative flex justify-center">
                  <span id="divider-text" className="px-4 bg-white" style={{
                    color: '#2563EB',
                    fontFamily: 'Inter',
                    fontSize: '15.5px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: 'normal'
                  }}>OR</span>
                </div>
              </div>

              {/* SSO Button */}
              <button
                id="sso-login-button"
                type="button"
                className="focus:outline-none transition-colors duration-200"
                style={{
                  width: '481px',
                  height: '57px',
                  backgroundColor: '#2563EB',
                  color: '#FFF',
                  fontSize: '14.5px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal',
                  borderRadius: '3px',
                  border: 'none',
                  fontFamily: 'Inter'
                }}
              >
                LOGIN via SSO
              </button>
            </div>
          </form>
        </div>
      </div>        {/* Copyright at bottom */}
        <div id="copyright-section" className="px-16" style={{ paddingBottom: '20px' }}>
          <p id="copyright-text" className="text-center" style={{
            color: '#757D8A',
            fontSize: '15.6px',
            fontWeight: '400',
            fontFamily: 'Inter'
          }}>
            Copyright 2025 MyHealthPlan
          </p>
        </div>
      </div>

      {/* Right Side - Background Image - 822px out of 1440px = ~57% */}
      <div
        id="background-image-section"
        className="bg-cover bg-center bg-no-repeat relative"
        style={{
          width: '57.1%',
          backgroundImage: `url('/e98c1df0a2e1528278f53f8e1982321197654854.jpg')`,
        }}
      >
        {/* Optional overlay for better contrast if needed */}
        <div id="background-overlay" className="absolute inset-0 bg-blue-600 bg-opacity-5"></div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
