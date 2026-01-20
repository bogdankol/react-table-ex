import { useMemo, useState } from 'react'
import { EColumns, ESortOrder, IItemData } from '../types'

export function useSorting(data: IItemData[] | undefined) {
	const [sortKey, setSortKey] = useState<EColumns | null>(null)
	const [sortOrder, setSortOrder] = useState<ESortOrder | null>(null)

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

	return {
		sortedData,
		sortKey,
		setSortKey,
		sortOrder,
		setSortOrder,
	}
}
