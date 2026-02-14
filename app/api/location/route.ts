import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  // На локалке идем во внешний сервис
  const res = await fetch('https://ipapi.co/json/')
  const data = await res.json();
  
  return new Response(JSON.stringify({ country: data.country_code }))
}