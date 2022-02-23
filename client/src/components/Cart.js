import React, { useContext } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { ItemsContext } from "./ItemsContext";
import { handleTotal } from "./Total";
import Button from "./Button";

const Cart = () => {
    const history = useHistory();

    //consuming array where we gonna store items, that we are addin to the cart
    const { cartItems, setCartItems, currentCart, reRender, setReRender } =
        useContext(ItemsContext);

    //links you to the page of the item
    const handleToTheItemDetails = (id) => {
        history.push(`/item/${id}`);
    };

    const handleClearCart = () => {
        localStorage.removeItem("cartItems");
        setReRender(!reRender);

    };

    const handleToCheckout = () => {
        history.push("/checkout");
    };

    return (
        <Main>
            <Wrapper>
                <Header>Shopping Cart</Header>
                {currentCart?.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <Table>
                        <tbody>
                            <tr>
                                <th style={{ textAlign: "left", borderTop: "1px solid lightgrey"}}>Description</th>
                                <th style={{ textAlign: "center", borderTop: "1px solid lightgrey"}}>Quantity</th>
                                <th style={{ textAlign: "right", borderTop: "1px solid lightgrey"}}>Price</th>
                            </tr>
                            {
                                currentCart?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td
                                                style={{ textAlign: "left", cursor: "pointer" }}
                                                onClick={() => handleToTheItemDetails(item._id)}
                                            >
                                                <Img src={item.imageSrc} />
                                                {item.name}
                                            </td>
                                            <td style={{ textAlign: "center" }}>{item.quantity}</td>
                                            <td style={{ textAlign: "right" }}>{item.price}</td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <th style={{ textAlign: "left", borderBottom: "1px solid lightgrey"}}>Total</th>
                                <th style={{ textAlign: "center", borderBottom: "1px solid lightgrey"}}>&nbsp;</th>
                                <th style={{ textAlign: "right", borderBottom: "1px solid lightgrey"}}>
                                    ${handleTotal(currentCart)}
                                </th>
                            </tr>
                        </tbody>
                    </Table>
                )}
                {currentCart?.length !== 0 && (
                    <Div>
                        <Button
                            onClick={() => {
                                handleClearCart();
                            }}
                        >
                            Clear cart
                        </Button>
                        <Button
                            onClick={() => {
                                handleToCheckout();
                            }}
                        >
                            &nbsp;Checkout&nbsp;
                        </Button>
                    </Div>
                )}
            </Wrapper>
        </Main>
    );
};

const Main = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 80px;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 75vh;
    width: 900px;
    border-radius: 10px;
    margin: 30px;
    margin-right: 0 auto;
    box-shadow: -2px 2px 10px 5px #cacaca;
    color: var(--color-light-grey);
    background: var(--color-dark-grey);
`;
const Header = styled.h1`
    margin-top: 20px;
    text-align: center;
    background: var(--color-lime);
    color: var(--color-dark-grey);
    padding: 15px;
    font-size: 26px;
    width: 75%;
    border-radius: 5px;
`;
const Table = styled.table`
    width: 90%;
    margin: 20px;
`;
const Img = styled.img`
    width: 40px;
    margin-right: 10px;
`;
const Div = styled.div`
    margin-top: auto;
    display: flex;
    justify-content: space-evenly;
`;

export default Cart;
