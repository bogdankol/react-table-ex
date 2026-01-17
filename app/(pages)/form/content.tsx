'use client'

import axios from 'axios'

function Content() {

  async function actionHandler(e: FormData) {
    const values = Object.fromEntries(e.entries())
    await axios.post('/api/form', values)
  }

	return (
		<form
			className='space-y-4 border border-amber-700 p-5 flex flex-col justify-start'
			// action={actionHandler}
      action='/api/form'
      method='post'
      onSubmit={e => console.log(e)}
		>
			<input name='firstInput' className='w-40 h-10 border border-b-blue-300 bg-white text-black' />
			<input name='colorInput' className='w-40 h-10 border border-b-blue-300 bg-white text-black' type='color' />
			<textarea name='description' className='w-40 max-h-10 h-10 border border-b-blue-300 bg-white text-black' rows={5} />
			<input  name='checkboxValue'className='w-40 h-10 border border-b-blue-300 bg-white text-black' type='checkbox' />
			<button type='submit' className='p-4 border border-amber-300 hover:cursor-pointer'>Submit</button>
		</form>
	)
}

export default Content
