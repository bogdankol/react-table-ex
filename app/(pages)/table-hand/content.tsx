'use client'
import TableHandmade from '@/app/src/components/Tables/HandMadeTable'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { COLUMNS, countries } from '@/app/src/mockData/data_tableHandmade'
import { useMemo, useState } from 'react'
import Pagination from '@/app/src/components/Pagination'
import Filters from '@/app/src/components/Filters'
import { EColumns, ESortOrder } from '@/app/src/types'

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
	const [sortKey, setSortKey] = useState<EColumns | null>(null)
	const [sortOrder, setSortOrder] = useState<ESortOrder | null>(null)

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

	const sortedData = useMemo(() => {
		if (!sortKey || !sortOrder) return data

		const res = data?.toSorted((a, b) => {
			const aVal =
				sortKey === EColumns.web_pages
					? a[sortKey].length
					: a[sortKey]
					? a[sortKey]
					: ''
			const bVal =
				sortKey === EColumns.web_pages
					? b[sortKey].length
					: b[sortKey]
					? b[sortKey]
					: ''

			if (sortOrder === ESortOrder.asc) {
				return sortKey === EColumns.web_pages
					? Number(aVal) - Number(bVal)
					: String(aVal).localeCompare(String(bVal))
			}
			return sortKey === EColumns.web_pages
				? Number(bVal) - Number(aVal)
				: String(bVal).localeCompare(String(aVal))
		})

		return res
	}, [sortKey, sortOrder, data])

	const itemsForCurrentPage = useMemo(() => {
		return sortedData
			? sortedData.slice((page - 1) * NUMBER_PER_PAGE, page * NUMBER_PER_PAGE)
			: []
	}, [page, sortedData])

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
					<Pagination {...{ page, setPage, totalPages }} />
				</>
			) : (
				<p>No data found</p>
			)}
		</div>
	)
}

export default Content
