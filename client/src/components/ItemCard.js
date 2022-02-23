import React, { createContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { ItemsContext } from "./ItemsContext.js";

const ItemCard = ({ item }) => {
	const { cartItems, setCartItems, reRender, setReRender } = React.useContext(ItemsContext);

	const history = useHistory();

	const handleItemDetails = (e) => {
		if (e.key === "Enter" || e.type === "click") {
			history.push(`/item/${item._id}`);
		}
	};

	const handleAddToCart = (ev) => {
		ev.stopPropagation()

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
			if (selectedItem?.quantity + 1 > item.numInStock) {
				window.alert("Not enough of items");
			} else {
				let cartCopy = [...cartItems];
				let newQuantity = selectedItem?.quantity;
				cartCopy[myIndex] = {
					...selectedItem,
					quantity: 1 + newQuantity,
				};
				setCartItems(cartCopy);
				setReRender(!reRender)
			}
		}

		//if we don't have matching item in the array - push it in the array
		else {
			setCartItems([...cartItems, { ...item, quantity: 1 }]);
			setReRender(!reRender)
		}
	};

	//storing array with selected items in local storage if it's not empty
	if (cartItems?.length !== 0) {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}

	return (
		<Wrapper onClick={handleItemDetails}>
			<Img src={item.imageSrc} />
			<Info>
				<Name>{item.name}</Name>
				<Price>{item.price}</Price>

				<AddCartButton onClick={handleAddToCart}>ADD TO CART</AddCartButton>
			</Info>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	width: 350px;
	height: 350px;
	display: flex;
	padding: 20px;
	margin: 10px 20px;
	border-radius: 10px;
	transition: 0.4s ease-in-out;
	background-color: var(--color-light-grey);
	&:hover {
		cursor: pointer;
		box-shadow: -2px 2px 10px 5px #cacaca;
	}
`;
const Img = styled.img`
	width: 200px;
	max-height: 250px;
	border-radius: 10px;
`;
const Info = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 20px;
`;
const Name = styled.div``;
const Price = styled.div`
	margin-top: 25px;
`;
const AddCartButton = styled.button`
	margin-top: 15px;
	border: none;
	border-radius: 8px;
	font-family: "Poppins", sans-serif;
	font-size: 12px;
	background-color: var(--color-lime);
	width: 100px;
	height: 40px;
	transition: background-color 400ms ease-in-out;
	&:hover {
		cursor: pointer;
		background-color: var(--color-neon-lime);
	}
`;

export default ItemCard;
