export default function Page() {
  // @ts-expect-error
  const isEdge = typeof EdgeRuntime === 'string';
  console.log(isEdge ? "=== ЭТО EDGE ===" : "=== ЭТО NODE ===");
  return <div>Runtime: {isEdge ? 'Edge' : 'Node'}</div>;
}