import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

import NavBar from "./NavBar";
import HomePage from "./HomePage";
import ItemDetails from "./ItemDetails";
import Cart from "./Cart";
import Order from "./Order";
import Confirmation from "./Confirmation";
import Checkout from "./Checkout";
import CategoryPage from "./CategoryPage";

function App() {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <NavBar />

            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>

                <Route path="/item/:_id">
                    <ItemDetails />
                </Route>

                <Route path="/order">
                    <Order />
                </Route>

                <Route path="/cart">
                    <Cart />
                </Route>

                <Route path="/checkout">
                    <Checkout />
                </Route>

                <Route path="/confirmation">
                    <Confirmation />
                </Route>

                <Route path="/items/category/:category">
                    <CategoryPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
