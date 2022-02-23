require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Function to get all Items
const getAllItems = async (req, res) => {
  
  const client = new MongoClient(MONGO_URI, options);
  
  try {
  
    await client.connect();
    
    const db = client.db("e-commerce");
    const items = await db.collection("items").find({}).toArray();

    res.status(200).json({ status: 200, message: "Succsess!", data: items });

    client.close();
  
  } catch (error) {
  
    res.status(500).json({ status: 500, message: "Something went wrong getting all items😭" });
  
  }
};

module.exports = {
  getAllItems,
};
