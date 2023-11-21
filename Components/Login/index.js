import React from 'react'
import Link from 'next/link'
const LoginIndex = () => {
  return (
    <div>
      Login Page
      <Link href="/auth/signup">signup</Link>
    </div>
  )
}

export default LoginIndex