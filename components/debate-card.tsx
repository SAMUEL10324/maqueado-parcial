'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ThumbsUp, ThumbsDown, MessageCircle, User } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Debate } from '@/lib/mock-data'

interface DebateCardProps {
  debate: Debate
  index?: number
}

export function DebateCard({ debate, index = 0 }: DebateCardProps) {
  const { isAuthenticated } = useAuth()
  const [votes, setVotes] = useState({
    positive: debate.positiveVotes,
    negative: debate.negativeVotes,
  })
  const [userVote, setUserVote] = useState<'positive' | 'negative' | null>(null)
  const [isVoting, setIsVoting] = useState(false)

  const totalVotes = votes.positive + votes.negative
  const positivePercentage = totalVotes > 0 ? (votes.positive / totalVotes) * 100 : 50

  const handleVote = async (type: 'positive' | 'negative') => {
    if (!isAuthenticated || isVoting) return

    setIsVoting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300))

    if (userVote === type) {
      // Remove vote
      setVotes(prev => ({
        ...prev,
        [type]: prev[type] - 1,
      }))
      setUserVote(null)
    } else {
      // Add or change vote
      if (userVote) {
        // Remove previous vote
        setVotes(prev => ({
          ...prev,
          [userVote]: prev[userVote] - 1,
        }))
      }
      setVotes(prev => ({
        ...prev,
        [type]: prev[type] + 1,
      }))
      setUserVote(type)
    }

    setIsVoting(false)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Image */}
      <Link href={`/debate/${debate.id}`} className="relative block aspect-video overflow-hidden">
        <Image
          src={debate.image}
          alt={debate.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Badge className="absolute right-3 top-3 bg-background/90 text-foreground backdrop-blur-sm">
          {debate.category}
        </Badge>
      </Link>

      <div className="p-4">
        {/* Author info */}
        <div className="mb-3 flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={debate.authorAvatar} alt={debate.authorName} />
            <AvatarFallback>
              <User className="h-3 w-3" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{debate.authorName}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{debate.createdAt}</span>
        </div>

        {/* Title */}
        <Link href={`/debate/${debate.id}`}>
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-tight transition-colors hover:text-primary">
            {debate.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{debate.description}</p>

        {/* Vote progress bar */}
        <div className="mb-3 overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: '50%' }}
            animate={{ width: `${positivePercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-2 rounded-full bg-gradient-to-r from-success to-accent"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Positive vote */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant={userVote === 'positive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleVote('positive')}
                disabled={!isAuthenticated || isVoting}
                className={`gap-1.5 ${
                  userVote === 'positive'
                    ? 'bg-success text-success-foreground hover:bg-success/90'
                    : ''
                }`}
              >
                <ThumbsUp className={`h-4 w-4 ${isVoting ? 'animate-pulse' : ''}`} />
                <span className="font-medium">{votes.positive}</span>
              </Button>
            </motion.div>

            {/* Negative vote */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant={userVote === 'negative' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleVote('negative')}
                disabled={!isAuthenticated || isVoting}
                className={`gap-1.5 ${
                  userVote === 'negative'
                    ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                    : ''
                }`}
              >
                <ThumbsDown className={`h-4 w-4 ${isVoting ? 'animate-pulse' : ''}`} />
                <span className="font-medium">{votes.negative}</span>
              </Button>
            </motion.div>
          </div>

          {/* Comments count */}
          <Link href={`/debate/${debate.id}#comments`}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <span>{debate.comments.length}</span>
              </Button>
            </motion.div>
          </Link>
        </div>

        {/* Login prompt for non-authenticated users */}
        {!isAuthenticated && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-center text-xs text-muted-foreground"
          >
            <Link href="/login" className="text-primary hover:underline">
              Inicia sesión
            </Link>{' '}
            para votar y comentar
          </motion.p>
        )}
      </div>
    </motion.article>
  )
}
