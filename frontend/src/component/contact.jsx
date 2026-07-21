import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../index.css';
import Logo from "../images/logo.png";
import { API_BASE_URL } from '../config';


export default function Contact(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user && user.role === 'admin';

    useEffect(() => {
        if (location.state && location.state.prefilledMessage) {
            setMessage(location.state.prefilledMessage);
        }
        if (user && user.firstName) {
            setName(`${user.firstName} ${user.lastName || ''}`.trim());
            setEmail(user.email || '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phoneNumber, message }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Failed to send message');
                return;
            }

            setSuccess('Message sent successfully! We will get back to you soon.');
            setName(user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '');
            setEmail(user.email || '');
            setPhoneNumber('');
            setMessage('');
        } catch (err) {
            console.error('Error submitting contact form:', err);
            setError('Server connection error. Please try again.');
        }
    };

    return (
        <>

            <header className="header_section">
                <div className="container">
                    <nav className="navbar navbar-expand-lg custom_nav-container ">
                        <Link className="navbar-brand" to="/dashboard">
                            <img src={Logo} alt="" />
                            <span>
                                PawTopia    
                            </span>
                        </Link>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className=""> </span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard"> Home </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about"> About </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/pet_adop"> Pets Category </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/accessories"> Accessories </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link pr-lg-0" to="/contact"> Contact us</Link>
                                </li>
                                {isAdmin && (
                                    <li className="nav-item">
                                        <Link className="nav-link text-warning fw-bold" to="/admin/dashboard">Admin Panel</Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                        <Link to="/" className="btn btn-secondary text-white ms-2">Log out</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>

            <section class="contact_section layout_padding-bottom layout_padding2-top">
                <div class="container ">
                    <div class="heading_container ">
                        <h2 class="">
                            Contact Us
                            <hr />
                        </h2>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 ">
                            {error && <div style={{ color: '#ff6b6b', marginBottom: '15px', fontWeight: 'bold' }}>{error}</div>}
                            {success && <div style={{ color: '#2ecc71', marginBottom: '15px', fontWeight: 'bold' }}>{success}</div>}
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <input 
                                        type="text" 
                                        placeholder="Name" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="email" 
                                        placeholder="Email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="text" 
                                        placeholder="Phone Number" 
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input 
                                        type="text" 
                                        class="message-box" 
                                        placeholder="Message" 
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    />
                                </div>
                                <div class="btn-box">
                                    <button type="submit" style={{ cursor: 'pointer' }}>
                                        SEND
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


            <section className="info_section">
                <div className="container">
                    <div className="row container mx-5">
                        <div className="col-md-6 col-lg-3">
                            <div className="info_logo">
                                <div>
                                    <Link to=" ">
                                        <img src={Logo} alt="" />
                                        <span>
                                            PawTopia    
                                        </span>
                                    </Link>
                                </div>
                                <p>
                                    We provide a safe, caring, and welcoming environment where pets receive the love and attention they deserve. From adoption and training to grooming and daily care, our dedicated team is committed to ensuring every pet enjoys a healthy, happy, and fulfilling life. 🐾❤️
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="info_links ">
                                <h5>
                                    Contact Details
                                </h5>
                                <div className="info_contact">
                                    <div className="contact_link_box">
                                        <Link to=" ">
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            <span>
                                                Connaught Place, New Delhi, Delhi
                                            </span>
                                        </Link>
                                        <Link to=" ">
                                            <i className="fa fa-phone" aria-hidden="true"></i>
                                            <span>
                                                Call +91 8984116795
                                            </span>
                                        </Link>
                                        <Link to=" ">
                                            <i className="fa fa-envelope" aria-hidden="true"></i>
                                            <span>
                                                mmbehera29@gmail.com
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="info_social">
                                    <Link to=" ">
                                        <i className="fa fa-facebook" aria-hidden="true"></i>
                                    </Link>
                                    <Link to=" ">
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </Link>
                                    <Link to=" ">
                                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                                    </Link>
                                    <Link to=" ">
                                        <i className="fa fa-instagram" aria-hidden="true"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="info_insta">
                                <h5>
                                    INFORMATION
                                </h5>
                                <p className="pr-0 pr-md-4 pr-md-5">
                                    Our mission is to make pet ownership simple, joyful, and rewarding. We offer trusted care, expert advice, and premium products to ensure every pet receives the love, comfort, and attention they need to live their happiest life. 🐾❤️
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <footer className="footer_section">
                <div className="container">
                    <p>
                        &copy; <span id="displayYear"></span> All Rights Reserved By PawTopia
                    </p>
                </div>
            </footer>

        </>
    )
}