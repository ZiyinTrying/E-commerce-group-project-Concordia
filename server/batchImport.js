require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const items  = require("./data/items.json");
const companies = require("./data/companies.json");
const categories = require("./data/categories.json");

// Function that batch imports Items, Companies and Categories to Mongo
const batchImport = async () => {
    
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("e-commerce");

        // Adds the Items to Mongo
        await db.collection("items").insertMany(items);
        // // Adds Companies to Mongo
        await db.collection("companies").insertMany(companies);
        // Adds Categories to Mongo
        await db.collection("categories").insertMany(categories);

        console.log("Success");
        client.close()
    } catch (err) {
        console.log("Error: ", err);
    }
}

batchImport();