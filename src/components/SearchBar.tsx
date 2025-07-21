import { ChangeEvent, FormEvent, useState } from 'react';
import { SearchField, SearchBarProps } from "@/types";

export function SearchBar({ 
	onSubmit, 
	onReset, 
	searchFieldOptions, 
	defaultSearchField = 'all' 
}: SearchBarProps) {
	const [searchTerm, setSearchTerm] = useState('');
	const [submittedTerm, setSubmittedTerm] = useState('');
	const [searchField, setSearchField] = useState<SearchField>('all');
	const [submittedField, setSubmittedField] = useState<SearchField>('all');
	
	const [lastSubmittedState, setLastSubmittedState] = useState({
		term: '',
		field: defaultSearchField as SearchField
	  });

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};
	  
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setSubmittedTerm(searchTerm);
		setLastSubmittedState({
			term: searchTerm.trim(),
			field: searchField
		});
		onSubmit(searchTerm, searchField);
	};

	const handleFieldChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSearchField(e.target.value as SearchField);
	};

	const hasChanges = searchTerm.trim() !== lastSubmittedState.term || searchField !== lastSubmittedState.field;
	const isSearchEnabled = searchTerm.trim() !== '' && hasChanges;
	
	return (
		<div className="mb-6">
		<p className="search-header text-xl font-semibold mb-2">Search</p>
		<p className="mb-3">
		  Searching for: <span id="search-term" className="font-medium">{searchTerm}</span>
		  {searchTerm && searchField !== 'all' && (
			<span> in {searchFieldOptions.find(option => option.value === searchField)?.label || searchField}</span>
		  )}
		</p>
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
		  <div className="flex flex-wrap gap-4 items-end">
			<div className="flex flex-col">
			  <label htmlFor="search-input" className="mb-1 font-medium">Search Term</label>
			  <input 
				id="search-input"
				className="search-input search-field" 
				value={searchTerm}
				onChange={handleChange}
				placeholder="Enter search term..."
			  />
			</div>
			
			<div className="flex flex-col">
			  <label htmlFor="search-field" className="mb-1 font-medium">Search Field</label>
			  <select 
				id="search-field"
				value={searchField}
				onChange={handleFieldChange}
				className="search-field"
			  >
              {searchFieldOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
			  </select>
			</div>
		  </div>
		  
		  <div className="flex gap-3">
			<button 
			  type="submit" 
			  className={`search-submit-button ${!isSearchEnabled ? 'search-button-disabled' : ''}`}
			  disabled={!isSearchEnabled}
			>
			  Search
			</button>
			<button
			  type="button"
			  className="search-reset-button"
			  onClick={(e) => {
				e.preventDefault();
				setSearchTerm('');
				setSubmittedTerm('');
				setSearchField('all');
				setSubmittedField('all');
				setLastSubmittedState({
					term: '',
					field: 'all'
				});
				onReset();
			  }}
			>
			  Reset Search
			</button>
		  </div>
		</form>
	  </div>
	);
}