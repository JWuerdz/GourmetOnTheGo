import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "../public/context/CartContext.jsx";
import { ItemsProvider } from "../public/context/ItemsContext.jsx";

import MenuPage from "../public/pages/MenuPage.jsx";
import OrderPage from "../public/pages/OrderPage.jsx";
import LoginPage from "../public/pages/LoginPage.jsx";
import AdminPage from "../public/pages/AdminPage.jsx";
import AboutPage from "../public/pages/AboutPage.jsx";

// Styles
import "../public/index.css";
import "../public/App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ItemsProvider>
            <CartProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MenuPage />} /> {/* Set MenuPage as default */}
                        <Route path="/menu" element={<MenuPage />} />
                        <Route path="/order" element={<OrderPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} /> {/* Fallback redirect */}
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </ItemsProvider>
    </React.StrictMode>
);
