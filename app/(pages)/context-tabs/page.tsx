import Link from 'next/link'

function page() {
  return (
    <div className='space-x-4'>
      PAGE NOT PARALEL
      <Link href={'context-tabs/tab1'}>tab1</Link>
      <Link href={'context-tabs/tab2'}>tab2</Link>
      <Link href={'context-tabs/tab3'}>tab3</Link>

    </div>
  )
}

export default page