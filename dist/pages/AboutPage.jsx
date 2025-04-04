import React from "react";
import { Link } from "react-router-dom";
import "./AboutPage.css";

const AboutPage = () => {
    return (
        <div className="about-page">
            {/* Warm integrated nav bar */}
            <nav className="nav-bar">
                <Link to="/menu" className="nav-link">Menu</Link>
                <Link to="/order" className="nav-link">Order</Link>
                <Link to="/login" className="nav-link">Login</Link>
            </nav>

            <div className="about-container">
                <h1>About Gourmet 2 Go</h1>
                <p>
                    Welcome to <strong>Gourmet 2 Go</strong>, your premier on-campus spot for gourmet dishes made fresh daily.
                    We combine convenience with exceptional culinary quality, ensuring every meal is a memorable experience.
                </p>

                <h2>Our Story</h2>
                <p>
                    Founded in 2025, Gourmet 2 Go began with a simple goal: to transform everyday campus dining into a gourmet experience.
                    Our dedicated chefs use fresh, locally sourced ingredients to craft a variety of delectable dishes.
                </p>

                <h2>Our Mission</h2>
                <p>
                    Our mission is to provide students and faculty with high-quality, affordable gourmet food right on campus,
                    making every meal a delightful culinary adventure.
                </p>

                <h2>Why Choose Us?</h2>
                <ul>
                    <li>Fresh, locally sourced ingredients</li>
                    <li>Diverse and exciting menu options</li>
                    <li>Affordable gourmet quality</li>
                    <li>Convenient on-campus location</li>
                    <li>Friendly and welcoming atmosphere</li>
                </ul>
            </div>

            <footer className="about-footer">
                <p>© {new Date().getFullYear()} Gourmet 2 Go. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AboutPage;
