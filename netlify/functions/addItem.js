// netlify/functions/addItem.js
import { createClient } from "@supabase/supabase-js";

// Create the Supabase client using environment variables
const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

export async function handler(event, context) {
    try {
        // 1) Parse the incoming request body to get item details
        const body = JSON.parse(event.body);

        // 2) Insert the new item into your "Items" table
        //    Make sure these fields (name, description, price) exist in the table
        const { data, error } = await supabase
            .from("Items")
            .insert([
                {
                    name: body.name,
                    description: body.description,
                    price: body.price,
                    // add more columns here if your table has them
                },
            ])
            .single(); // single() returns just one row instead of an array

        if (error) {
            throw error;
        }

        // 3) Return the newly inserted item
        return {
            statusCode: 200,
            body: JSON.stringify(data), // "data" is the new row from the DB
        };
    } catch (err) {
        // 4) Handle errors
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
}
