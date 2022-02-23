import React from "react";
import styled from "styled-components";

import { ItemsContext } from "./ItemsContext.js";
import { PageContext } from "./PageContext";

import Pagination from "./Pagination.js";
import PageNav from "./PageNav.js";
import DropDown from "./DropDown";

const HomePage = () => {
	const { items, setItems } = React.useContext(ItemsContext);
	//  why I consume Pagecontext here and pass down? because pagination component can be reused in the categoryPage component. in categoryPage component we cannot use the state in page context because there will be conflicts.
	const { itemsPerPage, setItemsPerPage, currentPage, setCurrentPage } =
		React.useContext(PageContext);
	return (
		<>
			<DropDown />
			{items && (
				<Wrapper>
					{/* pagination is the page with limites item display, I set it to 24, all the components pass in are from pagecontext current page is set everytime you click on the pagenav button, itemsperpage is fixed and set to 24 */}
					<Pagination
						items={items}
						currentPage={currentPage}
						itemsPerPage={itemsPerPage}
					/>
					{/* PageNav is the navigation of page 1 2 3 4 ....
           */}

					<PageNav
						totalItems={items.length}
						itemsPerPage={itemsPerPage}
						setItemsPerPage={setItemsPerPage}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</Wrapper>
			)}
		</>
	);
};
const Wrapper = styled.div`
	position: absolute;
	top: 120px;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default HomePage;
