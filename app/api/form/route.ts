import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const body = await req.json()

	console.log({ body })

	return NextResponse.json({ data: 'get' })
}

export async function POST(req: NextRequest, res: NextResponse) {
	const body = await req.json() /// if by fetch
	// const formData = await req.formData() /// if by action as url string

	console.log({ 
    body, 
    // formData: Object.fromEntries(formData.entries()) 
  })

	return NextResponse.json({ data: 'post' })
}
