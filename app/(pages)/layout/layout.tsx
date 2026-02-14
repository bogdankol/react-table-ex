
export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
  // console.log({cokies: cokies.get('authjs.csrf-token')})
	return <>LAYOUT2{children}</>
}
