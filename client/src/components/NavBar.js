import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { User, ShoppingCart, FileText } from "react-feather";

import { ItemsContext } from "./ItemsContext";
import SearchBar from "./SearchBar";

const NavBar = () => {
	const history = useHistory();

	const { currentCart } = useContext(ItemsContext);

	//redirecting on the home page
	const handleToHomePage = () => {
		history.push("/");
	};

	//redirecting to the cart
	const handleToCart = () => {
		history.push("/cart");
	};

	//redirecting to the order details(will be active after we realise conditional rendering of this icon)
	const handleToOrder = () => {
		history.push("/order");
	};

	return (
		<Wrapper>
			<Logo onClick={handleToHomePage}>Best e-commerce site</Logo>
			<SearchBar />
			<Icon>
				<User />
			</Icon>
			<Icon onClick={handleToCart}>
				<ShoppingCart />
				<NumItems>{currentCart?.length}</NumItems>
			</Icon>
			<Icon onClick={handleToOrder}>
				<FileText />
			</Icon>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: fixed;
	z-index: 200;
	height: 80px;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	background: var(--color-dark-grey);
	align-items: center;
`;
const Logo = styled.button`
	margin-right: auto;
	padding: 20px;
	font-size: 30px;
	text-transform: uppercase;
	font-weight: 700;
	color: var(--color-lime);
	background: transparent;
	border: none;

	&:hover {
		cursor: pointer;
		color: var(--color-neon-lime);
	}
	&:focus {
		cursor: pointer;
		color: var(--color-neon-lime);
	}
`;
const SearchInput = styled.input`
	background: var(--color-light-grey);
	padding: 10px;
	border-radius: 5px;
	border: none;
	width: 300px;
	font-size: 18px;
`;
const Icon = styled.button`
	padding: 20px;
	color: var(--color-lime);
	background: transparent;
	border: none;

	&:hover {
		cursor: pointer;
		color: var(--color-neon-lime);
	}
	&:focus {
		cursor: pointer;
		color: var(--color-neon-lime);
	}
`;
const NumItems = styled.span`
	margin: 5px;
`;
export default NavBar;
