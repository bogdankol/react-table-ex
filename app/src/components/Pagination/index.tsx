import { Dispatch, SetStateAction, useMemo } from 'react'

function Pagination({
	page,
	setPage,
	totalPages,
}: {
	page: number
	setPage: Dispatch<SetStateAction<number>>
	totalPages: number
}) {

  const buttonsSequence = useMemo(() => {
    const sequence = [page - 2, page - 1, page, page + 1, page + 2]
    return sequence.filter(el => el > 0 && el < totalPages)
  }, [page, totalPages])
	return (
		<ul
			className='flex justify-end space-x-3'
		>
      {buttonsSequence.map(el => <PaginationBtn
					num={el}
					currentPage={el}
          setPage={setPage}
          key={el}
				/>)}
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
