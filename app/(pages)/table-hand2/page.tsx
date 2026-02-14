'use client'

import { URL_STR, COLUMNS, PER_PAGE, COUNTRIES_LIST } from './src/vars/vars'
import { useQuery } from '@tanstack/react-query'
import Table from './src/components/Table'
import { EColumns, ESortOrder, Item } from './src/types/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Pagination from './src/components/Pagination'
import Filters from './src/components/Filters'
import Image from 'next/image'

function page() {
	const [sortColumn, setSortColumn] = useState<EColumns | null>(null)
	const [sortOrder, setSortOrder] = useState<ESortOrder | null>(null)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [selectedCountry, setSelectedCountry] = useState(COUNTRIES_LIST[0])
	const [nameInput, setNameInput] = useState<string>('')

	const { data, isPending, error } = useQuery<Item[]>({
		queryKey: ['data', selectedCountry, nameInput],
		queryFn: ({ signal }) =>
			fetch(URL_STR + `search?country=${selectedCountry}` + `${nameInput ? `&name=${nameInput}` : ''}`, { signal })
				.then(d => d.json())
				.then(r => (!!r.length ? r : [])),
		retry: (failureCount, error) => {
			if (failureCount < 3) {
				return true
			}
			alert(error?.message ?? 'ERROR')
			return false
		},
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
	})

	const setNewSortColumnName = useCallback(
		(newSortColumnName: EColumns) => {
			if (!data || !!!data.length) return

			if (sortColumn === newSortColumnName) {
				if (sortOrder === ESortOrder.asc) {
					setSortOrder(ESortOrder.desc)
				} else if (sortOrder === ESortOrder.desc) {
					setSortOrder(null)
					setSortColumn(null)
				}
			} else {
				setSortOrder(ESortOrder.asc)
				setSortColumn(newSortColumnName)
			}
		},
		[data, sortColumn, sortOrder],
	)

	const sortedData = useMemo(() => {
		if (!sortColumn || !sortOrder || !data || !!!data.length) return data ?? []

		const sortedData = data.toSorted((a, b) => {
			const aVal = Array.isArray(a[sortColumn])
				? a[sortColumn].length
				: a[sortColumn]
					? a[sortColumn]
					: ''
			const bVal = Array.isArray(b[sortColumn])
				? b[sortColumn].length
				: b[sortColumn]
					? b[sortColumn]
					: ''

			if (sortOrder === ESortOrder.asc) {
				return sortColumn === EColumns.web_pages
					? Number(aVal) - Number(bVal)
					: String(aVal).localeCompare(String(bVal))
			}
			return sortColumn === EColumns.web_pages
				? Number(bVal) - Number(aVal)
				: String(bVal).localeCompare(String(aVal))
		})

		setCurrentPage(1)

		return sortedData
	}, [sortColumn, sortOrder, data])

	const itemsForCurrentPage = useMemo(() => {
		if (!sortedData || !!!sortedData.length) return []

		const slice = sortedData.slice(
			(currentPage - 1) * PER_PAGE,
			currentPage * PER_PAGE,
		)
		return slice
	}, [sortedData, currentPage])

	useEffect(() => {
		resetStates()
	}, [selectedCountry, nameInput])

  function resetStates() {
    setCurrentPage(1)
    setSortColumn(null)
    setSortOrder(null)
  }

	const totalPages = data ? Math.ceil(data.length / PER_PAGE) : 0

  function getPropFormObj<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
  }

  getPropFormObj({id: 123, name: 'asdasdad'}, 'id')

	return (
    <div>
      <Image
        alt='asd'
        title='asd'
        width='200'
        height='300'
        src='https://upload.wikimedia.org/wikipedia/commons/7/72/Billy_Herrington.jpg'
        blurDataURL='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
        placeholder='blur'
      />

      <p className='selection:text-amber-600 selection:bg-amber-600'>asdasdasdasdasd</p>
    </div>
		// <div>
		// 	<Filters
		// 		{...{
		// 			selectedCountry,
		// 			setSelectedCountry,
    //       setNameInput,
    //       nameInput
		// 		}}
		// 	/>
		// 	{isPending && <p>Loading...</p>}
		// 	{error && <p>Error: {error.message}</p>}
		// 	{!error && !isPending && (
		// 		<>
		// 			<Table
		// 				{...{
		// 					data: itemsForCurrentPage,
		// 					columns: COLUMNS,
		// 					setNewSortColumnName,
		// 					sortColumn,
		// 					sortOrder,
		// 				}}
		// 			/>

		// 			<Pagination
		// 				{...{
		// 					currentPage,
		// 					setCurrentPage,
		// 					totalPages,
		// 				}}
		// 			/>
		// 		</>
		// 	)}
		// </div>
	)
}

export default page
