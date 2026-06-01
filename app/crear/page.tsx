import type { Metadata } from 'next'
import { CreateDebateForm } from '@/components/create-debate-form'

export const metadata: Metadata = {
  title: 'Crear Debate | DebatiendoAndo',
  description: 'Crea un nuevo debate y comparte tu tema con la comunidad.',
}

export default function CreateDebatePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-12">
      <CreateDebateForm />
    </div>
  )
}
