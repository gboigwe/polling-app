import { CreatePollForm } from '@/components/polls/CreatePollForm'

export default function NewPollPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center">
          <CreatePollForm />
        </div>
      </div>
    </div>
  )
}