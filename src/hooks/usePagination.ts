import { useState } from 'react';

export function usePagination<T>(data: T[], itemsPerPage: number) {
	const [currentPage, setCurrentPage] = useState(1);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
	const nextPage = () => setCurrentPage(prev => 
		Math.min(prev + 1, Math.ceil(data.length / itemsPerPage))
	);
	const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

	return {
		currentPage,
		currentItems,
		indexOfFirstItem,
		indexOfLastItem,
		paginate,
		nextPage,
		prevPage,
		setCurrentPage
	};
}