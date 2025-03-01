import React from 'react';
import hero from '../images/heroo.png';
import '../styles/hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div>
            <section className='banner_wrapper position-relative'>    
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-md-6 header-img-section text-center'>
                            <img src={hero} alt='Empowering Women Safety' className='img-fluid animated-img shadow-lg rounded' />
                        </div>
                        <div className="col-md-6 my-5 my-md-0 text-center text-md-start">
                            <p className="banner-subtitle text-uppercase fw-bold text-danger">Ensuring Safety, Empowering Lives</p>
                            <h1 className="banner-title display-4 fw-bold">Join Us to Make <span className='highlight text-primary'>Women Safety</span> a Reality</h1>
                            <p className="banner-description text-muted fs-5">We are committed to creating a safer world for women. Be a part of our initiative and take a stand for safety and empowerment.</p>
                            <div className="btn-section mt-4 d-flex justify-content-center justify-content-md-start gap-3">
                                <Link to='/emergency' className="nav-link btn btn-danger btn-lg shadow fw-bold px-4 py-2">Get Help Now</Link>
                                <Link to='/about' className="nav-link btn btn-outline-dark btn-lg shadow fw-bold px-4 py-2">Learn More</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-shape-divider-bottom">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
            </section>
        </div>
    );
}

export default Hero;
