function Layout({
  children,
  one,
  two
}: any) {
  return (
    <div>layout Inner

      {children}
      {one}
      {two}
    </div>
  )
}

export default Layout