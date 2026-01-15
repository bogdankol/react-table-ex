'use client'
import TableHandmade from '@/app/src/components/Tables/HandMadeTable'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient()

function Content() {

  const { data, isPending, error } = useQuery({
    queryKey: ['rows'],
    queryFn: () => fetch('http://universities.hipolabs.com').then(r => r.json()),
    staleTime: 300000
  })

  console.log({data})

  return (
    <div>
      <TableHandmade />
    </div>
  )
}

export default Content