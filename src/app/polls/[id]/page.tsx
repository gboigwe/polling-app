interface Poll {
  id: string
  question: string
  options: Array<{ id: string; text: string; votes: number }>
  createdBy: string
  createdAt: string
}

// Mock poll data for testing
const mockPoll: Poll = {
  id: '1',
  question: 'What is your favorite programming language?',
  options: [
    { id: '1', text: 'JavaScript', votes: 5 },
    { id: '2', text: 'TypeScript', votes: 8 },
    { id: '3', text: 'Python', votes: 3 },
    { id: '4', text: 'Go', votes: 2 }
  ],
  createdBy: 'user@example.com',
  createdAt: new Date().toISOString()
}

'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { submitVote } from '@/lib/actions/votes'

export default function PollDetailPage({ params }: { params: { id: string } }) {
  const [selectedOption, setSelectedOption] = useState('')
  const [hasVoted, setHasVoted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()
  
  const poll = mockPoll // TODO: Fetch actual poll from Supabase using params.id

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedOption) {
      setError('Please select an option')
      return
    }

    if (!user) {
      setError('You must be logged in to vote')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await submitVote({
        pollId: params.id,
        optionId: selectedOption,
        userId: user.id
      })

      if (!result.success) {
        setError(result.error || 'Failed to submit vote')
        return
      }
      
      setHasVoted(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to submit vote')
    } finally {
      setLoading(false)
    }
  }

  if (hasVoted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you for voting!</h2>
              <p className="text-gray-600">Your vote has been recorded.</p>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-4">Current Results:</h3>
              <div className="space-y-2">
                {poll.options.map((option) => {
                  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0)
                  const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0
                  
                  return (
                    <div key={option.id} className="text-left">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{option.text}</span>
                        <span>{percentage}% ({option.votes} votes)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <button 
              onClick={() => window.location.href = '/polls'}
              className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{poll.question}</h1>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Created by {poll.createdBy} on {new Date(poll.createdAt).toLocaleDateString()}
            </p>
            
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-900 mb-4">Cast your vote:</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                {poll.options.map((option) => (
                  <label key={option.id} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="vote"
                      value={option.id}
                      checked={selectedOption === option.id}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="flex-1">{option.text}</span>
                    <span className="text-sm text-gray-500">{option.votes} votes</span>
                  </label>
                ))}
                
                {error && (
                  <div className="text-red-600 text-sm mt-2">{error}</div>
                )}
                
                <button
                  type="submit"
                  disabled={loading || !selectedOption}
                  className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting Vote...' : 'Submit Vote'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}