require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Function to get an Item by its _id
const getItemById = async (req, res) => {

  const { _id } = req.params;
  // Changes the params to a number
  const idNumber = Number(_id);
  const client = new MongoClient(MONGO_URI, options);
  
  try {
    
    await client.connect();

    const db = client.db("e-commerce");
    // Find the item who's _id === number
    const item = await db.collection("items").findOne({ _id: idNumber });

    // Checks to see if the item was found.
    if (item) {
      res.status(200).json({ status: 200, message: "Succsess!", data: item });
      client.close();
    } else {
      return res.status(404).json({ status: 404, message: "Item not found" });
    }

  } catch (error) {
    
    res.status(500).json({ status: 500, message: "Something went wrong 😭" });
  
  }
};

module.exports = {
  getItemById,
};
