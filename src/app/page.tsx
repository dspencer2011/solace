"use client";

import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { AdvocatesTable } from "@/components/AdvocatesTable";
import { Pagination } from "@/components/Pagination";
import { useAdvocates } from "@/hooks/useAdvocates";
import { useSorting } from "@/hooks/useSorting";
import { usePagination } from "@/hooks/usePagination";
import { SearchField, SearchFieldOption } from "@/types";


export default function Home() {
  const { filteredAdvocates, resetFilter, filterAdvocates } = useAdvocates();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { 
    sortedData: sortedAdvocates, 
    handleSort, 
    getSortIndicator 
  } = useSorting(filteredAdvocates, 'lastName');
  
  const { 
    currentItems: currentAdvocates,
    currentPage,
    paginate,
    nextPage,
    prevPage,
    setCurrentPage
  } = usePagination(sortedAdvocates, 10);

  const handleSearchSubmit = (term: string, field: SearchField) => {
    setSearchTerm(term);
    filterAdvocates(term, field);
    setCurrentPage(1);
  };

  const handleResetSearch = () => {
    setSearchTerm('');
    resetFilter();
    setCurrentPage(1);
  };

  const searchFieldOptions: SearchFieldOption[] = [
    { value: 'all' as SearchField, label: 'All Fields' },
    { value: 'name' as SearchField, label: 'Name' },
    { value: 'city' as SearchField, label: 'City' },
    { value: 'degree' as SearchField, label: 'Degree' },
    { value: 'specialties' as SearchField, label: 'Specialties' },
    { value: 'experience' as SearchField, label: 'Experience' },
    { value: 'phone' as SearchField, label: 'Phone' }
  ];

  return (
    <main style={{ margin: "24px" }}>
      <h1 className="text-2xl font-bold mb-6">Advocates Directory</h1>
      
      <SearchBar 
        onSubmit={(term: string, field: SearchField) => handleSearchSubmit(term, field)}
        onReset={handleResetSearch}
        searchFieldOptions={searchFieldOptions}
      />

      <Pagination 
          currentPage={currentPage}
          totalItems={sortedAdvocates.length}
          itemsPerPage={10}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
      />
      
      <div className="mt-0">
        <AdvocatesTable 
          advocates={currentAdvocates}
          handleSort={handleSort}
          getSortIndicator={getSortIndicator}
        />
      </div>
    </main>
  );
}
