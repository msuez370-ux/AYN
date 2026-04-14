'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Plus, Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface StepConfirmationProps {
  onAddAnother: () => void
}

export function StepConfirmation({ onAddAnother }: StepConfirmationProps) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md text-center"
    >
      {/* Success animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1
        }}
        className="mb-8 flex justify-center"
      >
        <div className="relative">
          {/* Glow effect */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="absolute inset-0 rounded-full bg-accent"
          />
          
          {/* Main circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
            className="relative flex h-28 w-28 items-center justify-center rounded-full bg-accent"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.4
              }}
            >
              <CheckCircle2 className="h-14 w-14 text-accent-foreground" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {showContent && (
        <>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-foreground mb-2"
          >
            Journée enregistrée
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mb-8"
          >
            Les tournées ont été ajoutées avec succès
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-3"
          >
            <Button
              onClick={onAddAnother}
              variant="outline"
              className="w-full gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter un autre client
            </Button>

            <Link href="/" className="w-full">
              <Button className="w-full gap-2">
                <Home className="h-4 w-4" />
                Terminer
              </Button>
            </Link>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}
