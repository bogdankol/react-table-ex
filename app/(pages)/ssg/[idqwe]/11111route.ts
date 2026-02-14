import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params 
  const { data } = await axios(`https://jsonplaceholder.typicode.com/todos/${id}`)
  return NextResponse.json({data})
}