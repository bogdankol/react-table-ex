import { useQuery } from '@tanstack/react-query'
import { countries } from '@/app/src/mockData/data_tableHandmade'
import { useMemo, useState } from 'react'
import { EColumns, ESortOrder, IItemData } from '@/app/src/types'
import { doRequest } from '../helpers/doRequest'
import axios, { AxiosError } from 'axios'

const NUMBER_PER_PAGE = 6

export default function useSortedData() {
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedCountry, setSelectedCountry] = useState(() => countries[0])
	const [nameInput, setNameInput] = useState('')
	const [sortKey, setSortKey] = useState<EColumns | null>(null)
	const [sortOrder, setSortOrder] = useState<ESortOrder | null>(null)

	const { data, isPending, error } = useQuery<IItemData[], AxiosError>({
		queryKey: ['rows', selectedCountry, nameInput],
		queryFn: () =>
			doRequest
				.get(
					`/search?country=${encodeURIComponent(selectedCountry)}` +
						`${nameInput ? `&name=${nameInput}` : ''}`,
				)
				.then(({ data }) => (!!data?.length ? data : [])),
		staleTime: 5 * 60 * 1000,
		enabled: !!selectedCountry,
		retry: (failureCount, error) => {
			if (axios.isAxiosError(error)) {
				if (error.response?.status && error.response.status < 500) {
					return false
				}
			}
			return failureCount < 3
		},
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
			? sortedData.slice(
					(currentPage - 1) * NUMBER_PER_PAGE,
					currentPage * NUMBER_PER_PAGE,
				)
			: []
	}, [currentPage, sortedData])

	const totalPages = !!data?.length
		? Math.ceil(data.length / NUMBER_PER_PAGE)
		: 0

	return {
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
	}
}
