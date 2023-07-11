import { redirect } from 'next/navigation'
import { useEffect } from 'react'
 
export default function Page() {
  redirect('/dashboard/schedule')
}