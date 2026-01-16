import type { IItemData } from '@/app/(pages)/table-hand/content'
import { EColumns, ESortOrder } from '@/app/src/types'
import { useMemo, useState } from 'react'
interface IProps {
	COLUMNS: string[]
	data: IItemData[]
}

function TableHandmade({ COLUMNS, data }: IProps) {
	const [sortKey, setSortKey] = useState<EColumns | null>(null)
	const [sortOrder, setSortOrder] = useState<ESortOrder | null>(null)

  const columnsLength = useMemo(() => COLUMNS.length, [COLUMNS])

	const sortedData = useMemo(() => {
		if (!sortKey || !sortOrder) return data

			const res = data.toSorted((a, b) => {

        const aVal = sortKey === EColumns.web_pages ? a[sortKey].length : a[sortKey] ? a[sortKey] : ''
        const bVal = sortKey === EColumns.web_pages ? b[sortKey].length : b[sortKey] ? b[sortKey] : ''

        if (sortOrder === ESortOrder.asc) {
          return sortKey === EColumns.web_pages ? Number(aVal) - Number(bVal) : String(aVal).localeCompare(String(bVal))

        } return sortKey === EColumns.web_pages ? Number(bVal) - Number(aVal) : String(bVal).localeCompare(String(aVal))
      })

		return res
	}, [sortKey, sortOrder, data])

	function THeadClickHandler(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
		const id = e.currentTarget.id as EColumns

		let newSortOrder: ESortOrder | null
		if (id === sortKey) {
			newSortOrder =
				sortOrder === ESortOrder.asc
					? ESortOrder.desc
					: sortOrder === ESortOrder.desc
					? null
					: ESortOrder.asc
		} else {
			newSortOrder = ESortOrder.asc
			setSortKey(id)
		}
		setSortOrder(newSortOrder)
	}

	return columnsLength && (
		<div className='border border-amber-500 rounded-lg overflow-hidden'>
			<ul className={`grid grid-cols-${columnsLength}`}>
				{COLUMNS.map(column => (
					<li
						className={`border-r-amber-700 border-r py-2 px-4 text-center last-of-type:border-none hover:cursor-pointer relative`}
						key={column}
						id={column}
						onClick={e => THeadClickHandler(e)}
					>
						{column}
						{sortOrder && sortKey === column ? (
							<span className='absolute top-[50%] translate-y-[-50%] right-4'>{sortOrder === ESortOrder.asc ? '+' : '-'}</span>
						) : null}
					</li>
				))}
			</ul>
			<ul>
				{sortedData.map((row, i) => (
					<li
						key={i}
						className={`grid grid-cols-${columnsLength} border-t-amber-700 border-t`}
					>
						<div
							className={`border-r-amber-700 border-r py-2 px-4 text-center last-of-type:border-none`}
							key={row.name}
						>
							{row.name}
						</div>
						<div
							className={`border-r-amber-700 border-r py-2 px-4 text-center last-of-type:border-none`}
							key={row.country}
						>
							{row.country}
						</div>
						<div
							className={`border-r-amber-700 border-r py-2 px-4 text-center last-of-type:border-none`}
							key={row.web_pages[0]}
						>
							<ul className='block'>
								{row.web_pages.map(p => (
									<li key={p}>{p}</li>
								))}
							</ul>
						</div>
						<div
							className={`border-r-amber-700 border-r py-2 px-4 text-center last-of-type:border-none`}
							key={row['state-province']}
						>
							{row['state-province'] ?? ''}
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default TableHandmade
