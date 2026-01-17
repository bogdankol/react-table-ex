'use server'

export async function submitForm(formData: FormData) {
  const values = Object.fromEntries(formData.entries())

  console.log('SERVER ACTION:', values)

  await fetch('http://localhost:3000/api/form', {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  })

}