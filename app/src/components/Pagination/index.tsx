import { Dispatch, SetStateAction } from 'react'

function Pagination({
	page,
	setPage,
	totalPages,
}: {
	page: number
	setPage: Dispatch<SetStateAction<number>>
	totalPages: number
}) {
	return (
		<ul
			className='flex justify-end space-x-3'
		>
			{page - 1 > 0 ? (
				<PaginationBtn
					num={page - 1}
					currentPage={page}
          setPage={setPage}
				/>
			) : null}
			{page > 0 ? (
				<PaginationBtn
					num={page}
					currentPage={page}
          setPage={setPage}
				/>
			) : null}
			{page + 1 <= totalPages ? (
				<PaginationBtn
					num={page + 1}
					currentPage={page}
          setPage={setPage}
				/>
			) : null}
		</ul>
	)
}

function PaginationBtn({
	num,
	currentPage,
  setPage
}: {
	num: number
	currentPage: number
  setPage: Dispatch<SetStateAction<number>>
}) {
	return (
		<button
			className={`flex justify-center p-3 border border-amber-500 min-w-10 hover:cursor-pointer ${
				num === currentPage ? `text-cyan-400` : ''
			}`}
			onClick={() => setPage(num)}
		>
			{num}
		</button>
	)
}

export default Pagination
