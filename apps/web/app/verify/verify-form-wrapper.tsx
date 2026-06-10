'use client'

import { useSearchParams } from 'next/navigation'
import VerifyForm from './verify-form'

export default function VerifyFormWrapper() {
  const searchParams = useSearchParams()
  const emailParam = searchParams.get('email') ?? ''

  return <VerifyForm initialEmail={emailParam} />
}
