	import { AdvocatesTableProps } from "@/types";
	
	export function AdvocatesTable({ advocates, handleSort, getSortIndicator }: AdvocatesTableProps) {
		return (
			<table className="advocate-table">
				<thead className="advocate-table-header">
					<tr>
						<th 
							className="advocate-table-th-sortable"
							onClick={() => handleSort('firstName')}
							>
							First Name{getSortIndicator('firstName')}
						</th>
						<th 
							className="advocate-table-th-sortable"
							onClick={() => handleSort('lastName')}
							>
							Last Name{getSortIndicator('lastName')}
						</th>
						<th 
							className="advocate-table-th-sortable"
							onClick={() => handleSort('city')}
							>
							City{getSortIndicator('city')}
						</th>
						<th 
							className="advocate-table-th-sortable"
							onClick={() => handleSort('degree')}
							>
							Degree{getSortIndicator('degree')}
						</th>
						<th 
							className="advocate-table-th-sortable"
							onClick={() => handleSort('yearsOfExperience')}
							>
							Years Of Experience{getSortIndicator('yearsOfExperience')}
						</th>
						<th className="advocate-table-th">Specialties</th>
						<th className="advocate-table-th">Phone Number</th>
					</tr>
				</thead>
					<tbody className="advocate-table-body">
						{advocates.map((advocate, i) => {
							return (
							<tr key={i}>
								<td className="advocate-table-td">{advocate.firstName}</td>
								<td className="advocate-table-td">{advocate.lastName}</td>
								<td className="advocate-table-td">{advocate.city}</td>
								<td className="advocate-table-td">{advocate.degree}</td>
								<td className="advocate-table-td">{advocate.yearsOfExperience}</td>
								<td className="advocate-table-td">
									<div className="advocate-table-list-container">
										{advocate.specialties.map((s) => (
											<li key={s}>{s}</li>
										))}
									</div>
								</td>
								<td className="advocate-table-td">{advocate.phoneNumber}</td>
							</tr>
							);
						})}
					</tbody>
			</table>
		);
	}