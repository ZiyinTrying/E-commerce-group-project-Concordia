require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Gets item by category
const getItemCategory = async (req, res) => {
  
  const client = new MongoClient(MONGO_URI, options);
  
  try {
  
    await client.connect();

    const db = client.db("e-commerce");
    // Stores req params into category
    const { category } = req.params;
    // Finds the item who's category === params
    const item = await db.collection("items").find({ category }).toArray();

    res.status(200).json({ status: 200, message: "Succsess!", data: item });
    
    client.close();
  } catch (error) {
    
    res.status(500).json({ status: 500, message: "Something went wrong 😭" });
  
  }
};

module.exports = {
  getItemCategory,
};
