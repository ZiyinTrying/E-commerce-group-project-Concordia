import React, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Pagination from "./Pagination.js";
import PageNav from "./PageNav.js";
import ItemCard from "./ItemCard";

const CategoryPage = () => {
	const { category } = useParams();
	const [items, setItems] = useState(null);
	const [itemsPerPage, setItemsPerPage] = useState(24);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		fetch(`/items/category/${category}`)
			.then((res) => res.json())
			.then((data) => {
				setItems(data.data);
			})
			.catch((err) => {
				console.log("error");
			});
	}, []);
	return (
		items && (
			<>
				<Banner>Category: {category}</Banner>
				<Wrapper>
					{/* pagination is the page with limites item display, I set it to 24 */}
					<Pagination
						items={items}
						currentPage={currentPage}
						itemsPerPage={itemsPerPage}
					/>
					{/* PageNav is the navigation of page 1 2 3 4 .... */}
					<PageNav
						totalItems={items.length}
						itemsPerPage={itemsPerPage}
						setItemsPerPage={setItemsPerPage}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
					{/* {items.map((item) => {
            return <ItemCard item={item} />;
          })} */}
				</Wrapper>
			</>
		)
	);
};
const Wrapper = styled.div`
	padding-top: 150px;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: center;
	background-color: white;
`;
const Banner = styled.div`
	position: fixed;
	z-index: 2;
	top: 80px;
	font-size: 18px;
	width: 100%;
	padding: 10px 25px;
	background-color: var(--color-lime);
	color: var(--color-dark-grey);
	border-radius: 0 0 5px 5px;
	border: none;
`;

export default CategoryPage;
