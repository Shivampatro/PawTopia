import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css';
import Logo from "../images/logo.png";
import Slider from "../images/slider-bg.png";
import S1 from "../images/s1.png";
import S2 from "../images/s2.png";
import S3 from "../images/s3.png";
import g1 from "../images/g1.jpg";
import g2 from "../images/g2.jpg";
import g3 from "../images/g3.jpg";
import g4 from "../images/g4.jpg";
import g5 from "../images/g5.jpg";
import g6 from "../images/g6.jpg";
import client_bg from "../images/client-bg.jpg";
import c1 from "../images/client1.png";
import c2 from "../images/client2.png";
import c3 from "../images/client3.png";



export default function Main(props) {
    return (
        <>
            <div className="hero_area">
                <header className="header_section">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg custom_nav-container ">
                            <Link className="navbar-brand" to=" ">
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
                                    <li className="nav-item active">
                                        <Link className="nav-link" to=" "> Home </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/about"> About </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/pet_adop"> Pets Category </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link pr-lg-0" to="/contact"> Contact us</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/" class="btn btn-secondary">Log out</Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </header>
                <section className=" slider_section position-relative">
                    <div className="slider_bg_box">
                        <img src={Slider} alt="" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7 col-lg-6">
                                <div className="detail-box">
                                    <h1>
                                        Welcome to
                                        <br />Our PawTopia
                                    </h1>
                                    <p>
                                        We provide a safe, caring, and welcoming environment where pets receive the love and attention they deserve. From adoption and training to grooming and daily care, our dedicated team is committed to ensuring every pet enjoys a healthy, happy, and fulfilling life. 🐾❤️
                                    </p>
                                    <div className="btn-box">
                                        <Link to=" " className="btn-1">
                                            What we do
                                        </Link>
                                        <Link to=" " className="btn-2">
                                            Adopt Pet
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>


            <section className="wedo_section layout_padding-bottom">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            <hr />
                            What We Do
                            <hr />
                        </h2>
                        <p>
                            We provide a safe, caring, and welcoming environment where pets receive the love and attention they deserve. From adoption and training to grooming and daily care, our dedicated team is committed to ensuring every pet enjoys a healthy, happy, and fulfilling life. 🐾❤️
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
                                        We help wonderful pets find loving homes. Through our adoption program, you can connect with animals in need of a family, providing them with a second chance at happiness. Every adoption makes a difference in a pet's life. 🐾❤️
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
                                        We provide comprehensive care services to keep your pets healthy, happy, and well-groomed. From regular health check-ups and vaccinations to grooming, bathing, and dental care, our expert team ensures your pet receives the best attention and pampering they truly deserve. 🐾❤️
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
                                        Our training programs help pets develop good behavior, obedience, and social skills. Whether it's basic training, leash manners, or special behavior support, our experienced trainers work with you to build a strong bond with your pet and ensure they become a well-behaved companion. 🐾❤️
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <div className="gallery_section ">
                <div className="container-fluid">
                    <div className="heading_container heading_center">
                        <h2>
                            <hr />
                            Pet For Adoption
                            <hr />
                        </h2>
                    </div>
                    <div className="row">
                        <div className=" col-sm-8 col-md-6 px-0">
                            <div className="img-box">
                                <img src={g1} alt="" />
                                <div className="btn-box">
                                    <Link to={g1} data-toggle="lightbox" className="btn-1">
                                        <i className="fa fa-picture-o" aria-hidden="true"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-md-3 px-0">
                            <div className="img-box">
                                <img src={g2} alt="" />
                                <div className="btn-box">
                                    <Link to={g2} data-toggle="lightbox" className="btn-1">
                                        <i className="fa fa-picture-o" aria-hidden="true"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3 px-0">
                            <div className="img-box">
                                <img src={g3} alt="" />
                                <div className="btn-box">
                                    <Link to={g3} data-toggle="lightbox" className="btn-1">
                                        <i className="fa fa-picture-o" aria-hidden="true"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3 px-0">
                            <div className="img-box">
                                <img src={g4} alt="" />
                                <div className="btn-box">
                                    <Link to={g4} data-toggle="lightbox" className="btn-1">
                                        <i className="fa fa-picture-o" aria-hidden="true"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-md-3 px-0">
                            <div className="img-box">
                                <img src={g5} alt="" />
                                <div className="btn-box">
                                    <Link to={g5} data-toggle="lightbox" className="btn-1">
                                        <i className="fa fa-picture-o" aria-hidden="true"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8 col-md-6 px-0">
                            <div className="img-box">
                                <img src={g6} alt="" />
                                <div className="btn-box">
                                    <Link to={g6} data-toggle="lightbox" className="btn-1">
                                        <i className="fa fa-picture-o" aria-hidden="true"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <section className="client_section layout_padding">
                <div className="client_bg_box">
                    <img src={client_bg} alt="" />
                </div>
                <div className="container ">
                    <div className="heading_container heading_center">
                        <h2>
                            <hr />
                            What Says Our Clients
                            <hr />
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-md-7">
                            <div className="box">
                                <div className="img-box">
                                    <img src={c1} alt="" className="box-img" />
                                </div>
                                <div className="detail-box">
                                    <div className="client_id">
                                        <div className="client_info">
                                            <h6>
                                                Shivam Patro
                                            </h6>
                                        </div>
                                        <i className="fa fa-quote-left" aria-hidden="true"></i>
                                    </div>
                                    <p>
                                        I couldn't be happier with the pet I adopted from PawTopia. The process was smooth, the team was incredibly helpful and answered all my questions, and my new puppy is the sweetest, most well-behaved dog I've ever had. 🐾❤️</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 offset-md-5">
                            <div className="box">
                                <div className="img-box">
                                    <img src={c2} alt="" className="box-img" />
                                </div>
                                <div className="detail-box">
                                    <div className="client_id">
                                        <div className="client_info">
                                            <h6>
                                                Manish Mishal Behera
                                            </h6>
                                        </div>
                                        <i className="fa fa-quote-left" aria-hidden="true"></i>
                                    </div>
                                    <p>
                                        We are committed to providing exceptional care and trusted services for every pet. Whether you're adopting a new companion, shopping for premium essentials, or seeking expert guidance, our goal is to create a safe, happy, and healthy experience for both pets and their owners. 🐾❤️ </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="box">
                                <div className="img-box">
                                    <img src={c3} alt="" className="box-img" />
                                </div>
                                <div className="detail-box">
                                    <div className="client_id">
                                        <div className="client_info">
                                            <h6>
                                                Devidatta Parida
                                            </h6>
                                        </div>
                                        <i className="fa fa-quote-left" aria-hidden="true"></i>
                                    </div>
                                    <p>
                                        Adopting my Golden Retriever from PawTopia was one of the best decisions I've ever made. The team was incredibly supportive throughout the process, and my puppy arrived healthy, happy, and well cared for. Highly recommended! </p>
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
                                    <Link to=" ">
                                        <img src={Logo} alt="" />
                                        <span>
                                            PawTopia
                                        </span>
                                    </Link>
                                </div>
                                <p>
                                    Your one-stop destination for all things pets! From adorable companions to essential supplies and expert care, we're here to help your furry friends thrive. Because every pet deserves love, happiness, and the best care possible. 🐾💖
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
                                                shivampatro70@gmail.com
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
                                    We’re a team of pet lovers dedicated to helping you find the perfect furry companion. With years of experience in pet care and matching pets with their forever families, we ensure every adoption is a success story.
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