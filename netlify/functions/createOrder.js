// netlify/functions/createOrder.js
import { createClient } from "@supabase/supabase-js";

// 1) Create the Supabase client using environment variables
const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

export async function handler(event, context) {
    try {
        // 2) Parse the request body to get cart & optional user info
        const body = JSON.parse(event.body);
        const { cart, userId } = body;

        // 3) Insert a new row into the "Orders" table
        //    Add other fields if your "Orders" table requires them
        const { data: newOrder, error: orderError } = await supabase
            .from("Orders")
            .insert([
                {
                    user_id: userId || null,
                    // e.g., total, status, created_at (if your table needs them)
                },
            ])
            .single(); // single() returns just the newly created row

        if (orderError) {
            throw orderError;
        }

        // 4) Insert each item in the cart into "Order_items"
        //    Adjust fields to match your "Order_items" table columns
        const orderItems = cart.map((item) => ({
            order_id: newOrder.id,
            item_id: item.id,
            quantity: item.quantity || 1,
            // Optionally store item.price at time of purchase, etc.
        }));

        const { data: insertedItems, error: itemsError } = await supabase
            .from("Order_items")
            .insert(orderItems);

        if (itemsError) {
            throw itemsError;
        }

        // 5) Return the newly created order + items
        return {
            statusCode: 200,
            body: JSON.stringify({ order: newOrder, items: insertedItems }),
        };
    } catch (error) {
        // 6) If there's any error, return a 500 with the error message
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}
