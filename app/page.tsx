'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Users, TrendingUp } from 'lucide-react'
import { DebateList } from '@/components/debate-list'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-background via-background to-muted/50 py-16 sm:py-20">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
          />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
              >
                <MessageSquare className="h-4 w-4" />
                La comunidad que debate
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Donde las ideas{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                cobran vida
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground"
            >
              Crea debates, comparte tu opinión y descubre lo que piensa la comunidad sobre los
              temas que más importan.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 rounded-xl bg-card/50 px-5 py-3 shadow-sm backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">150+</p>
                  <p className="text-xs text-muted-foreground">Debates activos</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 rounded-xl bg-card/50 px-5 py-3 shadow-sm backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">5K+</p>
                  <p className="text-xs text-muted-foreground">Usuarios</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 rounded-xl bg-card/50 px-5 py-3 shadow-sm backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">25K+</p>
                  <p className="text-xs text-muted-foreground">Votos</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Debates Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="mb-8 text-2xl font-bold">Debates recientes</h2>
            <DebateList />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <MessageSquare className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">
                Debatiendo<span className="text-primary">Ando</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 DebatiendoAndo. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
