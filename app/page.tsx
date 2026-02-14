import Link from 'next/link';

export default function Home() {
	return (
		<div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black flex-col space-y-400'>
      <Link href='/table-hand'>table-hand</Link>
      <Link href='/prefetch-test-server'>prefetch-test-server page</Link>
      <Link href='/prefetch-test-client'>prefetch-test-client page</Link>

    </div>
	)
}
