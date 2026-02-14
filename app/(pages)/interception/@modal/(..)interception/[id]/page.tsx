'use client'
export default function InterceptionModal({ params }: { params: { id: string } }) {
  return (
    <div style={{
      position: 'fixed', top: '10%', left: '10%', right: '10%', bottom: '10%',
      backgroundColor: 'white', border: '5px solid black', padding: '20px', zIndex: 100
    }}>
      <h2>Модалка для ID: {params.id}</h2>
      <p>Это перехваченный контент!</p>
      <button onClick={() => window.history.back()}>Закрыть</button>
    </div>
  );
}
