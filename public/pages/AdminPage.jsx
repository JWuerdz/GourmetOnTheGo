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
        archiveItem,
        unarchiveItem,
    } = useContext(ItemsContext);

    const [editingItem, setEditingItem] = useState(null);
    const [newItem, setNewItem] = useState({
        name: "",
        description: "",
        price: "",
    });

    const navigate = useNavigate();

    // Populate the form for editing an item
    const handleEdit = (item) => {
        setEditingItem(item);
        setNewItem({
            name: item.name,
            description: item.description,
            price: item.price,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Toggle archive/unarchive for an item
    const handleToggleArchive = (item) => {
        if (item.archived) {
            unarchiveItem(item.id);
        } else {
            archiveItem(item.id);
        }
    };

    // Submit the form to add or update an item
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            updateItem(editingItem.id, newItem);
        } else {
            addItem({
                ...newItem,
                archived: false,
            });
        }
        // Clear form after submission
        setNewItem({ name: "", description: "", price: "" });
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
                        step="0.01"
                        value={newItem.price}
                        onChange={(e) =>
                            setNewItem({
                                ...newItem,
                                price: parseFloat(e.target.value) || 0,
                            })
                        }
                        required
                    />
                    <button type="submit" className="save-button">
                        {editingItem ? "Update Item" : "Add Item"}
                    </button>
                </form>

                <div className="items-list">
                    {items
                        .filter((item) => item !== null) // Defensive check
                        .map((item) => (
                            <div key={item.id} className="admin-item glow-hover">
                                <h3 style={{ color: item.archived ? "red" : "inherit" }}>
                                    {item.name} {item.archived && "(Archived)"}
                                </h3>
                                <p>{item.description}</p>
                                <p className="item-price">${item.price.toFixed(2)}</p>
                                <div className="item-actions">
                                    <button onClick={() => handleEdit(item)}>Edit</button>
                                    <button onClick={() => removeItem(item.id)}>Delete</button>
                                    <button onClick={() => handleToggleArchive(item)}>
                                        {item.archived ? "Unarchive" : "Archive"}
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
