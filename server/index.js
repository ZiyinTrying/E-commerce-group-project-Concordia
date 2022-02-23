"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = 4000;

// Importing handlers
const { getAllItems } = require("./handlers/getAllItems");
const { getAllCompanies } = require("./Handlers/getAllCompanies");
const { getCompanyById } = require("./Handlers/getCompanyById");
const { getItemById } = require("./Handlers/getItemById");
const { getItemCategory } = require("./Handlers/getItemCategory");
const { getAllCategories } = require("./Handlers/getAllCategories");
const { postNewOrder, getOrder, deleteOrder, updateOrder } = require("./Handlers/Order");

const app = express();

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(morgan("tiny"));
app.use(express.static("./server/assets"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));

// Home Page endpoint
app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: "Home page" });
});

// Endpoints for Items
app.get("/items/:_id", getItemById);
app.get("/items", getAllItems);

// Endpoints for Companies
app.get("/companies", getAllCompanies);
app.get("/company/:_id", getCompanyById);

// Endpoints for Categories
app.get("/items/category/:category", getItemCategory);
app.get("/categories", getAllCategories);

// Endpoints for Orders
app.post("/create/order", postNewOrder);
app.get("/order/:_id", getOrder);
app.patch("/order/update/:_id", updateOrder);
app.delete("/order/delete/:_id", deleteOrder);

// Endpoints for when the page URL doesnt match
app.get("*", (req, res) => {
  res.status(404).json({ status: 404, message: "Page does not exit" });
});

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
