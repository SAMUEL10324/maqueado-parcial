'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DebateCard } from '@/components/debate-card'
import { DebateCardSkeleton } from '@/components/loading'
import { mockDebates, categories } from '@/lib/mock-data'
import type { Debate } from '@/lib/mock-data'

export function DebateList() {
  const [debates, setDebates] = useState<Debate[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  // Simulate loading data
  useEffect(() => {
    const loadDebates = async () => {
      setLoading(true)
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200))
      setDebates(mockDebates)
      setLoading(false)
    }
    loadDebates()
  }, [])

  // Filter debates
  const filteredDebates = debates.filter(debate => {
    const matchesSearch =
      debate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      debate.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || debate.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 sm:flex-row"
      >
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar debates..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Icon for mobile */}
        <Button variant="outline" className="gap-2 sm:hidden">
          <Filter className="h-4 w-4" />
          Filtrar
        </Button>
      </motion.div>

      {/* Category Pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="scrollbar-hide flex gap-2 overflow-x-auto pb-2"
      >
        {categories.map((category, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Button
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap transition-all"
            >
              {category}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Results count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-muted-foreground"
      >
        {loading ? (
          'Cargando debates...'
        ) : (
          <>
            {filteredDebates.length} {filteredDebates.length === 1 ? 'debate' : 'debates'}{' '}
            encontrados
          </>
        )}
      </motion.p>

      {/* Debates Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="wait">
          {loading ? (
            // Loading skeletons
            [...Array(6)].map((_, i) => <DebateCardSkeleton key={`skeleton-${i}`} />)
          ) : filteredDebates.length > 0 ? (
            // Debate cards
            filteredDebates.map((debate, index) => (
              <DebateCard key={debate.id} debate={debate} index={index} />
            ))
          ) : (
            // No results
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full flex flex-col items-center justify-center py-16 text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-4 text-6xl"
              >
                🔍
              </motion.div>
              <h3 className="mb-2 text-lg font-semibold">No se encontraron debates</h3>
              <p className="text-sm text-muted-foreground">
                Intenta con otros términos de búsqueda o categoría
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
