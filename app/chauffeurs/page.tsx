'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  User, 
  Mail, 
  Phone, 
  Euro,
  Edit2,
  Trash2,
  Building2,
  Briefcase
} from 'lucide-react'
import { AppSidebar } from '@/components/app-sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockDrivers, type Driver } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function ChauffeursPage() {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'auto-entrepreneur' as 'auto-entrepreneur' | 'societe',
    pricePerRound: 120
  })

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenDialog = (driver?: Driver) => {
    if (driver) {
      setEditingDriver(driver)
      setFormData({
        name: driver.name,
        email: driver.email,
        phone: driver.phone,
        type: driver.type,
        pricePerRound: driver.pricePerRound
      })
    } else {
      setEditingDriver(null)
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: 'auto-entrepreneur',
        pricePerRound: 120
      })
    }
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (editingDriver) {
      setDrivers(drivers.map(d =>
        d.id === editingDriver.id
          ? { ...d, ...formData }
          : d
      ))
    } else {
      const newDriver: Driver = {
        id: String(Date.now()),
        ...formData
      }
      setDrivers([...drivers, newDriver])
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setDrivers(drivers.filter(d => d.id !== id))
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
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Chauffeurs
              </h1>
              <p className="mt-1 text-muted-foreground">
                Gérez votre équipe de chauffeurs
              </p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Ajouter un chauffeur
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingDriver ? 'Modifier le chauffeur' : 'Nouveau chauffeur'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Nom complet
                    </label>
                    <Input
                      placeholder="Jean Dupont"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="jean@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Téléphone
                    </label>
                    <Input
                      type="tel"
                      placeholder="06 12 34 56 78"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Type de contrat
                    </label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: 'auto-entrepreneur' | 'societe') =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto-entrepreneur">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            Auto-entrepreneur (TVA 0%)
                          </div>
                        </SelectItem>
                        <SelectItem value="societe">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Société (TVA 20%)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Prix par tournée (€)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.pricePerRound}
                      onChange={(e) => setFormData({ ...formData, pricePerRound: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleSave}>
                    {editingDriver ? 'Modifier' : 'Ajouter'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un chauffeur..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Driver list */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredDrivers.map((driver, index) => (
                <motion.div
                  key={driver.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="glass-card rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{driver.name}</h3>
                        <span className={cn(
                          "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full",
                          driver.type === 'auto-entrepreneur'
                            ? "bg-accent/10 text-accent"
                            : "bg-primary/10 text-primary"
                        )}>
                          {driver.type === 'auto-entrepreneur' ? (
                            <>
                              <Briefcase className="h-3 w-3" />
                              Auto-entrepreneur
                            </>
                          ) : (
                            <>
                              <Building2 className="h-3 w-3" />
                              Société
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleOpenDialog(driver)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(driver.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{driver.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{driver.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <Euro className="h-4 w-4" />
                      <span>{driver.pricePerRound}€ / tournée</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredDrivers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <User className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">Aucun chauffeur trouvé</p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
