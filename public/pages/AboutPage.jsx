import React from "react";
import { Link } from "react-router-dom";
import "./AboutPage.css";

const AboutPage = () => {
    return (
        <div className="about-page">
            <header className="about-header">
                <div className="logo">Gourmet 2 Go</div>
                <nav className="nav-menu">
                    <Link to="/menu" className="nav-link">Menu</Link>
                    <Link to="/order" className="nav-link">Order</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                </nav>
            </header>

            <section className="about-content">
                <h1>About Gourmet 2 Go</h1>
                <p>
                    Welcome to <strong>Gourmet 2 Go</strong>, your premier on-campus spot for gourmet dishes made fresh daily. We offer students and faculty delicious meals right here on campus, combining convenience with exceptional culinary quality.
                </p>

                <h2>Our Story</h2>
                <p>
                    Founded in 2025, Gourmet 2 Go started with a simple goal: transform everyday campus dining into memorable culinary experiences. Our skilled chefs use fresh, locally sourced ingredients to craft flavorful meals designed especially for the campus community.
                </p>

                <h2>Our Mission</h2>
                <p>
                    At Gourmet 2 Go, our mission is to offer extraordinary food experiences right at your fingertips. Whether you're quickly grabbing lunch, enjoying dinner after classes, or sharing meals with friends, we're dedicated to making your campus dining exceptional.
                </p>

                <h2>Why Students Choose Us</h2>
                <ul>
                    <li>Fresh, locally sourced ingredients</li>
                    <li>Exciting and diverse menu options</li>
                    <li>Affordable gourmet quality</li>
                    <li>Convenient on-campus location</li>
                    <li>Friendly and welcoming atmosphere</li>
                </ul>
            </section>

            <footer className="about-footer">
                <p>© {new Date().getFullYear()} Gourmet 2 Go. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AboutPage;
