'use client'

import Filters from '@/app/src/components/Filters'
import Pagination from '@/app/src/components/Pagination'
import TanstackTable from '@/app/src/components/Tables/TanstackTable'
import useSortedData from '@/app/src/hooks/useSortedData'

function Content() {
	const {
		currentPage,
		error,
		isPending,
		itemsForCurrentPage,
		selectedCountry,
		setCurrentPage,
		setNameInput,
		setSelectedCountry,
		setSortKey,
		setSortOrder,
		sortKey,
		sortOrder,
		totalPages,
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
          <TanstackTable
            {...{
              allData: itemsForCurrentPage,
              totalPages,
              currentPage,
              setCurrentPage,
              setSortKey,
              setSortOrder,
              sortKey,
              sortOrder,
            }}
          />

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </>
			) : (
				<p>No data found</p>
			)}
		</div>
	)
}

export default Content
