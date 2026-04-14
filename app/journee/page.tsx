'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AppSidebar } from '@/components/app-sidebar'
import { StepSelectClient } from '@/components/wizard/step-select-client'
import { StepRoundCount } from '@/components/wizard/step-round-count'
import { StepAssignDrivers } from '@/components/wizard/step-assign-drivers'
import { StepSummary } from '@/components/wizard/step-summary'
import { StepConfirmation } from '@/components/wizard/step-confirmation'
import { mockClients, mockDrivers, type Client, type Driver } from '@/lib/data'

export interface WizardData {
  client: Client | null
  roundCount: number
  assignments: { roundNumber: number; driver: Driver | null }[]
}

const steps = [
  { id: 1, title: 'Client' },
  { id: 2, title: 'Tournées' },
  { id: 3, title: 'Chauffeurs' },
  { id: 4, title: 'Récapitulatif' },
  { id: 5, title: 'Confirmation' },
]

export default function JourneePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardData, setWizardData] = useState<WizardData>({
    client: null,
    roundCount: 1,
    assignments: []
  })

  const handleSelectClient = (client: Client) => {
    setWizardData(prev => ({ ...prev, client }))
    setCurrentStep(2)
  }

  const handleSetRoundCount = (count: number) => {
    const assignments = Array.from({ length: count }, (_, i) => ({
      roundNumber: i + 1,
      driver: null
    }))
    setWizardData(prev => ({ ...prev, roundCount: count, assignments }))
    setCurrentStep(3)
  }

  const handleAssignDriver = (roundNumber: number, driver: Driver) => {
    setWizardData(prev => ({
      ...prev,
      assignments: prev.assignments.map(a =>
        a.roundNumber === roundNumber ? { ...a, driver } : a
      )
    }))
  }

  const handleConfirmAssignments = () => {
    setCurrentStep(4)
  }

  const handleValidate = () => {
    setCurrentStep(5)
  }

  const handleAddAnotherClient = () => {
    setWizardData({
      client: null,
      roundCount: 1,
      assignments: []
    })
    setCurrentStep(1)
  }

  const handleGoBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      <main className="pl-64">
        <div className="flex min-h-screen flex-col">
          {/* Progress indicator */}
          {currentStep < 5 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-border bg-card/50 px-8 py-4"
            >
              <div className="flex items-center justify-center gap-2">
                {steps.slice(0, 4).map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                        currentStep >= step.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {step.id}
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium transition-colors ${
                        currentStep >= step.id
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {step.title}
                    </span>
                    {index < 3 && (
                      <div
                        className={`mx-4 h-0.5 w-12 transition-colors ${
                          currentStep > step.id ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step content */}
          <div className="flex flex-1 items-center justify-center p-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <StepSelectClient
                  key="step-1"
                  clients={mockClients}
                  onSelect={handleSelectClient}
                />
              )}
              {currentStep === 2 && (
                <StepRoundCount
                  key="step-2"
                  onConfirm={handleSetRoundCount}
                  onBack={handleGoBack}
                />
              )}
              {currentStep === 3 && (
                <StepAssignDrivers
                  key="step-3"
                  assignments={wizardData.assignments}
                  drivers={mockDrivers}
                  onAssign={handleAssignDriver}
                  onConfirm={handleConfirmAssignments}
                  onBack={handleGoBack}
                />
              )}
              {currentStep === 4 && (
                <StepSummary
                  key="step-4"
                  data={wizardData}
                  onValidate={handleValidate}
                  onBack={handleGoBack}
                />
              )}
              {currentStep === 5 && (
                <StepConfirmation
                  key="step-5"
                  onAddAnother={handleAddAnotherClient}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}
