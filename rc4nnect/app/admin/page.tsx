import { redirect } from 'next/navigation'
import { useEffect } from 'react'
 
export default function Page() {
  redirect('/admin/manage-users')
}