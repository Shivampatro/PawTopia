import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../index.css';
import { API_BASE_URL } from '../config';


export default function SignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

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
                return;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            if (data.user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Error signing in:', err);
            setError('Server connection error. Please try again.');
        }
    };

    return (
        <>
            <div className="wrapper">
                <h1>Hello Again!</h1>
                <p>Welcome back you've <br /> been missed!</p>
                {error && <div style={{ color: '#ff6b6b', marginBottom: '10px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <p className="recover">
                        <Link to=" ">Recover Password</Link>
                    </p>
                    <button type="submit" style={{ cursor: 'pointer' }}>Sign In</button>
                </form>
                <p className="or">
                    ----- or continue with -----
                </p>
                <div className="icons">
                    <i className="fa fa-google"></i>
                    <i className="fa fa-instagram"></i>
                    <i className="fa fa-facebook"></i>
                </div>
                <div className="not-member">
                    Not a member? <Link to="/signup">Sign Up Now</Link>
                </div>
                <div className="not-member" style={{ marginTop: '5px' }}>
                    Are you an Admin? <Link to="/admin-login" style={{ color: '#ffc107', fontWeight: 'bold' }}>Admin Sign In</Link>
                </div>
            </div>
        </>
    )
}