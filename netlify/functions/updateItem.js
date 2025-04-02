// netlify/functions/updateItem.js
import { createClient } from "@supabase/supabase-js";

// Create the Supabase client using environment variables
const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

export async function handler(event, context) {
    try {
        // 1) Parse the request body
        const body = JSON.parse(event.body);
        const { id, ...fieldsToUpdate } = body;
        // "id" is the primary key of the row you want to update
        // "fieldsToUpdate" might be { name, description, price } or any columns you want to update

        // 2) Update the record in the "Items" table
        const { data, error } = await supabase
            .from("Items")
            .update(fieldsToUpdate)
            .eq("id", id) // only update the row that matches this ID
            .single();

        if (error) {
            throw error;
        }

        // 3) Return the updated item
        return {
            statusCode: 200,
            body: JSON.stringify(data), // "data" is the updated row
        };
    } catch (err) {
        // 4) Handle errors
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
}
