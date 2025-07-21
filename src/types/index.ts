export interface Advocate {
	firstName: string;
	lastName: string;
	city: string;
	degree: string;
	specialties: string[];
	phoneNumber: string;
	yearsOfExperience: number;
}

export interface AdvocatesTableProps {
	advocates: Advocate[];
	handleSort: (field: keyof Advocate) => void;
	getSortIndicator: (field: keyof Advocate) => string;
}

export interface PaginationProps {
	currentPage: number;
	totalItems: number;
	itemsPerPage: number;
	paginate: (pageNumber: number) => void;
	nextPage: () => void;
	prevPage: () => void;
}

export interface SearchFieldOption {
	value: SearchField;
	label: string;
}

export interface SearchBarProps {
	onSubmit: (searchTerm: string, field: SearchField) => void;
	onReset: () => void;
	searchFieldOptions: SearchFieldOption[];
	defaultSearchField?: SearchField;  
}

export type SearchField = 'all' | keyof Advocate;

