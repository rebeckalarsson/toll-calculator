import { Outlet } from 'react-router'
import '../../../styles/auth.css'

export default function AuthLayout() {
  return (
    <div className="auth-container">
      <Outlet />
    </div>
  )
}
