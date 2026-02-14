export default function InterceptionLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div style={{ border: '2px solid red', padding: '20px' }}>
      <h1>Раздел Interception</h1>
      {children}
      {modal}
    </div>
  );
}
