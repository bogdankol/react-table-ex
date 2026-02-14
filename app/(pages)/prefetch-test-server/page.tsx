import axios from 'axios'
import Content from './content'

export const revalidate = 60

export default async function Page() {
  console.log('hellooooooooooo')

  const {data} = await axios('https://jsonplaceholder.typicode.com/todos/1')


  
  const {data: data2} = await axios('http://localhost:3000/api/form')
  console.log({data2})
  return (
    <div>page
      <Content />
    </div>
  )
}