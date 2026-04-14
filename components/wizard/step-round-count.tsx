'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StepRoundCountProps {
  onConfirm: (count: number) => void
  onBack: () => void
}

export function StepRoundCount({ onConfirm, onBack }: StepRoundCountProps) {
  const [count, setCount] = useState(1)

  const increment = () => setCount(prev => Math.min(prev + 1, 20))
  const decrement = () => setCount(prev => Math.max(prev - 1, 1))

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xl"
    >
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-foreground"
        >
          {"Combien de tournées aujourd'hui ?"}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-muted-foreground"
        >
          Indiquez le nombre de tournées à effectuer
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center gap-8 mb-12"
      >
        <button
          onClick={decrement}
          disabled={count <= 1}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-all duration-200 hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="h-8 w-8" />
        </button>

        <motion.div
          key={count}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="flex h-32 w-32 items-center justify-center rounded-2xl glass-card"
        >
          <span className="text-6xl font-bold text-primary">{count}</span>
        </motion.div>

        <button
          onClick={increment}
          disabled={count >= 20}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-all duration-200 hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-8 w-8" />
        </button>
      </motion.div>

      {/* Quick select buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center gap-3 mb-12"
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => setCount(num)}
            className={`h-12 w-12 rounded-lg text-sm font-medium transition-all duration-200 ${
              count === num
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {num}
          </button>
        ))}
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-between"
      >
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <Button onClick={() => onConfirm(count)} className="gap-2">
          Continuer
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
