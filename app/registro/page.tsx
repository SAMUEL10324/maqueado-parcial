import type { Metadata } from 'next'
import { RegisterForm } from '@/components/register-form'

export const metadata: Metadata = {
  title: 'Registrarse | DebatiendoAndo',
  description: 'Crea tu cuenta en DebatiendoAndo y únete a la comunidad de debates.',
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <RegisterForm />
    </div>
  )
}
