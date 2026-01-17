import { countries } from '@/app/src/mockData/data_tableHandmade'
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { addOutsideClickEventHandlerToRef } from '../../helpers/client'

function Filters({
	setSelectedCountry,
	selectedCountry,
	setPage,
	setNameInput,
}: {
	setSelectedCountry?: Dispatch<SetStateAction<string>>
	selectedCountry?: string
	setPage: Dispatch<SetStateAction<number>>
	setNameInput?: Dispatch<SetStateAction<string>>
}) {
	return (
		<div className='flex space-x-4 bg-amber-800 items-center'>
			{setSelectedCountry && selectedCountry ? (
				<CountrySelector
					{...{
						setSelectedCountry,
						selectedCountry,
						setPage,
					}}
				/>
			) : null}

			{setNameInput ? <NameInputFilter setNameInput={setNameInput} /> : null}
		</div>
	)
}

function NameInputFilter({
	setNameInput,
}: {
	setNameInput: Dispatch<SetStateAction<string>>
}) {
	const timer = useRef<NodeJS.Timeout | null>(null)

	return (
		<input
			placeholder='enter name...'
			className='w-[150px] h-10 bg-blue-300 rounded flex items-center px-4 text-black font-bold'
			onChange={e => {
        if(timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => setNameInput(e.target.value), 2000)
			}}
		/>
	)
}

function CountrySelector({
	setSelectedCountry,
	selectedCountry,
	setPage,
}: {
	setSelectedCountry: Dispatch<SetStateAction<string>>
	selectedCountry: string
	setPage: Dispatch<SetStateAction<number>>
}) {
	const [isOpened, setIsOpened] = useState(false)

	const parentRef = useRef<HTMLDivElement>(null)

  const clickHandler = useCallback((e: MouseEvent) => addOutsideClickEventHandlerToRef(parentRef, e, setIsOpened), [parentRef, setIsOpened])

	useEffect(() => {
		document.addEventListener('click', clickHandler)

		return () => {
			document.removeEventListener('click', clickHandler)
		}
	}, [clickHandler])

	return (
		<div
			className='relative rounded-lg w-25 hover:cursor-pointer'
			id='parent'
			ref={parentRef}
		>
			<p
				onClick={() => setIsOpened(prev => !prev)}
				className='py-2 w-full border border-b-cyan-400 text-center'
			>
				{selectedCountry}
			</p>
			{isOpened ? (
				<ul
					onClick={e => {
						const target = e.target as HTMLElement
						if (target.tagName.toLowerCase() === 'li') {
							setIsOpened(false)
							setSelectedCountry(target.id)
							setPage(1)
						}
					}}
					className='w-full border border-b-cyan-400 space-y-1 rounded-lg absolute top-0 left-0 right-0 z-10'
				>
					{countries.map(el => (
						<li
							className='py-2 px-4 text-center bg-blue-200 text-blue-950 hover:cursor-pointer'
							key={el}
							id={el}
						>
							{el}
						</li>
					))}
				</ul>
			) : null}
		</div>
	)
}

export default Filters
