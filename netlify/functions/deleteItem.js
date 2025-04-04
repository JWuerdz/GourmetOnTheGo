// netlify/functions/deleteItem.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

export async function handler(event, context) {
    try {
        const body = JSON.parse(event.body);
        const { id } = body;

        const { data, error } = await supabase
            .from("Items")
            .delete()
            .eq("id", id)
            .single();

        if (error) throw error;

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, deletedItem: data }),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
}
