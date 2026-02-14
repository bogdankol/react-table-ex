import axios from 'axios'

export async function generateStaticParams() {
  const ids = [1,2,3,4,5,6,7,8,9]

  return ids.map(id => ({
    idqwe: String(id)
  }))
}

export const dynamicParams = false
export const dynamic = 'force-static'

export default async function page({params}: {params: Promise<{idqwe: string}>}) {
  const { idqwe } = await params
  
  const { data } = await axios(`https://jsonplaceholder.typicode.com/todos/${idqwe}`)
  
  console.log({
    idqwe, 
    data,
    isRuntime: typeof window !== 'undefined' ? 'client' : 'server'
  })
  return (
    <div>{JSON.stringify(data)}</div>
  )
}