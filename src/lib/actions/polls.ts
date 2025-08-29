'use server'

import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

interface CreatePollData {
  question: string
  options: Array<{ text: string }>
}

export async function createPoll(data: CreatePollData) {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data: poll, error } = await supabase
        .from('polls')
        .insert([
          {
            question: data.question,
            options: data.options,
            created_at: new Date().toISOString()
          }
        ])
        .select()

      if (error) throw error
      
      revalidatePath('/polls')
      return { success: true, poll }
    } else {
      // Mock success for demo mode
      const mockPoll = {
        id: Date.now().toString(),
        question: data.question,
        options: data.options,
        created_at: new Date().toISOString()
      }
      
      return { success: true, poll: mockPoll }
    }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create poll' 
    }
  }
}