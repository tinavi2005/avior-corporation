'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  email: string
  role: string
  profile?: { firstName: string; lastName: string } | null
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signOut: () => Promise<void>
  setDemoUser?: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function checkUser() {
      // 1. Check for demo session first
      if (typeof window !== 'undefined') {
        const demoRaw = sessionStorage.getItem('avior_demo_user')
        if (demoRaw) {
          try {
            const demoUser = JSON.parse(demoRaw)
            if (!cancelled) {
              setUser(demoUser)
              setIsLoading(false)
            }
            return
          } catch { /* ignore */ }
        }
      }

      // 2. Check real auth
      try {
        const res = await fetch('/api/auth/me')
        if (cancelled) return
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch {
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    checkUser()
    return () => { cancelled = true }
  }, [])

  async function signOut() {
    // Clear demo session if present
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('avior_demo_user')
    }
    try {
      await fetch('/api/auth/signout', { method: 'POST' })
    } catch { /* ignore */ }
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
