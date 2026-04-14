'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Truck, Calendar, Euro, ArrowRight, Clock, CheckCircle2 } from 'lucide-react'
import { AppSidebar } from '@/components/app-sidebar'
import { StatsCard } from '@/components/stats-card'
import { Button } from '@/components/ui/button'
import { 
  mockUser, 
  mockDayEntries, 
  mockClients,
  calculateTodayRounds,
  calculateMonthRounds,
  calculateEstimatedRevenue,
  formatCurrency
} from '@/lib/data'

export default function DashboardPage() {
  const todayRounds = calculateTodayRounds(mockDayEntries)
  const monthRounds = calculateMonthRounds(mockDayEntries)
  const estimatedRevenue = calculateEstimatedRevenue(mockDayEntries, mockClients)
  
  // Get current hour for greeting
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir'
  
  // Recent activity (last 3 entries)
  const recentActivity = mockDayEntries.slice(0, 3)
  
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
              {greeting}, <span className="text-primary">{mockUser.firstName}</span>
            </h1>
            <p className="mt-1 text-muted-foreground">
              Bienvenue sur AYN
            </p>
          </motion.div>
          
          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <StatsCard
              title="Tournées du jour"
              value={todayRounds}
              subtitle="Aujourd&apos;hui"
              icon={Truck}
              delay={0.1}
            />
            <StatsCard
              title="Tournées du mois"
              value={monthRounds}
              subtitle="Avril 2026"
              icon={Calendar}
              trend={{ value: 12, isPositive: true }}
              delay={0.2}
            />
            <StatsCard
              title="CA estimé"
              value={formatCurrency(estimatedRevenue)}
              subtitle="Ce mois-ci"
              icon={Euro}
              trend={{ value: 8, isPositive: true }}
              delay={0.3}
            />
          </div>
          
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <Link href="/journee">
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-primary/20">
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-primary-foreground">
                      Démarrer une journée
                    </h2>
                    <p className="mt-2 text-primary-foreground/80">
                      Enregistrez vos tournées du jour en quelques clics
                    </p>
                  </div>
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="gap-2 transition-transform group-hover:translate-x-1"
                  >
                    Commencer
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
                {/* Decorative elements */}
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
              </div>
            </Link>
          </motion.div>
          
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                Activité récente
              </h2>
              <Link 
                href="/analytics" 
                className="text-sm text-primary hover:underline"
              >
                Voir tout
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentActivity.map((entry, index) => {
                const date = new Date(entry.date)
                const isToday = entry.date === new Date().toISOString().split('T')[0]
                const formattedDate = isToday 
                  ? "Aujourd'hui" 
                  : date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
                
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                    className="glass-card flex items-center justify-between rounded-xl p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        {isToday ? (
                          <Clock className="h-5 w-5 text-primary" />
                        ) : (
                          <CheckCircle2 className="h-5 w-5 text-accent" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{entry.clientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {formattedDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        {entry.rounds.length} tournée{entry.rounds.length > 1 ? 's' : ''}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {entry.rounds.length} chauffeur{entry.rounds.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
