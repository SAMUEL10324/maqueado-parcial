import type { Metadata } from 'next'
import { LoginForm } from '@/components/login-form'

export const metadata: Metadata = {
  title: 'Iniciar Sesión | DebatiendoAndo',
  description: 'Inicia sesión en tu cuenta de DebatiendoAndo para participar en debates.',
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <LoginForm />
    </div>
  )
}
