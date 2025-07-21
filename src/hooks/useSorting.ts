import { useState } from 'react';

export function useSorting<T>(initialData: T[], initialSortField: keyof T) {
	const [sortField, setSortField] = useState<keyof T>(initialSortField);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

	const handleSort = (field: keyof T) => {
		if (sortField === field) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortField(field);
			setSortDirection('asc');
		}
	};

	const getSortIndicator = (field: keyof T) => {
		if (sortField === field) {
			return sortDirection === 'asc' ? ' ↑' : ' ↓';
		}
		return '';
	};

	const sortedData = [...initialData].sort((a, b) => {
		let valueA = a[sortField];
		let valueB = b[sortField];
		
		// Special handling for numbers
		if (typeof valueA === 'number' && typeof valueB === 'number') {
			return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
		}

		const strA = String(valueA).toLowerCase();
		const strB = String(valueB).toLowerCase();
	
		
		if (strA < strB) return sortDirection === 'asc' ? -1 : 1;
		if (strA > strB) return sortDirection === 'asc' ? 1 : -1;
		return 0;
	});

	return {
		sortedData,
		sortField,
		sortDirection,
		handleSort,
		getSortIndicator
	};
}