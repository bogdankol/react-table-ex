'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ThemeProvider } from '../src/context/theme'
import {useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())

  console.log({
    params: useParams(),
    pathname: usePathname(),
    router: useRouter(),
    searchParams: useSearchParams().get('asd')
  })

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>{children}</ThemeProvider>
		</QueryClientProvider>
	)
}

export default Providers
