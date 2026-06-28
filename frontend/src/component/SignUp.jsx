import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import SignIn from './component/SignIn';
import '../index.css';

export default function SignUp(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Registration failed');
                return;
            }

            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            console.error('Error signing up:', err);
            setError('Server connection error. Please try again.');
        }
    };

    return (
        <>
            <div className="wrapper">
                <h1>Sign Up</h1>
                {error && <div style={{ color: '#ff6b6b', marginBottom: '10px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}
                {success && <div style={{ color: '#2ecc71', marginBottom: '10px', fontSize: '14px', textAlign: 'center' }}>{success}</div>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <input 
                        type="email" 
                        placeholder="Enter Email" 
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
                    <p className="recover not-member">
                        Already a member?<Link to="/"> Sign In</Link>
                    </p>
                    <button type="submit" style={{ cursor: 'pointer' }}>Sign Up</button>
                </form>
                <p className="or">
                    ----- or continue with -----
                </p>
                <div className="icons">
                    <i className="fa fa-google"></i>
                    <i className="fa fa-instagram"></i>
                    <i className="fa fa-facebook"></i>
                </div>
            </div>
        </>
    )
}