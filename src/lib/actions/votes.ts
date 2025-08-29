'use server'

import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

interface SubmitVoteData {
  pollId: string
  optionId: string
  userId: string
}

export async function submitVote(data: SubmitVoteData) {
  try {
    if (isSupabaseConfigured && supabase) {
      // Check if user has already voted on this poll
      const { data: existingVote } = await supabase
        .from('votes')
        .select('id')
        .eq('poll_id', data.pollId)
        .eq('user_id', data.userId)
        .single()

      if (existingVote) {
        return { success: false, error: 'You have already voted on this poll' }
      }

      // Submit the vote
      const { error } = await supabase
        .from('votes')
        .insert([
          {
            poll_id: data.pollId,
            option_id: data.optionId,
            user_id: data.userId,
            created_at: new Date().toISOString()
          }
        ])

      if (error) throw error
      
      revalidatePath(`/polls/${data.pollId}`)
      return { success: true }
    } else {
      // Mock success for demo mode
      console.log('Mock vote submitted:', data)
      return { success: true }
    }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to submit vote' 
    }
  }
}