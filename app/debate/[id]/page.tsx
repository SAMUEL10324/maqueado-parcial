import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { mockDebates } from '@/lib/mock-data'
import { DebateDetail } from '@/components/debate-detail'

interface DebatePageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: DebatePageProps): Promise<Metadata> {
  const { id } = await params
  const debate = mockDebates.find(d => d.id === id)

  if (!debate) {
    return {
      title: 'Debate no encontrado | DebatiendoAndo',
    }
  }

  return {
    title: `${debate.title} | DebatiendoAndo`,
    description: debate.description.slice(0, 160),
  }
}

export default async function DebatePage({ params }: DebatePageProps) {
  const { id } = await params
  const debate = mockDebates.find(d => d.id === id)

  if (!debate) {
    notFound()
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <DebateDetail debate={debate} />
    </div>
  )
}
