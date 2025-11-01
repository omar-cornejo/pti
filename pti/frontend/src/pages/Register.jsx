import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await register(form);
      setSuccess('Usuario registrado. Redirigiendo al login...');
      setTimeout(() => navigate('/login'), 800);
    } catch (err) {
      setError(err.message || 'Error al registrar');
    }
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Header style="light" position="static" />
      <main className="flex-grow container mx-auto px-8 py-24 flex flex-col items-center justify-center">
        <div className="w-full max-w-md animate-slide-up">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold mb-6"><span className="text-2xl align-top mr-2">✱</span>REGISTRO</h1>
            <p className="text-lg font-medium text-gray-600">Únete a la revolución de la moda AI</p>
          </div>
          <div className="border-4 border-black bg-white transition-all p-8 rounded-lg">
            {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
            {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}
            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <input type="text" name="username" placeholder="USUARIO" required className="border-4 border-black rounded-lg py-4 px-5 font-medium text-lg w-full" value={form.username} onChange={onChange} />
              </div>
              <div>
                <input type="password" name="password" placeholder="CONTRASEÑA" required className="border-4 border-black rounded-lg py-4 px-5 font-medium text-lg w-full" value={form.password} onChange={onChange} />
              </div>
              <button type="submit" disabled={loading} className="pill-button w-full border-4 border-black rounded-full py-4 px-12 font-bold bg-black text-white uppercase text-base transition-all hover:bg-white hover:text-black disabled:opacity-60">
                {loading ? 'Registrando...' : 'REGISTRARSE'}
              </button>
            </form>
          </div>
          <div className="text-center mt-8">
            <p className="text-lg font-medium text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-black font-bold hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
