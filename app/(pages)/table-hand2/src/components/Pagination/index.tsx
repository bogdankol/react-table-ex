import React, { useMemo } from 'react'

function Pagination({
	currentPage,
	setCurrentPage,
	totalPages,
}: {
	currentPage: number
	setCurrentPage: (n: number) => void
	totalPages: number
}) {
	const sequence = useMemo(() => {
		return [currentPage - 1, currentPage, currentPage + 1].filter(
			p => p > 0 && p <= totalPages,
		)
	}, [currentPage, totalPages])

	console.log({
		currentPage,
		totalPages,
		sequence,
	})
	return (
		<div className='flex space-x-5 justify-end mt-4 mr-10'>
			{sequence.map(num => (
				<Btn
					key={num}
					{...{
						num,
						isCurrentPage: currentPage === num,
						setCurrentPage,
					}}
				/>
			))}
		</div>
	)
}

function Btn({
	num,
	setCurrentPage,
	isCurrentPage,
}: {
	num: number
	setCurrentPage: (n: number) => void
	isCurrentPage: boolean
}) {
	return (
		<button
			className={`px-4 py-4 hover:cursor-pointer border-2 border-amber-700 ${isCurrentPage ? `text-blue-400` : `text-amber-600`}`}
			onClick={() => setCurrentPage(num)}
		>
			{num}
		</button>
	)
}

export default Pagination
