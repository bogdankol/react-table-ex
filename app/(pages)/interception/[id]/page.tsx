'use client'
export default function ItemPage({ params }: { params: { id: string } }) {
	return (
		<div style={{ padding: '20px', background: '#eee' }}>
			<h1>Полная страница объекта {params.id}</h1>
			<p>Вы перешли сюда напрямую.</p>
		</div>
	)
}
