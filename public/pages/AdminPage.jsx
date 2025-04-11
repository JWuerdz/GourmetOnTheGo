import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ItemsContext } from "../context/ItemsContext.jsx";
import { supabase } from "../supabaseClient";

import "./AdminPage.css";

const AdminPage = () => {
    const { items, addItem, updateItem, removeItem } = useContext(ItemsContext);
    const [editingItem, setEditingItem] = useState(null);
    const [newItem, setNewItem] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        isActive: true,
    });

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    // ✅ Check Supabase session on load
    useEffect(() => {
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error || !data.user) {
                navigate("/login"); // redirect if not logged in
            } else {
                setUser(data.user);
                setLoading(false);
            }
        };
        checkSession();
    }, [navigate]);

    const handleEdit = (item) => {
        setEditingItem(item);
        setNewItem({
            name: item.name || "",
            description: item.description || "",
            price: item.price || "",
            quantity: item.quantity || "",
            category: item.category || "",
            isActive: item.isActive ?? true,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleToggleActive = (item) => {
        updateItem(item.id, { isActive: !item.isActive });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            updateItem(editingItem.id, {
                ...newItem,
                price: parseFloat(newItem.price) || 0,
                quantity: parseInt(newItem.quantity, 10) || 0,
            });
        } else {
            addItem({
                ...newItem,
                price: parseFloat(newItem.price) || 0,
                quantity: parseInt(newItem.quantity, 10) || 0,
            });
        }

        setNewItem({
            name: "",
            description: "",
            price: "",
            quantity: "",
            category: "",
            isActive: true,
        });
        setEditingItem(null);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-container">
            <div className="admin-content">
                <h1>Admin Dashboard</h1>
                <button className="back-button" onClick={() => navigate("/menu")}>
                    ← Back to Menu
                </button>

                <form onSubmit={handleSubmit} className="admin-form glow-hover">
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={newItem.description}
                        onChange={(e) =>
                            setNewItem({ ...newItem, description: e.target.value })
                        }
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        step="1"
                        min="0"
                        value={newItem.price}
                        onChange={(e) =>
                            setNewItem({ ...newItem, price: e.target.value })
                        }
                        required
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={newItem.quantity}
                        onChange={(e) =>
                            setNewItem({ ...newItem, quantity: e.target.value })
                        }
                        required
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={newItem.category}
                        onChange={(e) =>
                            setNewItem({ ...newItem, category: e.target.value })
                        }
                    />
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={newItem.isActive}
                            onChange={(e) =>
                                setNewItem({ ...newItem, isActive: e.target.checked })
                            }
                        />
                    </label>

                    <button type="submit" className="save-button">
                        {editingItem ? "Update Item" : "Add Item"}
                    </button>
                </form>

                <div className="items-list">
                    {items
                        .filter((item) => item !== null)
                        .map((item) => (
                            <div key={item.id} className="admin-item glow-hover">
                                <h3 style={{ color: item.isActive ? "#4CAF50" : "red" }}>
                                    {item.name} {!item.isActive && "(Inactive)"}
                                </h3>
                                <p>{item.description}</p>
                                <p className="item-price">${item.price.toFixed(2)}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Category: {item.category}</p>
                                <p>Status: {item.isActive ? "Active" : "Inactive"}</p>

                                <div className="item-actions">
                                    <button onClick={() => handleEdit(item)}>Edit</button>
                                    <button onClick={() => removeItem(item.id)}>Delete</button>
                                    <button onClick={() => handleToggleActive(item)}>
                                        {item.isActive ? "Deactivate" : "Activate"}
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
