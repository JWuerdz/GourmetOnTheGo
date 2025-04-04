// netlify/functions/addItem.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

export async function handler(event, context) {
    try {
        const body = JSON.parse(event.body);
        console.log("PRINTING JSON.parse(event.body)", body);

        const { data, error } = await supabase
            .from("Items")
            .insert([
                {
                    name: body.name,
                    price: body.price,
                    quantity: body.quantity,
                    category: body.category,
                    isActive: body.isActive, 
                    // Use 'description' exactly, to match your table column
                    description: body.description,
                    
                },
            ])
            

        if (error) {
            console.error("Supabase error in addItem:", error);
            throw error;
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (err) {
        console.error("Error in addItem:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
}
