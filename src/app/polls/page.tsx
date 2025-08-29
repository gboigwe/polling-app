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
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-600 mb-2">Welcome to the polling application dashboard!</p>
              <p className="text-sm text-gray-500">Create and manage your polls</p>
            </div>
            <Button onClick={() => router.push('/polls/new')}>
              Create Poll
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Polls</h2>
          <div className="space-y-3">
            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer" onClick={() => router.push('/polls/1')}>
              <h3 className="font-medium text-gray-900">What is your favorite programming language?</h3>
              <p className="text-sm text-gray-500 mt-1">Created on {new Date().toLocaleDateString()}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">4 options • 18 votes</span>
                <Button variant="outline" size="sm">View & Vote</Button>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer" onClick={() => router.push('/polls/2')}>
              <h3 className="font-medium text-gray-900">Best framework for web development?</h3>
              <p className="text-sm text-gray-500 mt-1">Created on {new Date().toLocaleDateString()}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">3 options • 12 votes</span>
                <Button variant="outline" size="sm">View & Vote</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}