import React, { createContext, useState, useEffect } from "react";

export const PageContext = createContext(null);

export const PageProvider = ({ children }) => {
	const [itemsPerPage, setItemsPerPage] = useState(24);
	const [currentPage, setCurrentPage] = useState(1);

	return (
		<PageContext.Provider
			value={{
				itemsPerPage,
				setItemsPerPage,
				currentPage,
				setCurrentPage,
			}}
		>
			{children}
		</PageContext.Provider>
	);
};
