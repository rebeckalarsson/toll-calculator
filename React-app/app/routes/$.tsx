'use client'
import { data } from 'react-router'

export async function loader() {
  return data({}, 404)
}

export default function Page404() {
  return <div>Page Not Found</div>
}
