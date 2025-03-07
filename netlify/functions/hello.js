const { MongoClient } = require("mongodb");
 
const mongoClient = new MongoClient(process.env.MONGODB_URI || "mongodb+srv://admin:admin@gourmet2go.5jpsj.mongodb.net/");
 
const clientPromise = mongoClient.connect();
 
const handler = async (event) => {
    console.log("hello");
    try {
        const database = (await clientPromise).db(process.env.MONGODB_DATABASE || "gourmet2go");
        const collection = database.collection(process.env.MONGODB_COLLECTION || "items");
 
        
        const items = await collection.find({}).toArray();
 
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ items })
        };
 
    } catch (error) {
        console.error("MongoDB Error:", error);  
        return { 
            statusCode: 500, 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ error: 'MongoDB connection failed', details: error.toString() }) 
        };
    }
};
 
module.exports = { handler };