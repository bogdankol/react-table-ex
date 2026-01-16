'use client'
import TableHandmade from '@/app/src/components/Tables/HandMadeTable'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { COLUMNS, countries } from '@/app/src/mockData/data_tableHandmade'
import { useMemo, useState } from 'react'
import Pagination from '@/app/src/components/Pagination'
import Filters from '@/app/src/components/Filters'

const URL_STR = `http://universities.hipolabs.com`
const NUMBER_PER_PAGE = 6

export interface IItemData {
	country: string
	name: string
	web_pages: string[]
	['state-province']: string | null
}

function Content() {
	const [page, setPage] = useState(1)
	const [selectedCountry, setSelectedCountry] = useState(() => countries[0])
	const [nameInput, setNameInput] = useState('')

	const { data, isPending, error } = useQuery({
		queryKey: ['rows', selectedCountry, nameInput],
		queryFn: () =>
			fetch(
				URL_STR +
					`/search?country=${encodeURIComponent(selectedCountry)}` +
					`${nameInput ? `&name=${nameInput}` : ''}`,
			)
				.then(r => r.json())
				.then(d => (!!d?.length ? (d as IItemData[]) : [])),
		staleTime: 300000,
	})

	console.log({ data, nameInput })

	const itemsForCurrentPage = useMemo(() => {
		return data
			? data.slice((page - 1) * NUMBER_PER_PAGE, page * NUMBER_PER_PAGE)
			: []
	}, [page, data])
  
	const totalPages = !!data?.length
		? Math.ceil(data.length / NUMBER_PER_PAGE)
		: 0

	return (
		<div className='space-y-4 px-10 w-full'>
			<Filters
				setSelectedCountry={setSelectedCountry}
				selectedCountry={selectedCountry}
				setPage={setPage}
				setNameInput={setNameInput}
			/>
			{isPending ? <h2>Loading...</h2> : null}
			{error ? <p>{error.message}</p> : null}
			{!isPending && !!data?.length ? (
				<>
					<TableHandmade {...{ COLUMNS, data: itemsForCurrentPage }} />
					<Pagination {...{ page, setPage, totalPages }} />
				</>
			) : (
				<p>No data found</p>
			)}
		</div>
	)
}

export default Content
