import React from 'react';

import Navbar from 'components/Navbar';
import Service from 'components/Service';

import TestimonialsSection from './OurStudent';
import About from 'components/About';

import Footer from 'components/Footer';
import { Link } from 'react-router-dom';


export default function Aboutus() {
    return(
        <>
        <Navbar />
        <div className="container-fluid bg-primary py-5 mb-5 page-header">
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-10 text-center">
                    <h1 className="display-3 text-white animated slideInDown">About Us</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-center">
                        <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/" className="text-white">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/pages" className="text-white">Pages</Link>
                        </li>
                        <li className="breadcrumb-item text-white active" aria-current="page">About</li>
                    </ul>
                           
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>
          
    <Service />
    
 
   
    <About />
    < TestimonialsSection/>
 
    <Footer />
   
    
        </>

    );

}