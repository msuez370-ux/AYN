'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, User, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { Driver } from '@/lib/data'

interface Assignment {
  roundNumber: number
  driver: Driver | null
}

interface StepAssignDriversProps {
  assignments: Assignment[]
  drivers: Driver[]
  onAssign: (roundNumber: number, driver: Driver) => void
  onConfirm: () => void
  onBack: () => void
}

export function StepAssignDrivers({
  assignments,
  drivers,
  onAssign,
  onConfirm,
  onBack
}: StepAssignDriversProps) {
  const allAssigned = assignments.every(a => a.driver !== null)

  const handleDriverSelect = (roundNumber: number, driverId: string) => {
    const driver = drivers.find(d => d.id === driverId)
    if (driver) {
      onAssign(roundNumber, driver)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl"
    >
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-foreground"
        >
          Assignez les chauffeurs
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-muted-foreground"
        >
          Sélectionnez un chauffeur pour chaque tournée
        </motion.p>
      </div>

      <div className="space-y-4 mb-8">
        {assignments.map((assignment, index) => (
          <motion.div
            key={assignment.roundNumber}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className={cn(
              "glass-card rounded-xl p-5 transition-all duration-300",
              assignment.driver && "border-accent/50"
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
                  assignment.driver ? "bg-accent" : "bg-primary/10"
                )}>
                  {assignment.driver ? (
                    <Check className="h-6 w-6 text-accent-foreground" />
                  ) : (
                    <span className="text-xl font-bold text-primary">
                      {assignment.roundNumber}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Tournée {assignment.roundNumber}
                  </h3>
                  {assignment.driver && (
                    <p className="text-sm text-accent">
                      {assignment.driver.pricePerRound}€ / tournée
                    </p>
                  )}
                </div>
              </div>

              <Select
                value={assignment.driver?.id || ''}
                onValueChange={(value) => handleDriverSelect(assignment.roundNumber, value)}
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Sélectionner un chauffeur">
                    {assignment.driver && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {assignment.driver.name}
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{driver.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({driver.type === 'auto-entrepreneur' ? 'AE' : 'Société'})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        ))}
      </div>

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
        <Button
          onClick={onConfirm}
          disabled={!allAssigned}
          className="gap-2"
        >
          Continuer
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
