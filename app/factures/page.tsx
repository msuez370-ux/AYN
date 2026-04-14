'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Download, 
  Eye,
  Building2,
  Calendar,
  Euro,
  X
} from 'lucide-react'
import { AppSidebar } from '@/components/app-sidebar'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  mockClients, 
  mockDayEntries,
  formatCurrency,
  type Client
} from '@/lib/data'
import { cn } from '@/lib/utils'

interface InvoiceData {
  client: Client
  month: string
  year: number
  rounds: number
  pricePerRound: number
  totalHT: number
  tva: number
  totalTTC: number
  invoiceNumber: string
}

export default function FacturesPage() {
  const [selectedClientId, setSelectedClientId] = useState<string>('')
  const [selectedMonth, setSelectedMonth] = useState<string>('04')
  const [previewData, setPreviewData] = useState<InvoiceData | null>(null)

  const months = [
    { value: '01', label: 'Janvier' },
    { value: '02', label: 'Février' },
    { value: '03', label: 'Mars' },
    { value: '04', label: 'Avril' },
    { value: '05', label: 'Mai' },
    { value: '06', label: 'Juin' },
    { value: '07', label: 'Juillet' },
    { value: '08', label: 'Août' },
    { value: '09', label: 'Septembre' },
    { value: '10', label: 'Octobre' },
    { value: '11', label: 'Novembre' },
    { value: '12', label: 'Décembre' },
  ]

  const generateInvoice = () => {
    if (!selectedClientId) return

    const client = mockClients.find(c => c.id === selectedClientId)
    if (!client) return

    // Calculate rounds for the selected client in the selected month
    const year = 2026
    const clientEntries = mockDayEntries.filter(entry => {
      const date = new Date(entry.date)
      return entry.clientId === selectedClientId &&
        date.getMonth() === parseInt(selectedMonth) - 1 &&
        date.getFullYear() === year
    })

    const totalRounds = clientEntries.reduce((sum, entry) => sum + entry.rounds.length, 0)
    const totalHT = totalRounds * client.pricePerRound
    const tva = totalHT * 0.2
    const totalTTC = totalHT + tva

    const invoiceNumber = `FAC-${year}${selectedMonth}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`

    setPreviewData({
      client,
      month: months.find(m => m.value === selectedMonth)?.label || '',
      year,
      rounds: totalRounds,
      pricePerRound: client.pricePerRound,
      totalHT,
      tva,
      totalTTC,
      invoiceNumber
    })
  }

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
              Factures
            </h1>
            <p className="mt-1 text-muted-foreground">
              Générez vos factures mensuelles
            </p>
          </motion.div>

          {/* Invoice Generator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-xl p-6 max-w-xl mb-8"
          >
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Générer une facture
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Client
                </label>
                <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un client" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          {client.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Mois
                </label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {month.label} 2026
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={generateInvoice}
                disabled={!selectedClientId}
                className="w-full gap-2"
              >
                <FileText className="h-4 w-4" />
                Générer la facture
              </Button>
            </div>
          </motion.div>

          {/* Invoice Preview */}
          <AnimatePresence>
            {previewData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-xl overflow-hidden max-w-2xl"
              >
                {/* Preview Header */}
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">Aperçu de la facture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Télécharger PDF
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setPreviewData(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Invoice Content */}
                <div className="p-8 bg-foreground/5">
                  <div className="bg-card rounded-lg p-8 shadow-lg">
                    {/* Invoice Header */}
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                            <span className="text-lg font-bold text-primary-foreground">A</span>
                          </div>
                          <span className="text-xl font-bold text-foreground">AYN</span>
                        </div>
                        <p className="text-sm text-muted-foreground">TM Transport</p>
                        <p className="text-sm text-muted-foreground">123 Rue du Commerce</p>
                        <p className="text-sm text-muted-foreground">75001 Paris, France</p>
                      </div>
                      <div className="text-right">
                        <h2 className="text-2xl font-bold text-foreground mb-2">FACTURE</h2>
                        <p className="text-sm text-muted-foreground">
                          N° {previewData.invoiceNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Date: {new Date().toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>

                    {/* Client Info */}
                    <div className="mb-8 p-4 rounded-lg bg-secondary/30">
                      <p className="text-sm text-muted-foreground mb-1">Facturé à</p>
                      <p className="font-semibold text-foreground">{previewData.client.name}</p>
                      <p className="text-sm text-muted-foreground">{previewData.client.address}</p>
                    </div>

                    {/* Period */}
                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground">
                        Période: <span className="text-foreground font-medium">{previewData.month} {previewData.year}</span>
                      </p>
                    </div>

                    {/* Invoice Lines */}
                    <div className="mb-8">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 text-sm font-medium text-muted-foreground">Description</th>
                            <th className="text-right py-3 text-sm font-medium text-muted-foreground">Qté</th>
                            <th className="text-right py-3 text-sm font-medium text-muted-foreground">Prix unit.</th>
                            <th className="text-right py-3 text-sm font-medium text-muted-foreground">Total HT</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50">
                            <td className="py-4 text-foreground">
                              Tournées de livraison - {previewData.month} {previewData.year}
                            </td>
                            <td className="py-4 text-right text-foreground">{previewData.rounds}</td>
                            <td className="py-4 text-right text-foreground">{formatCurrency(previewData.pricePerRound)}</td>
                            <td className="py-4 text-right text-foreground font-medium">{formatCurrency(previewData.totalHT)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end">
                      <div className="w-64 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total HT</span>
                          <span className="font-medium text-foreground">{formatCurrency(previewData.totalHT)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">TVA (20%)</span>
                          <span className="font-medium text-foreground">{formatCurrency(previewData.tva)}</span>
                        </div>
                        <div className="h-px bg-border" />
                        <div className="flex justify-between">
                          <span className="font-semibold text-foreground">Total TTC</span>
                          <span className="font-bold text-xl text-primary">{formatCurrency(previewData.totalTTC)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-8 border-t border-border">
                      <p className="text-xs text-muted-foreground text-center">
                        Conditions de paiement: 30 jours fin de mois
                      </p>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        IBAN: FR76 1234 5678 9012 3456 7890 123 • BIC: BNPAFRPP
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {!previewData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-12 text-muted-foreground"
            >
              <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p>Sélectionnez un client et un mois pour générer une facture</p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
