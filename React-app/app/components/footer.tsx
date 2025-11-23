import { Copyright } from 'lucide-react'

export default function Footer() {
  const year = new Date()

  return (
    <div className="footer">
      <Copyright size={15} aria-label="copy right" />
      {year.getFullYear()}
    </div>
  )
}
