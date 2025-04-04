// netlify/functions/getAllItems.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

export async function handler(event, context) {
    try {
        // 1) Fetch all items from "Items" table
        const { data, error } = await supabase.from("Items").select("*");
        if (error) throw error;

        // 2) Return them as JSON
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
}
