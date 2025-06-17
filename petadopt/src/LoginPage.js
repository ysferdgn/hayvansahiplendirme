import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        if (!formData.username || !formData.password) {
            setError('Please enter both username and password');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const result = await login(formData.username, formData.password);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred during login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error) setError('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-100 font-sans">
            <div className="max-w-md w-full p-8 rounded-xl shadow-lg bg-white">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-indigo-600 mb-2">Giriş Yap</h2>
                    <p className="text-gray-600">Pet Adoption Platform'a hoş geldiniz</p>
                </div>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Kullanıcı Adı
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Kullanıcı adınızı girin"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Parola
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Parolanızı girin"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Beni hatırla
                            </label>
                        </div>
                        <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                            Parolamı unuttum
                        </Link>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-400 hover:from-indigo-600 hover:to-blue-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Hesabınız yok mu?{' '}
                        <Link to="/signup" className="text-indigo-500 font-bold hover:text-indigo-600 transition-colors duration-200">
                            Kayıt Ol
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
