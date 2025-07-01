import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Simulation de connexion
    setTimeout(() => {
      if (formData.email && formData.password) {
        console.log('Connexion réussie');
      } else {
        setErrors({ general: 'Veuillez remplir tous les champs' });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* Styles CSS AdminLTE personnalisés */}
      <style jsx>{`
        .login-page {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        
        .login-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(233, 122, 60, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
          animation: backgroundMove 20s ease-in-out infinite;
        }
        
        @keyframes backgroundMove {
          0%, 100% { transform: translateX(0) translateY(0); }
          33% { transform: translateX(-20px) translateY(-20px); }
          66% { transform: translateX(20px) translateY(-10px); }
        }
        
        .login-box {
          width: 400px;
          margin: 0 auto;
          padding-top: 50px;
          position: relative;
          z-index: 10;
        }
        
        .login-logo {
          text-align: center;
          margin-bottom: 25px;
          position: relative;
        }
        
        .login-logo img {
          height: 100px;
          margin-bottom: 10px;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
          transition: transform 0.3s ease;
        }
        
        .login-logo img:hover {
          transform: scale(1.05);
        }
        
        .card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }
        
        .card-body {
          padding: 40px 35px;
        }
        
        .login-box-msg {
          margin-bottom: 25px;
          font-weight: 600;
          color: #555;
          text-align: center;
          font-size: 16px;
        }
        
        .form-control {
          border: 2px solid #e1e5e9;
          border-radius: 12px;
          padding: 12px 15px;
          font-size: 14px;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }
        
        .form-control:focus {
          border-color: #E97A3C;
          box-shadow: 0 0 0 3px rgba(233, 122, 60, 0.1);
          background: white;
          transform: translateY(-1px);
        }
        
        .form-control.is-invalid {
          border-color: #e74c3c;
          background: #fdf2f2;
        }
        
        .input-group {
          position: relative;
          margin-bottom: 20px;
        }
        
        .input-group-append {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          display: flex;
          align-items: center;
          padding-right: 15px;
        }
        
        .input-group-text {
          background: none;
          border: none;
          color: #6c757d;
        }
        
        .password-toggle {
          position: absolute;
          right: 45px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #6c757d;
          cursor: pointer;
          padding: 5px;
          transition: color 0.3s ease;
        }
        
        .password-toggle:hover {
          color: #E97A3C;
        }
        
        .btn-primary {
          background: linear-gradient(45deg, #E97A3C, #ff8c42);
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(233, 122, 60, 0.3);
        }
        
        .btn-primary:hover:not(:disabled) {
          background: linear-gradient(45deg, #d86428, #E97A3C);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(233, 122, 60, 0.4);
        }
        
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .icheck-primary input[type="checkbox"] {
          position: absolute;
          opacity: 0;
        }
        
        .icheck-primary label {
          position: relative;
          padding-left: 30px;
          cursor: pointer;
          font-weight: 500;
          color: #555;
        }
        
        .icheck-primary label::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          border: 2px solid #ddd;
          border-radius: 6px;
          background: white;
          transition: all 0.3s ease;
        }
        
        .icheck-primary input[type="checkbox"]:checked + label::before {
          background: #E97A3C;
          border-color: #E97A3C;
        }
        
        .icheck-primary input[type="checkbox"]:checked + label::after {
          content: '✓';
          position: absolute;
          left: 3px;
          top: 50%;
          transform: translateY(-50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
        
        .alert-danger {
          background: linear-gradient(45deg, #fee, #fdd);
          border: 1px solid #f5c6cb;
          border-radius: 12px;
          color: #721c24;
          padding: 15px;
          margin-bottom: 20px;
          animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .spinner-border-sm {
          width: 16px;
          height: 16px;
          border-width: 2px;
        }
        
        .mr-2 {
          margin-right: 8px;
        }
        
        a {
          color: #E97A3C;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        a:hover {
          color: #d86428;
          text-decoration: underline;
        }
        
        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        
        .col-8, .col-4 {
          flex: 1;
        }
        
        .col-4 {
          text-align: right;
        }
        
        .btn-block {
          width: 100%;
        }
        
        .mb-1, .mb-0 {
          margin-bottom: 8px;
          text-align: center;
        }
        
        .mb-0 {
          margin-bottom: 0;
        }
      `}</style>

      <div className="login-page">
        <div className="login-box">
          <div className="login-logo">
            <div style={{ 
              width: '100px', 
              height: '100px', 
              background: 'linear-gradient(45deg, #E97A3C, #ff8c42)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px',
              boxShadow: '0 8px 25px rgba(233, 122, 60, 0.3)'
            }}>
              <span style={{ color: 'white', fontSize: '36px', fontWeight: 'bold' }}>IC</span>
            </div>
          </div>

          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Connectez-vous pour accéder à votre compte</p>

              {errors.general && (
                <div className="alert alert-danger" role="alert">
                  {errors.general}
                </div>
              )}

              <div>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="input-group mb-3">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Mot de passe"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input
                        type="checkbox"
                        id="remember"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                      />
                      <label htmlFor="remember">
                        Se souvenir de moi
                      </label>
                    </div>
                  </div>
                  
                  <div className="col-4">
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      disabled={isLoading}
                      onClick={handleSubmit}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                          Connexion...
                        </>
                      ) : (
                        'Se connecter'
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <p className="mb-1">
                <a href="#forgot-password">
                  Mot de passe oublié ?
                </a>
              </p>
              <p className="mb-0">
                <span>Vous êtes nouveaux sur InsideCasa ? </span>
                <a href="#register">
                  Créer un compte
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;