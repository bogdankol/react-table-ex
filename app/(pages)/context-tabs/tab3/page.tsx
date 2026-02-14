'use client'
import { useContext } from 'react'
import { ThemeContext } from '@/app/src/context/theme'

function page() {
  const context = useContext(ThemeContext)
  
  return context && (
    <div className={`w-40 h-40 border-2 border-blue-200 flex items-center justify-center ${context.theme === 'light' ? 'text-red-500 text-4xl' : 'text-blue-500 text-2xl'}`}>tab3</div>
  )
}

export default page