import Link from 'next/link';

export default function InterceptionList() {
  return (
    <ul>
      {[1, 2, 3].map((id) => (
        <li key={id}>
          <Link href={`/interception/${id}`}>Открыть объект {id}</Link>
        </li>
      ))}
    </ul>
  );
}
