require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Function to Get all Categories 
const getAllCategories = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);
  
  try {
  
    await client.connect();
  
    const db = client.db("e-commerce");
    const companies = await db.collection("categories").find({}).toArray();

    res.status(200).json({ status: 200, message: "Succsess!", data: companies});

    client.close();
  
  } catch (error) {
  
    res.status(500).json({ status: 500, message: "Something went wrong getting all categories 😭" });
  
  }
};

module.exports = {
    getAllCategories
};
