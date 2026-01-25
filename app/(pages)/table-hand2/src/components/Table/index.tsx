import { Item, EColumns, ESortOrder } from '../../types/types'

function Table({
	data,
	columns,
	setNewSortColumnName,
	sortColumn,
	sortOrder,
}: {
	data: Item[]
	columns: EColumns[]
	setNewSortColumnName: (v: EColumns) => void
	sortColumn: EColumns | null
	sortOrder: ESortOrder | null
}) {
	return (
		<div className='w-full border-2 border-amber-400 rounded-lg overflow-hidden'>
			<ul className='grid grid-cols-4 text-center' role='row'>
				{columns.map(columnName => (
					<li
						key={columnName}
						id={columnName}
						className='border-r-2 border-amber-400px-4 py-2 hover:cursor-pointer relative'
            onClick={e => {
              const newSortColumnName = e.currentTarget.id as EColumns
              setNewSortColumnName(newSortColumnName)
            }}
					>
						{columnName}
						{sortColumn === columnName && sortOrder ? (
							<span className='absolute top-2 right-4'>
								{sortOrder === ESortOrder.asc ? '+' : '-'}
							</span>
						) : null}
					</li>
				))}
			</ul>
			<ul className='' role="rowgroup">
				{data.map(el => (
					<li
            role="table-row"
						key={el.name}
						className='border-2 border-amber-400 grid grid-cols-4 text-center'
					>
						<div className='border-r-2 border-amber-400 px-4 py-2 ' role='cell'>
							{el.name}
						</div>
						<div className='border-r-2 border-amber-400 px-4 py-2 ' role='cell'>
							{el.country}
						</div>
						<div className='border-r-2 border-amber-400 px-4 py-2 ' role='cell'>
							{el.web_pages.map(p => (
								<p key={p}>{p}</p>
							))}
						</div>
						<div role='cell'>{el['state-province']}</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Table
