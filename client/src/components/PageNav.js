import React from "react";
import styled from "styled-components";

const PageNav = ({
	totalItems,
	itemsPerPage,
	setCurrentPage,
}) => {

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	// to calculate how many pages we need and push it in array
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<Wrapper>
			{/* map the array to make a list */}
			{pageNumbers.map((number) => (
				<PageNumber
					key={number}
					onClick={() => paginate(number)}
					className="page-link"
				>
					{number}
				</PageNumber>
			))}
		</Wrapper>
	);
};
const Wrapper = styled.ul`
	display: flex;
	justify-content: center;
	`;
const PageNumber = styled.button`
	margin: 10px;
	margin-top: 20px;

	border: none;
	border-radius: 8px;
	font-family: "Poppins", sans-serif;
	background-color: var(--color-lime);
	width: 40px;
	height: 40px;
	transition: background-color 400ms ease-in-out;
	&:hover {
		cursor: pointer;
		background-color: var(--color-neon-lime);
	}
	&:focus {
		cursor: pointer;
		background-color: white;
		border: 1px solid var(--color-lime);
	}
`;

export default PageNav;
