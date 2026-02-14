import { useFormStatus } from 'react-dom'

function SubmitBtn() {
	const { pending } = useFormStatus()
	console.log({ pending })

	return (
		<button
			type='submit'
			disabled={pending}
      className='px-4 h-full flex items-center justify-center border border-white hover:cursor-pointer'
		>
			{!pending ? 'submit' : 'blocked'}
		</button>
	)
}

export default SubmitBtn
