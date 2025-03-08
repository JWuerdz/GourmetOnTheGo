// context/ItemsContext.jsx (new file)
import React, { createContext, useState, useEffect } from "react";

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem("menuItems");
        return saved ? JSON.parse(saved) : [
            { id: 1, name: "Pizza Margherita", description: "Classic pizza with tomato sauce, mozzarella, and basil", price: 10.0 },
            { id: 2, name: "Cheeseburger", description: "Juicy burger with cheese, lettuce, tomato, and pickles", price: 8.0 },
            { id: 3, name: "Caesar Salad", description: "Romaine lettuce with Caesar dressing, croutons, and parmesan cheese", price: 6.0 },
            { id: 4, name: "Spaghetti Bolognese", description: "Pasta with rich beef sauce and parmesan cheese", price: 12.5 },
            { id: 5, name: "Grilled Chicken Sandwich", description: "Grilled chicken, lettuce, tomato, and garlic mayo on ciabatta", price: 9.5 },
            { id: 6, name: "Mushroom Risotto", description: "Creamy risotto with wild mushrooms and truffle oil", price: 13.0 },
            { id: 7, name: "Veggie Wrap", description: "Spinach wrap with hummus, grilled veggies, and feta cheese", price: 7.99 }
        ];
    });

    useEffect(() => {
        localStorage.setItem("menuItems", JSON.stringify(items));
    }, [items]);

    const addItem = (newItem) => {
        setItems([...items, { ...newItem, id: Date.now() }]);
    };

    const updateItem = (id, updatedItem) => {
        setItems(items.map(item => item.id === id ? { ...item, ...updatedItem } : item));
    };

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <ItemsContext.Provider value={{ items, addItem, updateItem, removeItem }}>
            {children}
        </ItemsContext.Provider>
    );
};