import React, { createContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import arrow from "../arrow.png";

const DropDown = () => {
	const history = useHistory();

	const [selectedCategory, setSelectedCategory] = useState(null);
	const [categories, setCategories] = useState(null);
	const getCategory = (ev) => {
		setSelectedCategory(ev.target.value);
		history.push(`/items/category/${ev.target.value}`);
	};
	// fetch the categories and put it into state catogory
	useEffect(() => {
		fetch("/categories")
			.then((res) => res.json())
			.then((data) => {
				setCategories(data.data);
			})
			.catch((err) => {
				console.log("error");
			});
	}, []);
	return (
		<>
			<Select onChange={(ev) => getCategory(ev)}>
				<Option>Select Catogory</Option>
				{categories?.map((category, index) => {
					return (
						<Option key={index} value={category.name}>
							{category.name}
						</Option>
					);
				})}
			</Select>
		</>
	);
};
const Select = styled.select`
	position: fixed;

	top: 80px;
	z-index: 2;
	width: 100%;
	font-size: 20px;
	color: var(--color-dark-grey);
	padding: 10px 20px;
	background-color: var(--color-lime);
	border-radius: 0 0 5px 5px;
	border: none;
	appearance: none;
	transition: background-color 400ms ease-in-out;
	background-image: url(${arrow});
	background-repeat: no-repeat;
	background-position: 185px center;
	background-size: 15px 15px;
	&:hover {
		cursor: pointer;
		background-color: var(--color-neon-lime);
	}
`;
const Option = styled.option`
	color: blue;
	border: 2px solid black;
`;
export default DropDown;
