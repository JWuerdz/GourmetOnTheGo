import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ItemsContext } from "../context/ItemsContext.jsx";
import "./AdminPage.css";

const AdminPage = () => {
    const {
        items,
        addItem,
        updateItem,
        removeItem,
    } = useContext(ItemsContext);

    const [editingItem, setEditingItem] = useState(null);

    // Include all columns from your DB: name, description, price, quantity, category, isActive
    const [newItem, setNewItem] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        isActive: true, // default to active
    });

    const navigate = useNavigate();

    // Populate the form for editing an item
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

    // Toggle isActive instead of archived
    const handleToggleActive = (item) => {
        // Flip isActive
        updateItem(item.id, { isActive: !item.isActive });
    };

    // Submit the form to add or update an item
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            // Update existing item with all fields
            updateItem(editingItem.id, {
                ...newItem,
                price: parseFloat(newItem.price) || 0,
                quantity: parseInt(newItem.quantity, 10) || 0,
            });
        } else {
            // Add a new item
            addItem({
                ...newItem,
                price: parseFloat(newItem.price) || 0,
                quantity: parseInt(newItem.quantity, 10) || 0,
            });
        }
        // Clear form after submission
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
                    {/* isActive checkbox */}
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={newItem.isActive}
                            onChange={(e) =>
                                setNewItem({ ...newItem, isActive: e.target.checked })
                            }
                        />
                        {/* {" "}Active */}
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
                                {/* If isActive is false, highlight name in red */}
                                <h3 style={{ color: item.isActive ? "#4CAF50" : "red" }}>
                                    {item.name}{" "}
                                    {!item.isActive && "(Inactive)"}
                                </h3>
                                <p>{item.description}</p>
                                <p className="item-price">${item.price.toFixed(2)}</p>
                                {/* Show quantity & category */}
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
