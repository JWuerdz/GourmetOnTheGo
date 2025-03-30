// netlify/functions/updateItem.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

export async function handler(event, context) {
    try {
        const body = JSON.parse(event.body);
        console.log("updateItem body:", body);
        const { id, ...fieldsToUpdate } = body;

        // If you're sending "description" from the front end, map it to "desc"
        if (fieldsToUpdate.description) {
            fieldsToUpdate.desc = fieldsToUpdate.description;
            delete fieldsToUpdate.description;
        }

        const { data, error } = await supabase
            .from("Items")
            .update(fieldsToUpdate)
            .eq("id", id)
            .single();

        if (error) {
            console.error("Supabase error in updateItem:", error);
            throw error;
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (err) {
        console.error("Error in updateItem:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
}
