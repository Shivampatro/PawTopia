import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css';
import Logo from "../images/logo.png";
import client_bg from "../images/client-bg.jpg";
import ap1 from "../images/ap1.jpg";
import ap2 from "../images/ap2.jpg";
import ap3 from "../images/ap3.jpg";


export default function pet_adop(props) {
    return (
        <>
            <header className="header_section">
                <div className="container">
                    <nav className="navbar navbar-expand-lg custom_nav-container ">
                        <Link className="navbar-brand" to="index.html">
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
                                    <Link className="nav-link" to="/dashboard"> Home </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about"> About </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to=" "> Pets Category </Link>
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

            <section className="pet-category layout_padding-bottom">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            <hr />
                            Pet Category
                            <hr />
                        </h2>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-6 text-center">
                            <div class="single-cat-item">
                                <div class="thumb">
                                    <img class="img-fluid" src={ap1} alt="" />
                                </div>
                                <Link to=" ">
                                    <h4>Rescue Dog</h4>
                                </Link>
                                <p>
                                    Discover loving dogs waiting for their forever homes. From playful puppies to gentle seniors, each dog deserves a second chance. Our rescue dogs are vet-checked, vaccinated, and ready to bring joy to your life. 🐾💖
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 text-center">
                            <div class="single-cat-item">
                                <div class="thumb">
                                    <img class="img-fluid" src={client_bg} alt="" />
                                </div>
                                <Link to=" ">
                                    <h4>Breed Dog</h4>
                                </Link>
                                <p>
                                    Explore purebred dogs known for their specific traits and characteristics. From loyal German Shepherds to playful Golden Retrievers, each breed offers unique companionship. All our purebred dogs come from responsible breeders and are in excellent health. 🐾💖
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 text-center">
                            <div class="single-cat-item">
                                <div class="thumb">
                                    <img class="img-fluid" src={ap2} alt="" />
                                </div>
                                <Link to=" ">
                                    <h4 class="mx-1">Rescue Cat</h4>
                                </Link>
                                <p>
                                    Open your heart and home to a rescue cat! Our feline friends are looking for love, companionship, and a safe place to call their own. Ready to fall in love? 🐾❤️
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 text-center">
                            <div class="single-cat-item">
                                <div class="thumb">
                                    <img class="img-fluid" src={ap3} alt="" />
                                </div>
                                <Link to=" ">
                                    <h4>Breed Cat</h4>
                                </Link>
                                <p>
                                    Discover the charm of purebred cats, each with unique qualities and personalities. From elegant Persians to playful Siamese, find your perfect feline match. All our breed cats are well-cared for and ready to bring warmth to your home. 🐾💖
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="layout_padding-bottom">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            <hr />
                            Rescue Dogs
                            <hr />
                        </h2>
                    </div>
                    <div class="row">
                        <div class="pic-dog-cat card m-2" >
                            <img class="card-img-top" src={ap1} alt="a snow-capped mountain range" />
                            <div class="card-body text-dark text-center">
                                <h4 class="card-title">XYZ</h4>
                                <p class="card-text">2 Month | Fe-Male</p>
                                <Link to="/contact" class="btn btn-secondary">Buy Now</Link>
                            </div>
                        </div>
                        <div class="pic-dog-cat card card m-2">
                            <img class="card-img-top" src={ap1} alt="a snow-capped mountain range" />
                            <div class="card-body text-dark text-center">
                                <h4 class="card-title">XYZ</h4>
                                <p class="card-text">4 Month | Fe-Male</p>
                                <Link to="/contact" class="btn btn-secondary">Buy Now</Link>
                            </div>
                        </div>
                        <div class="pic-dog-cat card card m-2">
                            <img class="card-img-top" src={ap1} alt="a snow-capped mountain range" />
                            <div class="card-body text-dark text-center">
                                <h4 class="card-title">XYZ</h4>
                                <p class="card-text">6 Month | Male</p>
                                <Link to="/contact" class="btn btn-secondary">Log out</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="layout_padding-bottom">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            <hr />
                            Breed Dogs
                            <hr />
                        </h2>
                    </div>
                    <div class="row">
                        <div class="pic-dog-cat card m-2" >
                            <img class="card-img-top" src={client_bg} alt="a snow-capped mountain range" />
                            <div class="card-body text-dark text-center">
                                <h4 class="card-title">XYZ</h4>
                                <p class="card-text">2 Month | Fe-Male</p>
                                <Link to="/contact" class="btn btn-secondary">Buy Now</Link>
                            </div>
                        </div>
                        <div class="pic-dog-cat card card m-2">
                            <img class="card-img-top" src={client_bg} alt="a snow-capped mountain range" />
                            <div class="card-body text-dark text-center">
                                <h4 class="card-title">XYZ</h4>
                                <p class="card-text">4 Month | Fe-Male</p>
                                <Link to="/contact" class="btn btn-secondary">Buy Now</Link>
                            </div>
                        </div>
                        <div class="pic-dog-cat card card m-2">
                            <img class="card-img-top" src={client_bg} alt="a snow-capped mountain range" />
                            <div class="card-body text-dark text-center">
                                <h4 class="card-title">XYZ</h4>
                                <p class="card-text">6 Month | Male</p>
                                <Link to="/contact" class="btn btn-secondary">Buy Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="layout_padding-bottom">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            <hr />
                            Rescue Cat
                            <hr />
                        </h2>
                    </div>
                    <div class="row">
                        <div class="pic-dog-cat card m-2" >
                            <img class="card-img-top" src={ap2} alt="a snow-capped mountain range" />
                            <div class="card-body text-dark text-center">
                                <h4 class="card-title">XYZ</h4>
                                <p class="card-text">2 Month | Fe-Male</p>
                                <Link to="/contact" class="btn btn-secondary">Buy Now</Link>
                            </div>
                        </div>
                        <div class="pic-dog-cat card card m-2">
                            <img class="card-img-top" src={ap2} alt="a snow-capped mountain range" />
                            <div class="card-body text-dark text-center">
                                <h4 class="card-title">XYZ</h4>
                                <p class="card-text">4 Month | Fe-Male</p>
                                <Link to="/contact" class="btn btn-secondary">Buy Now</Link>
                            </div>
                        </div>
                        <div class="pic-dog-cat card card m-2">
                            <img class="card-img-top" src={ap2} alt="a snow-capped mountain range" />
                            <div class="card-body text-dark text-center">
                                <h4 class="card-title">XYZ</h4>
                                <p class="card-text">6 Month | Male</p>
                                <Link to="/contact" class="btn btn-secondary">Buy Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="layout_padding-bottom">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            <hr />
                            Breed Cat
                            <hr />
                        </h2>
                    </div>
                    <div class="row">
                        <div class="pic-dog-cat card m-2" >
                            <img class="card-img-top" src={ap3} alt="a snow-capped mountain range" />
                            <div class="card-body text-dark text-center">
                                <h4 class="card-title">XYZ</h4>
                                <p class="card-text">2 Month | Fe-Male</p>
                                <Link to="/contact" class="btn btn-secondary">Buy Now</Link>
                            </div>
                        </div>
                        <div class="pic-dog-cat card card m-2">
                            <img class="card-img-top" src={ap3} alt="a snow-capped mountain range" />
                            <div class="card-body text-dark text-center">
                                <h4 class="card-title">XYZ</h4>
                                <p class="card-text">4 Month | Fe-Male</p>
                                <Link to="/contact" class="btn btn-secondary">Buy Now</Link>
                            </div>
                        </div>
                        <div class="pic-dog-cat card card m-2">
                            <img class="card-img-top" src={ap3} alt="a snow-capped mountain range" />
                            <div class="card-body text-dark text-center">
                                <h4 class="card-title">XYZ</h4>
                                <p class="card-text">6 Month | Male</p>
                                <Link to="/contact" class="btn btn-secondary">Buy Now</Link>
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
                                    We’re a team of pet lovers dedicated to helping you find the perfect furry companion. With years of experience in pet care and matching pets with their forever families, we ensure every adoption is a success story. 🐾💖
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