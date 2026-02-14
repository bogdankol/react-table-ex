'use client'
import { serverAct } from './server-actions'
import SubmitBtn from './SubmitBtn'

function App() {
	return (
		<>
			<form action={async (data: FormData) => await serverAct(data)} className='flex space-x-4 border border-red-400 p-2'>
				<input
					type='text'
					name='input'
					id='input'
					placeholder='...text'
          className='border border-white'
				/>{' '}
				<SubmitBtn />
			</form>
		</>
	)
}

export default App
