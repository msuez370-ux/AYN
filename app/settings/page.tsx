'use client'

import { motion } from 'framer-motion'
import { Settings, User, Building2, CreditCard, Bell, Lock } from 'lucide-react'
import { AppSidebar } from '@/components/app-sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockUser } from '@/lib/data'

const settingsSections = [
  {
    id: 'profile',
    title: 'Profil',
    icon: User,
    description: 'Gérez vos informations personnelles'
  },
  {
    id: 'company',
    title: 'Entreprise',
    icon: Building2,
    description: 'Informations de votre société'
  },
  {
    id: 'billing',
    title: 'Facturation',
    icon: CreditCard,
    description: 'Gérez votre abonnement et paiements'
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    description: 'Préférences de notification'
  },
  {
    id: 'security',
    title: 'Sécurité',
    icon: Lock,
    description: 'Mot de passe et authentification'
  }
]

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      <main className="pl-64">
        <div className="p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground">
              Paramètres
            </h1>
            <p className="mt-1 text-muted-foreground">
              Gérez votre compte et vos préférences
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <nav className="space-y-1">
                {settingsSections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                      index === 0
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <section.icon className="h-5 w-5" />
                    <div>
                      <p className="font-medium">{section.title}</p>
                      <p className={`text-xs ${index === 0 ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {section.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </nav>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Profil</h2>
                    <p className="text-sm text-muted-foreground">
                      Gérez vos informations personnelles
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Prénom
                      </label>
                      <Input defaultValue={mockUser.firstName} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Nom
                      </label>
                      <Input defaultValue={mockUser.lastName} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input type="email" defaultValue="thomas.martin@tmtransport.fr" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Entreprise
                    </label>
                    <Input defaultValue={mockUser.company} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Téléphone
                    </label>
                    <Input type="tel" defaultValue="06 12 34 56 78" />
                  </div>

                  <div className="pt-4 border-t border-border flex justify-end">
                    <Button>
                      Enregistrer les modifications
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
