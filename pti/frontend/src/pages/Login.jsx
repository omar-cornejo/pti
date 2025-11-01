// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');

        .hero-text {
          font-size: clamp(2.5rem, 8vw, 4rem);
          line-height: 1;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .pill-button {
          border: 3px solid #000000;
          border-radius: 50px;
          padding: 16px 40px;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.875rem;
          letter-spacing: 0.08em;
          transition: all 0.3s ease;
          display: inline-block;
          background-color: #000000;
          color: #FFFFFF;
        }

        .pill-button:hover:not(:disabled) {
          background-color: #FFFFFF;
          color: #000000;
          transform: translateY(-2px);
        }

        .pill-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .form-input {
          border: 3px solid #000000;
          border-radius: 8px;
          padding: 16px 20px;
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.3s ease;
          background-color: #FFFFFF;
          color: #000000;
          width: 100%;
        }

        .form-input:focus {
          outline: none;
          transform: translateY(-2px);
          box-shadow: 6px 6px 0px #000000;
        }

        .form-input::placeholder {
          color: #666666;
          font-weight: 500;
        }

        .form-container {
          border: 3px solid #000000;
          background: #FFFFFF;
          transition: all 0.3s ease;
          padding: 2rem;
          border-radius: 0.5rem;
        }

        .form-container:hover {
          transform: translateY(-4px);
          box-shadow: 8px 8px 0px #000000;
        }

        .asterisk {
          font-size: 2rem;
          font-weight: 700;
          vertical-align: top;
          line-height: 1;
        }

        .title-with-asterisk {
          display: inline-flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        .error-box {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background-color: #fee;
          border: 2px solid #dc2626;
          border-radius: 0.5rem;
        }

        .error-text {
          color: #dc2626;
          font-weight: 600;
          text-align: center;
        }
      `}</style>

      <Header style="light" position="static" />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-8 py-24 flex flex-col items-center justify-center">
        <div className="w-full max-w-md animate-slide-up">
          <div className="text-center mb-12">
            <h1 className="hero-text mb-6">
              <span className="title-with-asterisk">
                <span className="asterisk">✱</span>LOGIN
              </span>
            </h1>
            <p className="text-lg font-medium text-gray-600">
              Accede a tu cuenta TrendLens
            </p>
          </div>

          <div className="form-container">
            {error && (
              <div className="error-box">
                <p className="error-text">{error}</p>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="USUARIO"
                  required
                  className="form-input"
                  value={form.username}
                  onChange={onChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="CONTRASEÑA"
                  required
                  className="form-input"
                  value={form.password}
                  onChange={onChange}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="pill-button w-full"
              >
                {loading ? 'ENTRANDO...' : 'ENTRAR'}
              </button>
            </form>
          </div>

          <div className="text-center mt-8">
            <p className="text-lg font-medium text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-black font-bold hover:underline">
                Registrarse
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}