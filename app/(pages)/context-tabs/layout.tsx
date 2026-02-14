'use client'
import { ReactNode, useContext } from 'react'
import { ThemeContext } from '@/app/src/context/theme'

function layout({
	children,
	tab4,
	tab5,
	tab6,
}: {
	children: ReactNode
	tab4: ReactNode
	tab5: ReactNode
	tab6: ReactNode
}) {
	const context = useContext(ThemeContext)
	return (
		context && (
			<div className='space-y-10 border-2 border-red-400'>
				<button onClick={() => context.toggleTheme()}>Change Theme</button>

        {tab4}
        {tab5}
        {tab6}

				{children}
			</div>
		)
	)
}

export default layout
