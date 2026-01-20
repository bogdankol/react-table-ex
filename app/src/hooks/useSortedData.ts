import useGetAPIData from './useGetAPIData'
import { useSorting } from './useSortItems'
import { usePaginationProcessing } from './usePaginationProcessing'
import { useState } from 'react'
import { countries } from '../mockData/data_tableHandmade'

export default function useSortedData() {
	const [selectedCountry, setSelectedCountry] = useState(() => countries[0])
	const [nameInput, setNameInput] = useState('')

	const { data, isPending, error } = useGetAPIData(
		selectedCountry,
		nameInput,
		3,
	)
	const { sortedData, setSortKey, setSortOrder, sortKey, sortOrder } =
		useSorting(data)
	const { itemsForCurrentPage, totalPages, currentPage, setCurrentPage } =
		usePaginationProcessing(sortedData, data?.length)

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
