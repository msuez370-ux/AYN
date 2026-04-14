'use client'

import { motion } from 'framer-motion'
import { 
  Truck, 
  Euro, 
  TrendingUp, 
  Users,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { AppSidebar } from '@/components/app-sidebar'
import { StatsCard } from '@/components/stats-card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  mockDrivers, 
  mockDayEntries, 
  mockClients,
  calculateDriverStats,
  calculateMonthRounds,
  calculateEstimatedRevenue,
  formatCurrency
} from '@/lib/data'
import { cn } from '@/lib/utils'

export default function AnalyticsPage() {
  const driverStats = calculateDriverStats(mockDayEntries, mockDrivers, mockClients)
  const totalRounds = calculateMonthRounds(mockDayEntries)
  const totalRevenue = calculateEstimatedRevenue(mockDayEntries, mockClients)
  const totalDriverCost = driverStats.reduce((sum, s) => sum + s.cost, 0)
  
  // Calculate totals
  const tva = totalRevenue * 0.2
  const totalTTC = totalRevenue + tva
  const margin = totalRevenue - totalDriverCost
  const marginPercent = totalRevenue > 0 ? (margin / totalRevenue) * 100 : 0

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
              Analytiques
            </h1>
            <p className="mt-1 text-muted-foreground">
              Avril 2026 - Vue mensuelle
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total tournées"
              value={totalRounds}
              icon={Truck}
              delay={0.1}
            />
            <StatsCard
              title="CA HT"
              value={formatCurrency(totalRevenue)}
              icon={Euro}
              delay={0.2}
            />
            <StatsCard
              title="Coût chauffeurs"
              value={formatCurrency(totalDriverCost)}
              icon={Users}
              delay={0.3}
            />
            <StatsCard
              title="Marge"
              value={formatCurrency(margin)}
              subtitle={`${marginPercent.toFixed(1)}%`}
              icon={TrendingUp}
              trend={{ value: marginPercent, isPositive: margin >= 0 }}
              delay={0.4}
            />
          </div>

          {/* Driver performance table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Performance par chauffeur
            </h2>
            <div className="glass-card rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Chauffeur</TableHead>
                    <TableHead className="text-muted-foreground">Type</TableHead>
                    <TableHead className="text-muted-foreground text-right">Tournées</TableHead>
                    <TableHead className="text-muted-foreground text-right">CA généré</TableHead>
                    <TableHead className="text-muted-foreground text-right">Rémunération</TableHead>
                    <TableHead className="text-muted-foreground text-right">Marge</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {driverStats.map((stat, index) => {
                    const driverMargin = stat.revenue - stat.cost
                    const isPositive = driverMargin >= 0
                    
                    return (
                      <motion.tr
                        key={stat.driver.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="border-border hover:bg-secondary/50"
                      >
                        <TableCell className="font-medium text-foreground">
                          {stat.driver.name}
                        </TableCell>
                        <TableCell>
                          <span className={cn(
                            "inline-flex items-center px-2 py-1 rounded-full text-xs",
                            stat.driver.type === 'auto-entrepreneur'
                              ? "bg-accent/10 text-accent"
                              : "bg-primary/10 text-primary"
                          )}>
                            {stat.driver.type === 'auto-entrepreneur' ? 'AE' : 'Société'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right text-foreground">
                          {stat.roundCount}
                        </TableCell>
                        <TableCell className="text-right text-foreground">
                          {formatCurrency(stat.revenue)}
                        </TableCell>
                        <TableCell className="text-right text-foreground">
                          {formatCurrency(stat.cost)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className={cn(
                            "inline-flex items-center gap-1 font-medium",
                            isPositive ? "text-accent" : "text-destructive"
                          )}>
                            {isPositive ? (
                              <ArrowUpRight className="h-4 w-4" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4" />
                            )}
                            {formatCurrency(driverMargin)}
                          </div>
                        </TableCell>
                      </motion.tr>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </motion.div>

          {/* Financial Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Résumé financier
            </h2>
            <div className="glass-card rounded-xl p-6 max-w-md">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total tournées</span>
                  <span className="font-semibold text-foreground">{totalRounds}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">CA HT</span>
                  <span className="font-semibold text-foreground">{formatCurrency(totalRevenue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">TVA (20%)</span>
                  <span className="font-semibold text-foreground">{formatCurrency(tva)}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-medium">CA TTC</span>
                  <span className="font-bold text-foreground">{formatCurrency(totalTTC)}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Coût chauffeurs</span>
                  <span className="font-semibold text-foreground">-{formatCurrency(totalDriverCost)}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-medium">Marge nette</span>
                  <span className={cn(
                    "font-bold text-lg",
                    margin >= 0 ? "text-accent" : "text-destructive"
                  )}>
                    {formatCurrency(margin)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
