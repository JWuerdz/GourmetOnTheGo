import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { ItemsProvider } from "./context/ItemsContext.jsx";

// Page imports
import HomePage from "./HomePage.jsx"; // HomePage is in the src folder
import MenuPage from "./pages/MenuPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
// Styles
import "./index.css"; // Global styles
import "./App.css"; // App-specific styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ItemsProvider>
            <CartProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/menu" element={<MenuPage />} />
                        <Route path="/order" element={<OrderPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/about" element={<AboutPage />} />
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </ItemsProvider>
    </React.StrictMode>
);