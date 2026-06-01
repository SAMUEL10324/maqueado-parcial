'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ThumbsUp, ThumbsDown, MessageCircle, ArrowLeft, Send, User } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { LoadingSpinner } from '@/components/loading'
import type { Debate, Comment } from '@/lib/mock-data'

interface DebateDetailProps {
  debate: Debate
}

export function DebateDetail({ debate }: DebateDetailProps) {
  const { user, isAuthenticated } = useAuth()
  const [votes, setVotes] = useState({
    positive: debate.positiveVotes,
    negative: debate.negativeVotes,
  })
  const [userVote, setUserVote] = useState<'positive' | 'negative' | null>(null)
  const [isVoting, setIsVoting] = useState(false)
  const [comments, setComments] = useState<Comment[]>(debate.comments)
  const [newComment, setNewComment] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)

  const totalVotes = votes.positive + votes.negative
  const positivePercentage = totalVotes > 0 ? (votes.positive / totalVotes) * 100 : 50

  const handleVote = async (type: 'positive' | 'negative') => {
    if (!isAuthenticated || isVoting) return

    setIsVoting(true)
    await new Promise(resolve => setTimeout(resolve, 300))

    if (userVote === type) {
      setVotes(prev => ({ ...prev, [type]: prev[type] - 1 }))
      setUserVote(null)
    } else {
      if (userVote) {
        setVotes(prev => ({ ...prev, [userVote]: prev[userVote] - 1 }))
      }
      setVotes(prev => ({ ...prev, [type]: prev[type] + 1 }))
      setUserVote(type)
    }

    setIsVoting(false)
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !isAuthenticated || !user) return

    setIsSubmittingComment(true)
    await new Promise(resolve => setTimeout(resolve, 800))

    const comment: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content: newComment,
      createdAt: new Date().toISOString().split('T')[0],
    }

    setComments(prev => [comment, ...prev])
    setNewComment('')
    setIsSubmittingComment(false)
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a debates
          </Button>
        </Link>
      </motion.div>

      {/* Main content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
      >
        {/* Hero image */}
        <div className="relative aspect-video w-full">
          <Image src={debate.image} alt={debate.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Badge className="mb-3 bg-background/90 text-foreground">{debate.category}</Badge>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg sm:text-3xl lg:text-4xl">
              {debate.title}
            </h1>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Author info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 flex items-center gap-3"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={debate.authorAvatar} alt={debate.authorName} />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{debate.authorName}</p>
              <p className="text-sm text-muted-foreground">Publicado el {debate.createdAt}</p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8 text-lg leading-relaxed text-muted-foreground"
          >
            {debate.description}
          </motion.p>

          {/* Voting Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 rounded-xl bg-muted/50 p-6"
          >
            <h3 className="mb-4 text-center text-lg font-semibold">¿Qué opinas?</h3>

            {/* Vote progress bar */}
            <div className="mb-4 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: '50%' }}
                animate={{ width: `${positivePercentage}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative h-4 rounded-full bg-gradient-to-r from-success to-accent"
              >
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-medium text-white">
                  {positivePercentage.toFixed(0)}%
                </span>
              </motion.div>
            </div>

            <div className="mb-4 flex justify-between text-sm text-muted-foreground">
              <span>{votes.positive} a favor</span>
              <span>{votes.negative} en contra</span>
            </div>

            {/* Vote buttons */}
            <div className="flex gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                <Button
                  onClick={() => handleVote('positive')}
                  disabled={!isAuthenticated || isVoting}
                  variant={userVote === 'positive' ? 'default' : 'outline'}
                  className={`w-full gap-2 ${
                    userVote === 'positive' ? 'bg-success hover:bg-success/90' : ''
                  }`}
                  size="lg"
                >
                  <ThumbsUp className={`h-5 w-5 ${isVoting ? 'animate-pulse' : ''}`} />
                  A favor
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                <Button
                  onClick={() => handleVote('negative')}
                  disabled={!isAuthenticated || isVoting}
                  variant={userVote === 'negative' ? 'default' : 'outline'}
                  className={`w-full gap-2 ${
                    userVote === 'negative' ? 'bg-destructive hover:bg-destructive/90' : ''
                  }`}
                  size="lg"
                >
                  <ThumbsDown className={`h-5 w-5 ${isVoting ? 'animate-pulse' : ''}`} />
                  En contra
                </Button>
              </motion.div>
            </div>

            {!isAuthenticated && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center text-sm text-muted-foreground"
              >
                <Link href="/login" className="text-primary hover:underline">
                  Inicia sesión
                </Link>{' '}
                para votar
              </motion.p>
            )}
          </motion.div>

          {/* Comments Section */}
          <motion.div
            id="comments"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="mb-6 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="text-lg font-semibold">
                Comentarios ({comments.length})
              </h3>
            </div>

            {/* Comment form */}
            {isAuthenticated ? (
              <form onSubmit={handleSubmitComment} className="mb-6">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Comparte tu opinión..."
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                      rows={3}
                      className="mb-2"
                    />
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={!newComment.trim() || isSubmittingComment}
                        className="gap-2"
                      >
                        {isSubmittingComment ? (
                          <>
                            <LoadingSpinner size="sm" />
                            Publicando...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Comentar
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 rounded-lg bg-muted/50 p-4 text-center"
              >
                <p className="text-sm text-muted-foreground">
                  <Link href="/login" className="text-primary hover:underline">
                    Inicia sesión
                  </Link>{' '}
                  para dejar un comentario
                </p>
              </motion.div>
            )}

            {/* Comments list */}
            <div className="space-y-4">
              <AnimatePresence>
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-3 rounded-lg bg-muted/30 p-4"
                    >
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-sm font-medium">{comment.userName}</span>
                          <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{comment.content}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-8 text-center text-muted-foreground"
                  >
                    Sé el primero en comentar
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.article>
    </div>
  )
}
