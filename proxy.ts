import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export default function proxy(request: NextRequest) {
  // console.log({request: request.cookies})
  return NextResponse.next()
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}