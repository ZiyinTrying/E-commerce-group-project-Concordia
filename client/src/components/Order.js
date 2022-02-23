import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import { handleTotal } from "./Total";
import Button from "./Button";
import { ItemsContext } from "./ItemsContext";

const Order = () => {
    const history = useHistory();

    const { reRender, setReRender } = useContext(ItemsContext);

    //variable that holds id of order that was stored in local storage
    const orderId = localStorage.getItem("order-id");

    //variable to set up result of fetch
	const [userOrder, setUserOrder] = useState(false);

	useEffect(() => {
		fetch(`/order/${orderId}`)
		.then(res => res.json())
		.then(data => setUserOrder(data.result))
	},[])

    const handleDeleteOrder = () => {
        fetch(`/order/delete/${orderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            
        })
        .then((res) => res.json())
        .then((json) => {
            localStorage.removeItem("order-id");
            setReRender(!reRender);
            history.push("/");
        })
        .catch((err) => {
            console.log("error");
        })
    }

    return(
        <Main>
            <Wrapper>
                <Header>Order History</Header>
                {
                    !userOrder ? (
                        <p>You did not place any order yet</p>
                    ) : (
                        <Table>
                            <tbody>
                                <tr>
                                    <th style={{ textAlign: "left", borderTop: "1px solid lightgrey"}}>Description</th>
                                    <th style={{ textAlign: "center", borderTop: "1px solid lightgrey"}}>Quantity</th>
                                    <th style={{ textAlign: "right", borderTop: "1px solid lightgrey"}}>Price</th>
                                </tr>
                                    {
                                        userOrder?.items.map((item) => {
                                            return (
                                                <tr>
                                                    <th style={{ textAlign: "left", fontWeight: "500"}}>{item.name}</th>
                                                    <th style={{ textAlign: "center"}}>{item.quantity}</th>
                                                    <th style={{ textAlign: "right"}}>{item.price}</th>
                                                </tr>
                                            )
                                        })
                                    }
                                <tr>
                                    <th style={{ textAlign: "left", borderBottom: "1px solid lightgrey"}}>Total</th>
                                    <th style={{ textAlign: "center", borderBottom: "1px solid lightgrey"}}>&nbsp;</th>
                                    <th style={{ textAlign: "right", borderBottom: "1px solid lightgrey"}}>${handleTotal(userOrder.items)}</th>
                                </tr>
                            </tbody>
                        </Table>
                    )
                }
                {
                    userOrder && (
                        <Div>
                            <Button
                                onClick={() => {
                                    handleDeleteOrder();
                                }}
                            >
                                Cancel order
                            </Button>
                        </Div>
                )}
            </Wrapper>
        </Main>
    )
}
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
const Div = styled.div`
    margin-top: auto;
    display: flex;
    justify-content: space-evenly;
`;

export default Order;