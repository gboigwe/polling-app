'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function PollsPage() {
  const { user, signOut, loading } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/auth/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!user) {
    router.push('/auth/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Polls Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user.email}</span>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              Sign out
            </Button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-4">Welcome to the polling application dashboard!</p>
          <div className="space-y-2">
            <p className="text-sm"><strong>Available actions:</strong></p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• View existing polls</li>
              <li>• Create new polls</li>
              <li>• Vote on polls</li>
              <li>• Share polls via QR codes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}