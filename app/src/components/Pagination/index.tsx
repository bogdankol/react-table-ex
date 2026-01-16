import { Dispatch, SetStateAction } from 'react'

function Pagination({
  page,
  setPage,
  totalPages
}: {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  totalPages: number
}) {
  return (
    <ul className='flex justify-end space-x-3' onClick={e => {
      // @ts-expect-error attributes extension
      const clickedPage = Number(e.target.dataset.goto)
      if(!clickedPage) return
      return clickedPage === page ? null : setPage(clickedPage)
    }}>
      {page - 1 > 0 ? <PaginationBtn num={page - 1} currentPage={page} /> : null}
      {page > 0 ? <PaginationBtn num={page} currentPage={page} /> : null}
      {page + 1 <= totalPages ? <PaginationBtn num={page + 1} currentPage={page} /> : null}
    </ul>
  )
}

function PaginationBtn({num, currentPage}: {num: number, currentPage: number}) {
  return <button className={`flex justify-center p-3 border border-amber-500 min-w-10 hover:cursor-pointer ${num === currentPage ? `text-cyan-400` : ''}`} data-goto={num}>{num}</button>

}

export default Pagination