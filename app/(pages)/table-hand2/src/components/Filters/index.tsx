import { COUNTRIES_LIST } from '../../vars/vars'
import { useCallback, useEffect, useRef, useState } from 'react'

function Filters({
	selectedCountry,
	setSelectedCountry,
	setNameInput,
	nameInput,
}: {
	selectedCountry?: string
	setSelectedCountry?: (c: string) => void
	setNameInput?: (c: string) => void
	nameInput: string
}) {
	return (
		<div className='flex space-x-8 border-2 border-amber-300 mb-4'>
			{selectedCountry && setSelectedCountry && (
				<CountrySelector
					{...{
						selectedCountry,
						setSelectedCountry,
					}}
				/>
			)}

			{setNameInput && (
				<NameInput
					{...{
						nameInput,
						setNameInput,
					}}
				/>
			)}
		</div>
	)
}

function NameInput({
	nameInput,
	setNameInput,
}: {
	nameInput: string
	setNameInput: (c: string) => void
}) {
	const timer = useRef<ReturnType<typeof setTimeout>>(null)

	useEffect(() => {
		return () => {
			if (timer.current) clearTimeout(timer.current)
		}
	}, [])

	return (
		<input
      placeholder='Enter name here...'
			onChange={e => {
				if (timer.current) clearTimeout(timer.current)

				timer.current = setTimeout(() => {
					setNameInput(e.target.value)
				}, 2000)
			}}
			className='h-full w-40 border-2 border-amber-400 px-4 text-white'
		/>
	)
}

function CountrySelector({
	selectedCountry,
	setSelectedCountry,
}: {
	selectedCountry: string
	setSelectedCountry: (c: string) => void
}) {
	const [isOpened, setIsOpened] = useState(false)

	const parentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const outsideClick = (e: MouseEvent) => {
			if (parentRef.current && !parentRef.current.contains(e.target as Node)) {
				setIsOpened(false)
			}
		}

		document.addEventListener('click', outsideClick)

		return () => document.removeEventListener('click', outsideClick)
	}, [])

	return (
		<div
			ref={parentRef}
			className='w-50 h-10 flex items-center relative border-2 border-b-cyan-400 hover:cursor-pointer'
			onClick={_ => setIsOpened(!isOpened)}
		>
			<p>{selectedCountry}</p>

			{isOpened && (
				<ul className='w-full absolute right-0 top-0 z-10'>
					{COUNTRIES_LIST.map(c => (
						<li
							key={c}
							className='w-full py-2 px-4 text-amber-400 bg-gray-700 hover:bg-blue-500 hover:text-amber-100'
							onClick={e => {
								e.stopPropagation()
								setSelectedCountry(c)
                setIsOpened(false)
							}}
						>
							{c}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Filters
