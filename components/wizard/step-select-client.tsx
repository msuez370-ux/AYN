'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Plus, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Client } from '@/lib/data'

interface StepSelectClientProps {
  clients: Client[]
  onSelect: (client: Client) => void
}

export function StepSelectClient({ clients, onSelect }: StepSelectClientProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleSelect = (client: Client) => {
    setSelectedId(client.id)
    setTimeout(() => onSelect(client), 300)
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
          Pour quel client travaillez-vous ?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-muted-foreground"
        >
          Sélectionnez le client pour cette journée
        </motion.p>
      </div>

      <div className="grid gap-4">
        {clients.map((client, index) => (
          <motion.button
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            onClick={() => handleSelect(client)}
            className={cn(
              "glass-card w-full rounded-xl p-6 text-left transition-all duration-300",
              "hover:scale-[1.02] hover:border-primary/50",
              selectedId === client.id && "border-primary bg-primary/10 scale-[1.02]"
            )}
          >
            <div className="flex items-start gap-4">
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
                selectedId === client.id ? "bg-primary" : "bg-primary/10"
              )}>
                <Building2 className={cn(
                  "h-6 w-6",
                  selectedId === client.id ? "text-primary-foreground" : "text-primary"
                )} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {client.name}
                </h3>
                <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{client.address}</span>
                </div>
                <p className="mt-2 text-sm text-primary font-medium">
                  {client.pricePerRound}€ / tournée
                </p>
              </div>
            </div>
          </motion.button>
        ))}

        {/* Add new client button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + clients.length * 0.1 }}
        >
          <Button
            variant="outline"
            className="w-full h-auto py-6 border-dashed border-2 hover:border-primary hover:bg-primary/5"
          >
            <Plus className="mr-2 h-5 w-5" />
            Ajouter un client
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
