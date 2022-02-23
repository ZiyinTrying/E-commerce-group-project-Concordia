require("dotenv").config();

const { MongoClient } = require("mongodb");
const { v4: uuidv4} = require("uuid");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// ********************************************************************************************************* //

/////////////////////////////////////////
// Function to post new order to Mongo //
/////////////////////////////////////////

const postNewOrder = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {

    await client.connect();

    const db = client.db("e-commerce");
    const { name, email, address, province, city, postalCode, items } =
      req.body;

    // Checks to make sure the POST has items. (Has a nother check in the FE as well)
    if (items.length === 0) {
      return res.status(400).json({ status: 400, message: "No Items" });
    }

    // Runs a for loop for each item inside of items list
    for (let count = 0; count <= items.length - 1; count++) {
      // Finds the appropriate item insdie of the items collection (mongo)
      const data = await db
        .collection("items")
        .findOne({ _id: items[count]._id });
        
      // Updates Num in stock to original minus the quantity sepecified
      const result = await db
        .collection("items")
        .updateOne(
          { _id: items[count]._id },
          { $set: { numInStock: data.numInStock - items[count].quantity } }
        );

    }

    //Order validation
    if (name.length <= 2) {
      return res.status(400).json({ status: 400, message: "Name too short" });
    } else if (!email.includes("@")) {
      return res.status(400).json({ status: 400, message: "Invalid email" });
    } else if (address.length <= 5) {
      return res.status(400).json({ status: 400, message: "invalid address" });
    } else if (!province) {
      return res.status(400).json({ status: 400, message: "invalid province" });
    } else if (city.length <= 3) {
      return res.status(400).json({ status: 400, message: "invalid city" });
    } else if (postalCode.length < 6 && postalCode.length > 7 ) {
      return res
        .status(400)
        .json({ status: 400, message: "invalid postal Code" });
    }

    // Creates new _id for the order
    const _id = uuidv4();

    const newOrder = { _id, ...req.body };

    // Pushes the order to oder collection (mongo)
    const result = await db.collection("orders").insertOne(newOrder);

    res.status(200).json({
      status: 200,
      _id,
      message: "Success! Order added and stock updated!",
    });
    client.close();
  } catch (error) {
    console.log(error, "error")
    res.status(500).json({ status: 500, message: "Something went wrong 😭", error });
  }
};

// ********************************************************************************************************* //

/////////////////////////////////////////
// Function to post new order to Mongo //
/////////////////////////////////////////

const getOrder = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("e-commerce");
    const { _id } = req.params;
    const result = await db.collection("orders").findOne({ _id });

    if (!result) {
      return res.status(400).json({ staus: 400, message: "Order Id Invalid" });
    }

    res.status(200).json({ status: 200, result, message: "Order Found" });

    client.close();
  } catch (error) {
    res.status(500).json({ status: 500, message: "Something went wrong 😭" });
  }
};

// ********************************************************************************************************* //

/////////////////////////////////////////
// Function to post new order to Mongo //
/////////////////////////////////////////

const deleteOrder = async (req, res) => {

  const client = new MongoClient(MONGO_URI, options);
  const { _id } = req.params;

  try {
    await client.connect();

    const db = client.db("e-commerce");
    const idOrder = await db.collection("orders").findOne({ _id });

    for (let count = 0; count <= idOrder.items.length - 1; count++) {
      // Finds the appropriate item inside of the items collection (mongo)
      const data = await db
        .collection("items")
        .findOne({ _id: idOrder.items[count]._id });

      // Updates Num in stock to original minus the quantity specified
      const result = await db.collection("items").updateOne(
        { _id: idOrder.items[count]._id },
        {
          $set: {
            numInStock: data.numInStock + idOrder.items[count].quantity,
          },
        }
      );
    }

    const deleteResult = await db.collection("orders").deleteOne({ _id });

    deleteResult
      ? res
          .status(200)
          .json({ status: 200, data: "Order deleted successfully" })
      : res.status(404).json({ status: 404, data: "Not Found" });
    client.close();
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: err.message });
  }
};

// ********************************************************************************************************* //

/////////////////////////////////////////
// Function to post new order to Mongo //
/////////////////////////////////////////

const updateOrder = async (req, res) => {

  const { _id } = req.params;
  const { name, email, address, province, city, postalCode, items } = req.body;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("e-commerce");

    if (req.body) {
      return res.status(400).json({ status: 400, data: "Not found" });
    }

    //Order validation
    if (name.length <= 2) {
      return res.status(400).json({ status: 400, message: "Name too short" });
    } else if (!email.includes("@")) {
      return res.status(400).json({ status: 400, message: "Invalid email" });
    } else if (address.length <= 5) {
      return res.status(400).json({ status: 400, message: "invalid address" });
    } else if (province.length < 2) {
      return res.status(400).json({ status: 400, message: "invalid province" });
    } else if (city.length <= 3) {
      return res.status(400).json({ status: 400, message: "invalid city" });
    } else if (postalCode.length !== 6) {
      return res
        .status(400)
        .json({ status: 400, message: "invalid postal Code" });
    }

    const data = await db
      .collection("orders")
      .updateMany({ _id }, { $set: { ...req.body } });

    res.status(200).json({ status: 200, data });

    client.close();
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: err.message });
  }
};

// ********************************************************************************************************* //

// Exports :)
module.exports = {
  postNewOrder,
  getOrder,
  deleteOrder,
  updateOrder,
};
