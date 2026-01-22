import { EColumns, ESortOrder, IItemData } from '@/app/src/types'
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	getSortedRowModel,
	SortingState,
	getPaginationRowModel,
} from '@tanstack/react-table'
import { columns } from '@/app/(pages)/table-tanstack/data'
import { Dispatch, SetStateAction, useState } from 'react'
import { NUMBER_PER_PAGE } from '@/app/src/vars/vars'
import Pagination from '../../Pagination'

function TanstackTable({
	allData,
	totalPages,
	currentPage,
	setCurrentPage,
	setSortKey,
	setSortOrder,
	sortKey,
	sortOrder,
}: {
	allData: IItemData[]
	totalPages: number
	currentPage: number
	setCurrentPage: Dispatch<SetStateAction<number>>
	setSortKey: Dispatch<SetStateAction<EColumns | null>>
	setSortOrder: Dispatch<SetStateAction<ESortOrder | null>>
	sortKey: EColumns | null
	sortOrder: ESortOrder | null
}) {
	const [sorting, setSorting] = useState<SortingState>([])

	const table = useReactTable({
		data: allData,
		columns,
		pageCount: totalPages,
		state: {
			sorting,
			pagination: { pageIndex: currentPage, pageSize: NUMBER_PER_PAGE },
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		manualPagination: true,
	})

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
    setCurrentPage(1)
	}

	return (
		<>
			<table className='min-w-full border'>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th
									key={header.id}
									className='border p-2 cursor-pointer relative text-center w-1/4'
									onClick={_ => {
										THeadClickHandler(header.column.id as EColumns)
									}}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
									{sortOrder && sortKey === header.column.id ? (
										<span className='absolute top-[50%] translate-y-[-50%] right-4'>
											{sortOrder === ESortOrder.asc ? '+' : '-'}
										</span>
									) : null}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id}>
							{row.getVisibleCells().map(cell => (
								<td
									key={cell.id}
									className='border p-2'
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default TanstackTable
