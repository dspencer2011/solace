
import { PaginationProps } from "@/types";

export function Pagination({ 
	currentPage, 
	totalItems, 
	itemsPerPage, 
	paginate, 
	nextPage, 
	prevPage 
}: PaginationProps) {
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	return (
		<div className="pagination-container">
			<div className="pagination-mobile">
				<button
					onClick={prevPage}
					disabled={currentPage === 1}
					className="pagination-mobile-button"
				>
					Previous
				</button>
				<button
					onClick={nextPage}
					disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
					className="pagination-mobile-button-next"
				>
					Next
				</button>
			</div>
			<div className="pagination-desktop">
				<div>
					<p className="pagination-info">
						{totalItems === 0 ? (
							"No results found"
						) : (
							<>
								Showing <span className="pagination-info-number">{indexOfFirstItem + 1}</span> to{' '}
								<span className="pagination-info-number">{Math.min(indexOfLastItem, totalItems)}</span> of{' '}
								<span className="pagination-info-number">{totalItems}</span> results
							</>
						)}
					</p>
				</div>
				<div>
					<nav className="pagination-nav" aria-label="Pagination">
					<button
						onClick={prevPage}
						disabled={currentPage === 1}
						className="pagination-nav-arrow pagination-nav-arrow-prev"
					>
						&laquo;
					</button>
					
					{Array.from({ length: Math.min(5, Math.ceil(totalItems / itemsPerPage)) }, (_, i) => {
						const pageNum = i + 1;
						return (
						<button
							key={i}
							onClick={() => paginate(pageNum)}
							className={`pagination-nav-number ${currentPage === pageNum ? 'pagination-nav-number-active' : ''}`}
						>
							{pageNum}
						</button>
						);
					})}
					
					<button
						onClick={nextPage}
						disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
						className="pagination-nav-arrow pagination-nav-arrow-next"
						>
						&raquo;
					</button>
					</nav>
				</div>
			</div>
		</div>
	);
}