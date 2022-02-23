import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";

import styled from "styled-components";

import { ItemsContext } from "./ItemsContext";

import Button from "./Button";

const ItemDetails = () => {
	const { _id } = useParams();

	//consuming array where we gonna store selected items
	const { cartItems, setCartItems, setReRender, reRender } =
		useContext(ItemsContext);

	//variable to store fetch result
	const [item, setItem] = useState(null);

	//variable to store number of items user wants to put to the cart
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		fetch(`/items/${_id}`)
			.then((res) => res.json())
			.then((data) => setItem(data.data))
			.catch((err) => {
				console.log("error");
			});
	}, [_id]);

	//decreases num of items by 1
	const handleDecrement = () => {
		if (quantity > 0) setQuantity(quantity - 1);
	};

	//increases num of items by 1
	const handleIncrement = () => {
		if (quantity <= item.numInStock - 1) setQuantity(quantity + 1);
	};

	//pushing selected item into array "cartItems", where we store all items user picks
	const handleAddToCart = () => {
		let myIndex;

		//searchin for an item in the array who's id matches the id of the item we are addin to the cart
		let selectedItem = cartItems.find((element, index) => {
			if (item._id === element._id) {
				myIndex = index;
			}

			return item._id === element._id;
		});

		//if we find selected item in the array of items, add selected quantity to the existing one;
		if (selectedItem) {
			//if we don't have enough of items give an alert
			if (selectedItem?.quantity + quantity > item.numInStock) {
				window.alert("Not enough of items");
			} else {
				let cartCopy = [...cartItems];
				let newQuantity = selectedItem?.quantity;
				cartCopy[myIndex] = {
					...selectedItem,
					quantity: quantity + newQuantity,
				};
				setCartItems(cartCopy);
				setReRender(!reRender)
			}
		}

		//if we don't have matching item in the array - push it in the array
		else {
			setCartItems([...cartItems, { ...item, quantity: quantity }]);
			setReRender(!reRender)
		}
	};

	//storing array with selected items in local storage if it's not empty
	if (cartItems?.length !== 0) {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}

	return (
		<>
			{item && (
				<Wrapper>
					<Card>
						<Image src={item.imageSrc} />
						<Info>
							<Name>{item.name}</Name>
							<InStock>In stock: {item.numInStock}</InStock>
							<Price>{item.price}</Price>
							<Quantity>
								<Btn onClick={handleDecrement}>-</Btn>
								<Number>{quantity}</Number>
								<Btn onClick={handleIncrement}>+</Btn>
							</Quantity>
							{quantity === item.numInStock + 1 || quantity === 0 ? (
								<Disabled>Add to cart</Disabled>
							) : (
								<Button onClick={handleAddToCart}>Add to cart</Button>
							)}
						</Info>
					</Card>
				</Wrapper>
			)}
		</>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 85vh;
	padding-top: 80px;
`;
const Card = styled.div`
	margin-top: 30px;
	display: flex;
	width: 900px;
	padding: 20px;
	border-radius: 10px;
	transition: 0.4s ease-in-out;
	background: var(--color-dark-grey);
	color: var(--color-light-grey);
	box-shadow: -2px 2px 10px 5px #cacaca;
`;
const Image = styled.img`
	flex: 1;
	height: 100%;
	border-radius: 10px;
`;
const Info = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1;
	margin: 20px;
`;
const Name = styled.div`
	margin: 20px;
	font-size: 24px;
`;
const Price = styled.div`
	margin: 20px;
	text-align: left;
	font-size: 24px;
`;
const InStock = styled.div`
	margin: 20px;
	align-self: flex-start;
`;
const Quantity = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Number = styled.span`
	margin: 10px;
	color: var(--color-lime);
	font-weight: 700;
`;
const Btn = styled.button`
	padding: 5px 10px;
	border: 1px solid var(--color-dark-grey);
	border-radius: 5px;
`;
const Disabled = styled.button`
	margin: 20px;
	position: relative;
	display: inline-block;
	padding: 15px 30px;
	background: var(--color-light-grey);
	color: var(--color-dark-grey);
	text-transform: uppercase;
	font-weight: 700;
	font-size: 24px;
	overflow: hidden;
	border: 2px solid var(--color-dark-grey);
	border-radius: 5px;
	&:hover {
		cursor: not-allowed;
	}
`;

export default ItemDetails;
