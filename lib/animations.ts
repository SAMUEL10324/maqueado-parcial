'use client'

import { motion, AnimatePresence } from 'framer-motion'

// Fade in animation variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

// Slide up animation variants
export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

// Slide in from left
export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
}

// Slide in from right
export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
}

// Scale animation
export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

// Stagger children container
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// Stagger item
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

// Button tap animation
export const buttonTap = {
  scale: 0.95,
  transition: { duration: 0.1 },
}

// Button hover animation
export const buttonHover = {
  scale: 1.02,
  transition: { duration: 0.2 },
}

// Card hover animation
export const cardHover = {
  y: -5,
  transition: { duration: 0.2 },
}

// Pulse animation for loading states
export const pulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

// Spinner rotation
export const spin = {
  rotate: 360,
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: 'linear',
  },
}

// Vote button animation
export const voteAnimation = {
  initial: { scale: 1 },
  tap: { scale: 0.85 },
  hover: { scale: 1.1 },
}

// Page transition settings
export const pageTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

// Default transition
export const defaultTransition = {
  duration: 0.3,
  ease: 'easeOut',
}

export { motion, AnimatePresence }
