'use server'

export async function serverAct(data: FormData) {
  await new Promise(res => setTimeout(res, 2000))
	console.log({ data: data.get('input') })

}
