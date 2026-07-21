import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import { API_BASE_URL } from '../config';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Invalid credentials');
                setLoading(false);
                return;
            }

            if (data.user.role !== 'admin') {
                setError('Access denied. You do not have administrator privileges.');
                setLoading(false);
                return;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Error signing in admin:', err);
            setError('Server connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div className="wrapper" style={{
                margin: '0',
                background: '#ffffffd1',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
                <h1 style={{ color: '#0f2027', fontWeight: 'bold' }}>Admin Portal</h1>
                <p style={{ color: '#2c5364', fontWeight: '500' }}>PawTopia Control Panel</p>
                
                {error && (
                    <div style={{
                        color: '#fff',
                        background: '#e74c3c',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        marginBottom: '15px',
                        fontSize: '13px',
                        textAlign: 'center',
                        fontWeight: '500'
                    }}>
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Admin Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ border: '1px solid #ced4da', background: '#fff' }}
                    />
                    <input 
                        type="password" 
                        placeholder="Admin Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ border: '1px solid #ced4da', background: '#fff' }}
                    />
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            cursor: 'pointer',
                            background: '#0f2027',
                            color: '#fff',
                            marginTop: '15px',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {loading ? 'Logging in...' : 'Sign In as Admin'}
                    </button>
                </form>
                
                <div className="not-member" style={{ marginTop: '20px' }}>
                    <Link to="/" style={{ color: '#203a43', textDecoration: 'underline', fontWeight: '600' }}>
                        Return to User Log In
                    </Link>
                </div>
            </div>
        </div>
    );
}
