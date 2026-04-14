'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Check, Building2, Truck, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { WizardData } from '@/app/journee/page'
import { formatCurrency } from '@/lib/data'

interface StepSummaryProps {
  data: WizardData
  onValidate: () => void
  onBack: () => void
}

export function StepSummary({ data, onValidate, onBack }: StepSummaryProps) {
  const totalDriverCost = data.assignments.reduce((sum, a) => {
    return sum + (a.driver?.pricePerRound || 0)
  }, 0)

  const totalRevenue = data.roundCount * (data.client?.pricePerRound || 0)
  const margin = totalRevenue - totalDriverCost

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
          Récapitulatif
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-muted-foreground"
        >
          Vérifiez les informations avant validation
        </motion.p>
      </div>

      <div className="space-y-4 mb-8">
        {/* Client */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Client</p>
              <p className="text-lg font-semibold text-foreground">
                {data.client?.name}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Round count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nombre de tournées</p>
              <p className="text-lg font-semibold text-foreground">
                {data.roundCount} tournée{data.roundCount > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Driver assignments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-3">Répartition chauffeurs</p>
              <div className="space-y-2">
                {data.assignments.map((assignment) => (
                  <div
                    key={assignment.roundNumber}
                    className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-2"
                  >
                    <span className="text-sm text-foreground">
                      Tournée {assignment.roundNumber}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {assignment.driver?.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Financial summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-xl p-5 border-primary/30"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Résumé financier
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-foreground">CA brut</span>
              <span className="font-semibold text-foreground">
                {formatCurrency(totalRevenue)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground">Coût chauffeurs</span>
              <span className="font-semibold text-foreground">
                -{formatCurrency(totalDriverCost)}
              </span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between">
              <span className="text-foreground font-medium">Marge estimée</span>
              <span className={`font-bold ${margin >= 0 ? 'text-accent' : 'text-destructive'}`}>
                {formatCurrency(margin)}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-between"
      >
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <Button onClick={onValidate} className="gap-2 bg-accent hover:bg-accent/90">
          <Check className="h-4 w-4" />
          Valider
        </Button>
      </motion.div>
    </motion.div>
  )
}
