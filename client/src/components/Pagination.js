import React from "react";
import styled from "styled-components";

import ItemCard from "./ItemCard.js";

const Pagination = ({ items, currentPage, itemsPerPage }) => {

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	return (
		items && (
			<Wrapper>
				{items.slice(indexOfFirstItem, indexOfLastItem).map((item, index) => {
					return <ItemCard item={item} key={index}/>;
				})}
			</Wrapper>
		)
	);
};
const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding-top: 20px;
	background-color: white;
`;
export default Pagination;
