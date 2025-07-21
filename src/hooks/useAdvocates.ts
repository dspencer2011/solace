import { useState, useEffect } from 'react';
import { Advocate, SearchField } from "@/types";

export function useAdvocates() {
	const [advocates, setAdvocates] = useState<Advocate[]>([]);
	const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

	useEffect(() => {
		console.log("fetching advocates...");
		fetch("/api/advocates").then((response) => {
			response.json().then((jsonResponse) => {
				setAdvocates(jsonResponse.data);
				setFilteredAdvocates(jsonResponse.data);
			});
		});
	}, []);

	const resetFilter = () => {
		setFilteredAdvocates(advocates);
	};

  const filterAdvocates = (searchTerm: string, field: SearchField = 'all') => {
    if (!searchTerm.trim()) {
      resetFilter();
      return;
    }
    
    const searchTermLower = searchTerm.toLowerCase();
    
    const filtered = advocates.filter((advocate) => {
      switch (field) {
        case 'name' as SearchField:
          return advocate.firstName.toLowerCase().includes(searchTermLower) || 
                 advocate.lastName.toLowerCase().includes(searchTermLower);
        
        case 'city' as SearchField:
          return advocate.city.toLowerCase().includes(searchTermLower);
        
        case 'degree' as SearchField:
          return advocate.degree.toLowerCase().includes(searchTermLower);
        
        case 'specialties' as SearchField:
          return advocate.specialties.some(specialty => 
            specialty.toLowerCase().includes(searchTermLower)
          );
        
        case 'experience' as SearchField:
          return String(advocate.yearsOfExperience).includes(searchTerm);
        
        case 'phone' as SearchField:
          return String(advocate.phoneNumber).includes(searchTerm);
        
        case 'all':
        default:
          return advocate.firstName.toLowerCase().includes(searchTermLower) ||
                 advocate.lastName.toLowerCase().includes(searchTermLower) ||
                 advocate.city.toLowerCase().includes(searchTermLower) ||
                 advocate.degree.toLowerCase().includes(searchTermLower) ||
                 advocate.specialties.some(specialty => 
                   specialty.toLowerCase().includes(searchTermLower)
                 ) ||
                 String(advocate.yearsOfExperience).includes(searchTerm) ||
                 String(advocate.phoneNumber).includes(searchTerm);
      }
    });
    
    setFilteredAdvocates(filtered);
  };

	return {
		advocates,
		filteredAdvocates,
		resetFilter,
		filterAdvocates
	};
}