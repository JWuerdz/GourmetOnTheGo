// main.jsx (or index.jsx, depending on your setup)
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Context Providers
import { CartProvider } from "../public/context/CartContext.jsx";
import { ItemsProvider } from "../public/context/ItemsContext.jsx";

// Pages
import MenuPage from "../public/pages/MenuPage.jsx";
import OrderPage from "../public/pages/OrderPage.jsx";
import LoginPage from "../public/pages/LoginPage.jsx";
import AdminPage from "../public/pages/AdminPage.jsx";
import AboutPage from "../public/pages/AboutPage.jsx";
import SignUpPage from "../public/pages/SignUpPage.jsx";

// Styles
import "../public/index.css";
import "../public/App.css";

// -------------------------------------------------------------------
// RENDER ROOT
// -------------------------------------------------------------------
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <ItemsProvider>
            <CartProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Default route goes to MenuPage */}
                        <Route path="/" element={<MenuPage />} />
                        <Route path="/menu" element={<MenuPage />} />
                        <Route path="/order" element={<OrderPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/signup" element={<SignUpPage />} />

                        {/* Fallback route: anything unknown goes to "/" */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </ItemsProvider>
    </React.StrictMode>
);
