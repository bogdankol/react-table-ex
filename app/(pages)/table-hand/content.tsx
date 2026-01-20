'use client'
import TableHandmade from '@/app/src/components/Tables/HandMadeTable'
import { COLUMNS } from '@/app/src/mockData/data_tableHandmade'
import Pagination from '@/app/src/components/Pagination'
import Filters from '@/app/src/components/Filters'
import useSortedData from '@/app/src/hooks/useSortedData'

function Content() {
	const {
		currentPage,
		setCurrentPage,
		totalPages,
		itemsForCurrentPage,
		isPending,
		error,
		selectedCountry,
		setSelectedCountry,
		setNameInput,
		setSortKey,
		setSortOrder,
		sortKey,
		sortOrder,
	} = useSortedData()

	return (
		<div className='space-y-4 px-10 w-full'>
			<Filters
				setSelectedCountry={setSelectedCountry}
				selectedCountry={selectedCountry}
				setCurrentPage={setCurrentPage}
				setNameInput={setNameInput}
			/>
			{isPending ? <h2>Loading...</h2> : null}
			{error ? <p>Error: {error.message}</p> : null}
			{!isPending && !!itemsForCurrentPage?.length ? (
				<>
					<TableHandmade
						{...{
							COLUMNS,
							sortedData: itemsForCurrentPage,
							setSortKey,
							setSortOrder,
							sortKey,
							sortOrder,
						}}
					/>
					<Pagination {...{ currentPage, setCurrentPage, totalPages }} />
				</>
			) : (
				<p>No data found</p>
			)}
		</div>
	)
}

export default Content
