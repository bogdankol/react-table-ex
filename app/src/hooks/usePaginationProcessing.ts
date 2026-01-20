import { useMemo, useState } from 'react'
import { IItemData } from '../types'
import { NUMBER_PER_PAGE } from '../vars/vars'

export function usePaginationProcessing(
	sortedData: IItemData[] = [],
	totalDataLength: number = 0,
) {
  const [currentPage, setCurrentPage] = useState(1)

	const itemsForCurrentPage = useMemo(() => {
		return sortedData
			? sortedData.slice(
					(currentPage - 1) * NUMBER_PER_PAGE,
					currentPage * NUMBER_PER_PAGE,
				)
			: []
	}, [currentPage, sortedData])

	const totalPages = !!totalDataLength
		? Math.ceil(totalDataLength / NUMBER_PER_PAGE)
		: 0

	return {
		itemsForCurrentPage,
		totalPages,
    currentPage, setCurrentPage
	}
}
