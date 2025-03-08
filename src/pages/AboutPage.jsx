import React from "react";
import { Link } from "react-router-dom";
import "./AboutPage.css"; // Optional: Create a CSS file for styling

const AboutPage = () => {
    return (
        <div className="about-page">
            <header className="about-header">
                <div className="logo">Gourmet 2 Go</div>
                <nav className="nav-menu">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/menu" className="nav-link">Menu</Link>
                    <Link to="/order" className="nav-link">Order</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/admin" className="nav-link">Admin</Link>
                </nav>
            </header>

            <section className="about-content">
                <h1>About Us</h1>
                <p>
                    Welcome to <strong>Gourmet 2 Go</strong>, your go-to destination for delicious, freshly prepared meals delivered straight to your door. We are passionate about providing high-quality, gourmet food that is both convenient and affordable.
                </p>

                <h2>Our Story</h2>
                <p>
                    Founded in 2025, Gourmet 2 Go was born out of a love for great food and a desire to make gourmet dining accessible to everyone. Our team of talented chefs works tirelessly to create mouthwatering dishes using only the freshest, locally sourced ingredients.
                </p>

                <h2>Our Mission</h2>
                <p>
                    Our mission is simple: to deliver exceptional food that brings people together. Whether you're enjoying a meal with family, hosting a party, or simply treating yourself, we're here to make every dining experience special.
                </p>

                <h2>Why Choose Us?</h2>
                <ul>
                    <li>Fresh, locally sourced ingredients</li>
                    <li>Wide variety of gourmet dishes</li>
                    <li>Affordable prices</li>
                    <li>Friendly and professional service</li>
                </ul>
            </section>

            <footer className="about-footer">
                <p>© {new Date().getFullYear()} Gourmet 2 Go. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AboutPage;