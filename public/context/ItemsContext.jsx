// src/context/ItemsContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
    // Store items in state (start empty; no fallback)
    const [items, setItems] = useState([]);

    // Fetch items from Supabase (via Netlify function) once on mount
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("/.netlify/functions/getAllItems");
                if (!response.ok) {
                    throw new Error("Failed to fetch items");
                }
                const data = await response.json();
                if (data) {
                    setItems(data); // store them in state
                }
            } catch (error) {
                console.error("Error fetching items:", error);
                // If fetch fails, items remain an empty array
            }
        };
        fetchItems();
    }, []);

    // Create a new item in Supabase
    const addItem = async (newItem) => {
        try {
            const response = await fetch("/.netlify/functions/addItem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem),
            });
            if (!response.ok) {
                throw new Error("Failed to add item");
            }
            // Expect the Netlify function to return the newly inserted row
            const insertedItem = await response.json();
            setItems((prevItems) => [...prevItems, insertedItem]);
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    // Update an existing item in Supabase
    const updateItem = async (id, updatedData) => {
        try {
            const response = await fetch("/.netlify/functions/updateItem", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...updatedData }),
            });
            if (!response.ok) {
                throw new Error("Failed to update item");
            }
            // Expect the updated row from the Netlify function
            const updatedItem = await response.json();
            setItems((prevItems) =>
                prevItems.map((item) => (item.id === id ? updatedItem : item))
            );
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    // Delete an item in Supabase
    const removeItem = async (id) => {
        try {
            const response = await fetch("/.netlify/functions/deleteItem", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) {
                throw new Error("Failed to delete item");
            }
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <ItemsContext.Provider value={{ items, addItem, updateItem, removeItem }}>
            {children}
        </ItemsContext.Provider>
    );
};
