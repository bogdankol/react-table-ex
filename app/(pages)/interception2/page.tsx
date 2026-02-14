import Link from 'next/link'

function page() {
  return (
    <div className='space-y-6'>
      <p>Page Content with link to true route that should be intercepted</p>

      <Link href={`/interception2/true_page`} className='text-2xl text-blue-400'>route</Link>
    </div>
  )
}

export default page