const { MongoClient } = require("mongodb");

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined. Check your Netlify environment variables.");
}

const client = new MongoClient(process.env.MONGODB_URI, {
    
});

const clientPromise = client.connect();

const handler = async (event) => {
    try {
        console.log("Connected to MongoDB:", process.env.MONGODB_URI);  
        const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_COLLECTION);
        const results = await collection.find({name: "Test Item"}).limit(1).toArray();
        
        return {
            statusCode: 200,
            body: JSON.stringify(results),
        };
    } catch (error) {
        console.error("Database query error:", error);
        return { statusCode: 500, body: JSON.stringify({ error: error.toString() }) };
    }
};

module.exports = { handler };
