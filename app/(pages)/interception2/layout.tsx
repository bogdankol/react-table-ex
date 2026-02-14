import { ReactNode } from 'react'

export default function Layout({
	children,
	ir,
}: {
	children: ReactNode
	ir: ReactNode
}) {
	return <div className='relative space-y-4 border-4 border-amber-800'>
    {children}
    {ir}
  </div>
}
