import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css';
import Logo from "../images/logo.png";
import S1 from "../images/s1.png";
import S2 from "../images/s2.png";
import S3 from "../images/s3.png";


export default function About(props) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user && user.role === 'admin';

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
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/about"> About </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/pet_adop"> Pets Category </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/accessories"> Accessories </Link>
                                </li>
                                <li className="nav-item">
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


            <section className="wedo_section layout_padding-bottom">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            <hr />
                            What We Do
                            <hr />
                        </h2>
                        <p>
                            At PawTopia, we're dedicated to making life better for pets and their families. We connect you with healthy, well-cared-for companions while offering premium food, accessories, grooming essentials, and expert support. Whether you're welcoming a new pet or caring for a lifelong friend, we're here to make every moment happier.
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="box">
                                <div className="img-box">
                                    <img src={S1} alt="" />
                                </div>
                                <div className="detail-box">
                                    <h6>
                                        Pet Adoption
                                    </h6>
                                    <p>
                                        Give a loving pet the forever home they deserve. Our adoption program connects healthy, vaccinated, and well-cared-for pets with responsible families. Every adoption creates a new beginning, bringing happiness to both pets and their new owners.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="box">
                                <div className="img-box">
                                    <img src={S2} alt="" />
                                </div>
                                <div className="detail-box">
                                    <h6>
                                        Pet Care
                                    </h6>
                                    <p>
                                        Your pet's health and happiness are our top priorities. We provide expert care, nutritious food, grooming essentials, wellness guidance, and trusted support to ensure your furry companions live healthy, active, and joyful lives.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="box">
                                <div className="img-box">
                                    <img src={S3} alt="" />
                                </div>
                                <div className="detail-box">
                                    <h6>
                                        Pet Training
                                    </h6>
                                    <p>
                                        Build a stronger bond with your pet through positive, effective training. Our expert guidance helps improve obedience, social skills, and good behavior, making everyday life happier and more enjoyable for both pets and their owners.
                                    </p>
                                </div>
                            </div>
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
                                    <Link  to=" ">
                                        <img src={Logo} alt="" />
                                        <span>
                                            PawTopia
                                        </span>
                                    </Link>
                                </div>
                                <p>
                                    We believe every pet deserves love, care, and the opportunity to live a happy, healthy life. Our experienced trainers use positive reinforcement techniques to improve obedience, build confidence, and strengthen the bond between pets and their families, creating lifelong companions. 🐾
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
                                        <Link  to=" ">
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            <span>
                                                Connaught Place, New Delhi, Delhi
                                            </span>
                                        </Link>
                                        <Link  to=" ">
                                            <i className="fa fa-phone" aria-hidden="true"></i>
                                            <span>
                                                Call +91 9692566400
                                            </span>
                                        </Link>
                                        <Link  to=" ">
                                            <i className="fa fa-envelope" aria-hidden="true"></i>
                                            <span>
                                                shivampatro70@gmail.com
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="info_social">
                                    <Link  to=" ">
                                        <i className="fa fa-facebook" aria-hidden="true"></i>
                                    </Link>
                                    <Link  to=" ">
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </Link>
                                    <Link  to=" ">
                                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                                    </Link>
                                    <Link  to=" ">
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
                                    Every pet deserves the best care, attention, and a loving environment to thrive. We are committed to providing trusted services, expert guidance, and quality products that ensure your furry companions stay healthy, happy, and full of life every day. 🐾❤️
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