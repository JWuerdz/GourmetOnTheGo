// netlify/functions/deleteItem.js
import { createClient } from "@supabase/supabase-js";

// Create the Supabase client using environment variables
const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

export async function handler(event, context) {
    try {
        // 1) Parse the request body to get the ID of the item to delete
        const body = JSON.parse(event.body);
        const { id } = body;

        // 2) Delete the item from "Items" table
        const { data, error } = await supabase
            .from("Items")
            .delete()
            .eq("id", id) // only delete the row that matches this ID
            .single();

        if (error) {
            throw error;
        }

        // 3) Return a success response (or the deleted item if you prefer)
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, deletedItem: data }),
        };
    } catch (err) {
        // 4) Handle errors
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
}
