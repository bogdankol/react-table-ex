
export default async function page() {
  await new Promise(res => setTimeout(res, 2000))
  const res = await fetch('http://localhost:3000/secondApi/form')
  const d = await res.json()
  console.log({d})
  return (
    <div>page</div>
  )
}
