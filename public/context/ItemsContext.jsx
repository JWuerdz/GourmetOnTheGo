import React, { createContext, useState, useEffect } from "react";

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    // Fetch items from Supabase via your Netlify function
    const fetchItems = async () => {
        try {
            const response = await fetch("/.netlify/functions/getAllItems");
            if (!response.ok) throw new Error("Failed to fetch items");
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // Add item (insert into DB)
    const addItem = async (newItem) => {
        try {
            const response = await fetch("/.netlify/functions/addItem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem),
            });
            if (!response.ok) throw new Error("Failed to add item");
            await response.json();
            fetchItems(); // re-fetch to update state
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    // Update item (general update, used also for archiving)
    const updateItem = async (id, updatedFields) => {
        try {
            const response = await fetch("/.netlify/functions/updateItem", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...updatedFields }),
            });
            if (!response.ok) throw new Error("Failed to update item");
            await response.json();
            fetchItems();
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    // Remove item (delete from DB)
    const removeItem = async (id) => {
        try {
            const response = await fetch("/.netlify/functions/deleteItem", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) throw new Error("Failed to delete item");
            await response.json();
            fetchItems();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    // Archive item: set archived to true
    const archiveItem = async (id) => {
        try {
            await updateItem(id, { archived: true });
        } catch (error) {
            console.error("Error archiving item:", error);
        }
    };

    // Unarchive item: set archived to false
    const unarchiveItem = async (id) => {
        try {
            await updateItem(id, { archived: false });
        } catch (error) {
            console.error("Error unarchiving item:", error);
        }
    };

    return (
        <ItemsContext.Provider
            value={{
                items,
                addItem,
                updateItem,
                removeItem,
                archiveItem,
                unarchiveItem,
            }}
        >
            {children}
        </ItemsContext.Provider>
    );
};
