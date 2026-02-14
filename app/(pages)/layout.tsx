import Providers from './Providers'
import { cookies } from 'next/headers'
import NextTopLoader from 'nextjs-toploader'

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const cokies = await cookies()
	// console.log({cokies: cokies.get('authjs.csrf-token')})
	return (
		<Providers>
			LAYOUT1
			<NextTopLoader
				color='#2299DD'
				showSpinner={false}
			/>
			{children}
		</Providers>
	)
}
