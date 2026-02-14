'use client'
import { ChangeEvent, useRef, useState, useTransition } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import Image from 'next/image'
const { asd } = require('./cont')

// Generate array of 10,000 objects
const bigList = Array.from({ length: 1000000 }, (_, i) => ({
	id: i,
	name: `Item ${i}`,
	description: `Description for item ${i}`,
	category: `Category ${i % 10}`,
	value: Math.random() * 1000,
}))

function SearchApp() {
	const [isPending, startTransition] = useTransition()
	const [query, setQuery] = useState('')
	const [results, setResults] = useState(bigList)

	const parentRef = useRef(null)

	// function Person(name, age) {
	//   this.name = name;
	//   this.age = age;
	// }

	// Person.prototype.greet = function() {
	//   console.log(`Hi, I'm ${this.name}`);
	// };

	const pRes = Promise.resolve(
		fetch('https://jsonplaceholder.typicode.com/todos/1'),
	)
		.then(r => r.json())
		.then(console.log)
	// console.log(pRes)

	const p = new Promise((res, rej) => {
		const r = fetch('https://jsonplaceholder.typicode.com/todos/1').then(r =>
			r.json(),
		)
		res(r)
	})
	// console.log({p})

	// p.then(r => console.log(r))

	const val1 = { obj: 123 }
	const val2 = { obj: 123 }

	console.log('equity', Object.is(val1, val2))

	// const pRej = Promise.reject('ERORRROOOOO').then(d => console.log({d})).catch(e => console.log({e}))
	// console.log({pRej})

	// The virtualizer
	const rowVirtualizer = useVirtualizer({
		count: results.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 35,
	})

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.target.value
		setQuery(value) // High priority - input updates immediately

		startTransition(() => {
			// Filter the list (no artificial delay)
			const filtered = bigList.filter(
				item =>
					item.name.toLowerCase().includes(value.toLowerCase()) ||
					item.description.toLowerCase().includes(value.toLowerCase()) ||
					item.category.toLowerCase().includes(value.toLowerCase()),
			)

			setResults(filtered) // Low priority update
		})
	}

	return (
		<div style={{ padding: '20px' }}>
			<Image
				alt='img'
				width={200}
				height={400}
        placeholder='blur'
        blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCABxAMkDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAECAwQF/8QAHBABAQEBAQEBAQEAAAAAAAAAAAECERIDMSFB/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAZEQEBAQADAAAAAAAAAAAAAAAAARESITH/2gAMAwEAAhEDEQA/APCi+Wcq+aryxtlrljmtc1HSNctIyzWkorSJUlW6Ksio6i0VFU0taz1RWemO2uqx3Qc/0cX3dn0ri+9BiANAAOj5/wCOrDk+d/HVijm3y0jLNaSiriOnQcsq+aw60zpXGOjNaZrnzprnSOkb5rSVhnS80K3lT1jNLehWnUWqekXQq1qmqi6U1oEarDdX1pjuisvpXF9r/XV9NOPd7oFQBQAG3zrpxXHiunFRi+unNaSsM1pNA16dZ+k9Bx+ls6c/tabaY4urOmudOTO2udo1I6ppeacs2vNo1jpmk+nPNp9i439F0x9o9hjW6Uumd2pdi4trTHejW2O9i4r9dOar711RSgAgACc3lbY0wXzpKzY6s6aTTmzpeaZ1HR6PTH2ek0cSZbEDo2vnfGufo50yhjsm15txTVi8+jK47JtPtyzafaauOn2j2w9ouzTG92prbG7UurVXGmvoy1rqLVbVL0VAKwAAAAAAvNLTTJPUxLG3o9MvR6TExUBpoABKVVkaiep6iRbyjWo6dT5RYGoBChVU1CsUAEAAAAAAAAAAAABK2c9XBEz1pnC2ctJkNUmVvK8yt5Q1l5RctvKPJhrC4Z3PHVcs9ZFlc9Va6zxnYYtQAMgAAAAAAAAtw4iaqkG5FTJ2tsxniNsxaytmNJEReRkJE8TEgjiLF+IBnYpqNbFNCsNxjqOnUc+/1WozE1DKAAAAAAC0iq8SpU8OJSjLIB1jbTDbIFYaZXgMi8SACAFRVKAMtMN/oLG4zqAZqAAAAAAJi8BKlWARh//Z'
				src={
					'https://media.istockphoto.com/id/1203681482/uk/%D1%84%D0%BE%D1%82%D0%BE/%D1%82%D0%B5%D1%85%D0%BD%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%97-%D0%BD%D0%B5-%D0%B4%D0%BE%D0%B7%D0%B2%D0%BE%D0%BB%D0%B5%D0%BD%D1%96-%D0%BA%D1%80%D1%83%D0%BF%D0%BD%D0%B8%D0%BC-%D0%BF%D0%BB%D0%B0%D0%BD%D0%BE%D0%BC-%D0%BC%D0%BE%D0%B1%D1%96%D0%BB%D1%8C%D0%BD%D1%96-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8-%D0%BD%D0%B0-%D1%81%D1%82%D0%BE%D0%BB%D1%96-%D0%BE%D1%84%D1%96%D1%81%D1%83-%D0%B7%D1%96-%D0%B7%D0%BD%D0%B0%D0%BA%D0%BE%D0%BC-%D0%B2%D1%96%D0%BB%D1%8C%D0%BD%D0%BE%D1%97-%D0%B7%D0%BE%D0%BD%D0%B8.jpg?s=2048x2048&w=is&k=20&c=E3q7V8R99HgdgckN8zwtCkkvuruvbZ1NnMj4A5WB6e0='
				}
			/>
			<h1>Search Demo (1000,000 Objects)</h1>

			<input
				type='text'
				value={query}
				onChange={handleChange}
				placeholder='Type to search...'
				style={{
					padding: '10px',
					fontSize: '16px',
					width: '300px',
					marginBottom: '20px',
				}}
			/>

			{isPending && (
				<div
					style={{ color: 'orange', marginBottom: '10px', fontSize: '18px' }}
				>
					⏳ Filtering results...
				</div>
			)}

			<div>
				<h2>Results ({results.length})</h2>
				<div
					ref={parentRef}
					style={{
						overflow: 'auto',
						height: '500px',
					}}
				>
					<div
						style={{
							width: '100%',
							position: 'relative',
							height: `${rowVirtualizer.getTotalSize()}px`,
						}}
					>
						{rowVirtualizer.getVirtualItems().map(virtualItem => {
							const result = results[virtualItem.index]

							return (
								<div
									key={virtualItem.key}
									style={{
										padding: '10px',
										borderBottom: '1px solid #eee',
										marginBottom: '5px',
										backgroundColor: '#f9f9f9',

										position: 'absolute',
										top: 0,
										left: 0,
										width: '100%',
										height: `${virtualItem.size}px`,
										transform: `translateY(${virtualItem.start}px)`,
									}}
								>
									<div style={{ fontWeight: 'bold', color: '#333' }}>
										{result.name}
									</div>
									<div style={{ fontSize: '14px', color: '#666' }}>
										{result.description}
									</div>
									<div style={{ fontSize: '12px', color: '#999' }}>
										{result.category} • Value: ${result.value.toFixed(2)}
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchApp
