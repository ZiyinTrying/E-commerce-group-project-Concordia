import React, { useState, useContext } from "react";
import styled from "styled-components";

import {  useHistory } from "react-router-dom";

import Button from "./Button";
import { ItemsContext } from "./ItemsContext";


const Checkout = () => {
    const history = useHistory()

    const {currentCart, reRender, setReRender} = useContext(ItemsContext);

    //variable that holds Full name
    const [name, setName] = useState(null);

    //variable that holds Email
    const [email, setEmail] = useState(null);

    //variable that holds Address
    const [address, setAddress] = useState(null);

    //variable that holds City
    const [city, setCity] = useState(null);

    //variable that holds Province
    const [province, setProvince] = useState(null);

    //variable that holds Province
    const [postalCode, setPostalCode] = useState(null);

    //variable that stores order id
    const [orderId, setOrderId] = useState(null);

    //function that sets name value from input
    const handleName = (ev) => {
        ev.preventDefault();
        setName(ev.target.value);
    }

    //function that sets email value from input
    const handleEmail = (ev) => {
        ev.preventDefault();
        setEmail(ev.target.value);
    }

    //function that sets address value from input
    const handeAddress = (ev) => {
        ev.preventDefault();
        setAddress(ev.target.value);
    }

    //function that sets city value from input
    const handleCity = (ev) => {
        ev.preventDefault();
        setCity(ev.target.value);
    }

    //function that sets province value from input
    const handleProvince = (ev) => {
        ev.preventDefault();
        setProvince(ev.target.value);
    }

    //function that sets postal code value from input
    const  handlePostalCode = (ev) => {
        ev.preventDefault();
        setPostalCode(ev.target.value);
    }

    //function that places order and in case of success pushes on the confirmation page
    const placeOrder = (ev) => {
        ev.preventDefault();
        fetch("/create/order", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email,
                address: address,
                province: province,
                city: city,
                postalCode: postalCode,
                items: currentCart,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            
        })
        .then((res) => res.json())
        .then((json) => {
            setOrderId(json._id);
            //remove array with selected items from local storage
            localStorage.removeItem("cartItems");
            //setting up id of order that is being placed in local storage
            localStorage.setItem("order-id", json._id);
            setReRender(!reRender);
            history.push("/confirmation");
        })
        .catch((err) => {
            console.log("error");
        })
    }

    return(
        <Main>
            <Wrapper>
                <Header>Checkout</Header>
                <Form onSubmit={placeOrder}>
                    <Label>
                        <Input type="text" required placeholder="Full Name" onChange={(ev) => handleName(ev)}/><Div><Span>*</Span></Div>
                    </Label>

                    <Label>
                        <Input type="email" required placeholder="Email" onChange={(ev) => handleEmail(ev)}/><Div><Span>*</Span></Div>
                    </Label>

                    <Label>
                        <Input type="text" required placeholder="Address 1" onChange={(ev) => handeAddress(ev)}/><Div><Span>*</Span></Div>
                    </Label>

                    <Label>
                        <Input type="text" placeholder="Address 2"/>
                    </Label>

                    <Label>
                        <Input type="text" required placeholder="City" onChange={(ev) => handleCity(ev)}/><Div><Span>*</Span></Div>
                    </Label>

                    <Label>
                        <Input Type="text" required placeholder="Postal Code" onChange={(ev) => handlePostalCode(ev)}/><Div><Span>*</Span></Div>
                    </Label>

                    <Label>
                        <Select required onChange={(ev) => handleProvince(ev)} defaultValue="Select province">
                            <option disabled>Select province</option>
                            <option>AL</option>
                            <option>BC</option>
                            <option>MN</option>
                            <option>NB</option>
                            <option>NL</option>
                            <option>NT</option>
                            <option>NS</option>
                            <option>NU</option>
                            <option>ON</option>
                            <option>PE</option>
                            <option>QC</option>
                            <option>SK</option>
                            <option>YT</option>
                        </Select><Div><Span>*</Span></Div>
                    </Label>

                    <Line/>

                    <PaymentDetails>
                        <P>Payment details</P>
                        <Label>
                            <Input required placeholder="Card Number"/><Div><Span>*</Span></Div>
                        </Label>

                        <Bottom>
                            <Label>
                                <Inp required placeholder="MM/YY"/><Div><Span>*</Span></Div>
                            </Label>

                            <Label>
                                <Inp required placeholder="CVV"/>
                            </Label>

                        </Bottom>
                    </PaymentDetails>
                    <Button type="submit">Place order</Button>
                </Form>
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
const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 20px;
`;
const Label = styled.label`
    margin: 5px;
`;
const Input = styled.input`
    padding: 10px;
    background: var(--color-light-grey);
    border: none;
    border-radius: 5px;
    width: 500px;
`;
const Div = styled.div`
    position: relative;
`;
const Span = styled.span`
    color: red;
    position: absolute;
    bottom: 25px;
    margin: 3px;
    left: 520px;
`;
const Select = styled.select`
    padding: 7px;
    background: var(--color-light-grey);
    border: none;
    border-radius: 5px;
    width: 520px;
    color: var(--color-dark-grey);
`;
const Line = styled.div`
    height: 1px;
    width: 100%;
    background: var(--color-light-grey);
    margin: 10px 0;
`;
const PaymentDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
`;
const P = styled.p`
    margin: 10px;
`;
const Bottom = styled.div`
    display: flex;
`;
const Inp = styled.input`
    padding: 10px;
    background: var(--color-light-grey);
    border: none;
    border-radius: 5px;
    width: 235px;
`;
export default Checkout;