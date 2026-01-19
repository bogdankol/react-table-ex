import { Dispatch, SetStateAction, useMemo } from 'react'

function Pagination({
	currentPage,
	setCurrentPage,
	totalPages,
}: {
	currentPage: number
	setCurrentPage: Dispatch<SetStateAction<number>>
	totalPages: number
}) {
	const buttonsSequence = useMemo(() => {
		const sequence = [
			currentPage - 2,
			currentPage - 1,
			currentPage,
			currentPage + 1,
			currentPage + 2,
		]
		return sequence.filter(el => el > 0 && el < totalPages)
	}, [currentPage, totalPages])
	return (
		<ul className='flex justify-end space-x-3'>
			{buttonsSequence.map(el => (
				<PaginationBtn
					num={el}
					currentPage={currentPage}
					setPage={setCurrentPage}
					key={el}
				/>
			))}
		</ul>
	)
}

function PaginationBtn({
	num,
	currentPage,
	setPage,
}: {
	num: number
	currentPage: number
	setPage: Dispatch<SetStateAction<number>>
}) {
	return (
		<button
			className={`flex justify-center p-3 border border-amber-500 min-w-10 hover:cursor-pointer ${
				num === currentPage ? `text-cyan-400` : 'text-white'
			}`}
			onClick={() => setPage(num)}
		>
			{num}
		</button>
	)
}

export default Pagination
