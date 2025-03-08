// pages/AdminPage.jsx (new file)
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ItemsContext } from "../context/ItemsContext";
import "./AdminPage.css";

const AdminPage = () => {
    const { items, addItem, updateItem, removeItem } = useContext(ItemsContext);
    const [editingItem, setEditingItem] = useState(null);
    const [newItem, setNewItem] = useState({ name: "", description: "", price: "" });
    const navigate = useNavigate();

    const handleEdit = (item) => {
        setEditingItem(item);
        setNewItem(item);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            updateItem(editingItem.id, newItem);
        } else {
            addItem(newItem);
        }
        setNewItem({ name: "", description: "", price: "" });
        setEditingItem(null);
    };

    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <button className="back-button" onClick={() => navigate("/menu")}>← Back to Menu</button>

            <form onSubmit={handleSubmit} className="admin-form">
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
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                    required
                />
                <button type="submit" className="save-button">
                    {editingItem ? "Update Item" : "Add Item"}
                </button>
            </form>

            <div className="items-list">
                {items.map(item => (
                    <div key={item.id} className="admin-item">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>${item.price.toFixed(2)}</p>
                        <div className="item-actions">
                            <button onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => removeItem(item.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;