import React from "react";
import { Link } from "react-router-dom";
import "./AboutPage.css";

const AboutPage = () => {
    return (
        <div className="about-page">
            {/* Fixed, full-width gradient nav bar */}
            <nav className="nav-bar">
                <Link to="/menu" className="nav-link">Menu</Link>
                <Link to="/login" className="nav-link">Login</Link>
            </nav>

            <div className="content">
                <h1>About Gourmet 2 Go</h1>
                <p>
                    Welcome to <strong>Gourmet 2 Go</strong>, your premier on-campus spot for gourmet dishes made fresh daily.
                    We combine convenience with exceptional culinary quality, ensuring every meal is a memorable experience.
                </p>

                <h2>Our Story</h2>
                <p>
                    Founded in 2025, <strong>Gourmet 2 Go</strong> began with a vision: to transform everyday campus dining into
                    an elevated gourmet experience. Our dedicated chefs source fresh, locally grown produce and quality ingredients
                    to craft a delightful, ever-evolving menu that caters to a variety of tastes.
                </p>

                <h2>Our Mission</h2>
                <p>
                    We’re committed to providing high-quality, affordable gourmet fare right on campus. Each carefully prepared dish
                    at <strong>Gourmet 2 Go</strong> is designed to make every meal a memorable culinary adventure, no matter your schedule.
                </p>

                <h2>Why Choose Us?</h2>
                <div className="why-choose-us">
                    <div className="why-item">
                        <h3>Fresh, Locally Sourced Ingredients</h3>
                        <p>
                            We partner with trusted local farms to ensure every dish is packed with flavor and nutrition.
                        </p>
                    </div>
                    <div className="why-item">
                        <h3>Diverse & Exciting Menu</h3>
                        <p>
                            From comforting classics to adventurous new flavors, our rotating menu offers something for everyone.
                        </p>
                    </div>
                    <div className="why-item">
                        <h3>Affordable Gourmet Quality</h3>
                        <p>
                            Enjoy premium, restaurant-grade meals without breaking the bank. Delicious dining can be accessible for all.
                        </p>
                    </div>
                    <div className="why-item">
                        <h3>Convenient On-Campus Location</h3>
                        <p>
                            Skip the commute—our central campus spot keeps you close to great meals so you can focus on what matters most.
                        </p>
                    </div>
                    <div className="why-item">
                        <h3>Friendly & Welcoming Atmosphere</h3>
                        <p>
                            Our staff is dedicated to creating a warm environment where you can relax, recharge, and savor each bite.
                        </p>
                    </div>
                </div>
            </div>

            <footer>
                <p>© {new Date().getFullYear()} Gourmet 2 Go. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AboutPage;
