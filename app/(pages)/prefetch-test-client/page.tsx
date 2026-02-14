'use client'
import { Suspense } from 'react'
import Content from './content'
import { Profiler } from 'react'

function page() {
	return (
		<Suspense fallback={<h1>LOADING...</h1>}>
		<Profiler
			id='qwerty'
			onRender={(id, phase, actualDuration) => {
				console.log({ id, phase, actualDuration })
			}}
		>
			<Content />
		</Profiler>
		</Suspense>
	)
}

export default page
