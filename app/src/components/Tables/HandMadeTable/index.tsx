import { EColumns, ESortOrder, IItemData } from '@/app/src/types'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
interface IProps {
	COLUMNS: EColumns[]
	sortedData: IItemData[]
	sortKey: EColumns | null
	sortOrder: ESortOrder | null
	setSortKey: Dispatch<SetStateAction<EColumns | null>>
	setSortOrder: Dispatch<SetStateAction<ESortOrder | null>>
}

function TableHandmade({
	COLUMNS,
	sortedData,
	sortKey,
	sortOrder,
	setSortKey,
	setSortOrder,
}: IProps) {
	const columnsLength = COLUMNS.length

	function THeadClickHandler(columnName: EColumns) {
		let newSortOrder: ESortOrder | null
		if (columnName === sortKey) {
			newSortOrder =
				sortOrder === ESortOrder.asc
					? ESortOrder.desc
					: sortOrder === ESortOrder.desc
					? null
					: ESortOrder.asc
		} else {
			newSortOrder = ESortOrder.asc
			setSortKey(columnName)
		}
		setSortOrder(newSortOrder)
	}

	return (
		columnsLength && (
			<div className='border border-amber-500 rounded-lg overflow-hidden'>
				<ul className={`grid grid-cols-4`}>
					{COLUMNS.map(column => (
						<li
							className={`border-r-amber-700 border-r py-2 px-4 text-center last-of-type:border-none hover:cursor-pointer relative`}
							key={column}
							onClick={() => THeadClickHandler(column)}
						>
							{column}
							{sortOrder && sortKey === column ? (
								<span className='absolute top-[50%] translate-y-[-50%] right-4'>
									{sortOrder === ESortOrder.asc ? '+' : '-'}
								</span>
							) : null}
						</li>
					))}
				</ul>
				<ul>
					{sortedData.map((row, i) => (
						<li
							key={i}
							className={`grid grid-cols-4 border-t-amber-700 border-t`}
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
	)
}

export default TableHandmade
