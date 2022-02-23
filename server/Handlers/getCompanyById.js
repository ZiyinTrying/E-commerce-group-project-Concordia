require("dotenv").config();

const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Function to get a company by _id
const getCompanyById = async (req, res) => {
  
  const client = new MongoClient(MONGO_URI, options);

  try {
    
    await client.connect();
    
    const db = client.db("e-commerce");
    const { _id } = req.params;
    // Changes the _id from params to a number
    const number = Number(_id);
    // Finds the company who's _id === number
    const company = await db.collection("companies").findOne({ _id: number });

    res.status(200).json({ status: 200, message: "Succsess!", data: company });

    client.close();
  
  } catch (error) {
  
    res.status(500).json({ status: 500, message: "Something went wrong getting the specific company 😭" });
  
  }
};

module.exports = {
    getCompanyById
};
