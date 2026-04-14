// Types
export interface Driver {
  id: string
  name: string
  type: 'auto-entrepreneur' | 'societe'
  email: string
  phone: string
  pricePerRound: number
}

export interface Client {
  id: string
  name: string
  pricePerRound: number
  address: string
}

export interface Round {
  id: string
  number: number
  driverId: string
  driverName: string
}

export interface DayEntry {
  id: string
  date: string
  clientId: string
  clientName: string
  rounds: Round[]
}

export interface User {
  firstName: string
  lastName: string
  company: string
}

// Mock Data
export const mockUser: User = {
  firstName: 'Thomas',
  lastName: 'Martin',
  company: 'TM Transport'
}

export const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    type: 'auto-entrepreneur',
    email: 'jean.dupont@email.com',
    phone: '06 12 34 56 78',
    pricePerRound: 120
  },
  {
    id: '2',
    name: 'Marie Bernard',
    type: 'societe',
    email: 'marie.bernard@email.com',
    phone: '06 23 45 67 89',
    pricePerRound: 150
  },
  {
    id: '3',
    name: 'Pierre Martin',
    type: 'auto-entrepreneur',
    email: 'pierre.martin@email.com',
    phone: '06 34 56 78 90',
    pricePerRound: 125
  },
  {
    id: '4',
    name: 'Sophie Leroy',
    type: 'societe',
    email: 'sophie.leroy@email.com',
    phone: '06 45 67 89 01',
    pricePerRound: 145
  }
]

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Mauffrey Transport',
    pricePerRound: 180,
    address: '123 Rue de la Logistique, 75001 Paris'
  },
  {
    id: '2',
    name: 'Geodis Logistics',
    pricePerRound: 195,
    address: '456 Avenue des Transports, 69001 Lyon'
  },
  {
    id: '3',
    name: 'DB Schenker',
    pricePerRound: 210,
    address: '789 Boulevard Industriel, 13001 Marseille'
  }
]

export const mockDayEntries: DayEntry[] = [
  {
    id: '1',
    date: '2026-04-14',
    clientId: '1',
    clientName: 'Mauffrey Transport',
    rounds: [
      { id: '1', number: 1, driverId: '1', driverName: 'Jean Dupont' },
      { id: '2', number: 2, driverId: '2', driverName: 'Marie Bernard' },
      { id: '3', number: 3, driverId: '3', driverName: 'Pierre Martin' }
    ]
  },
  {
    id: '2',
    date: '2026-04-13',
    clientId: '2',
    clientName: 'Geodis Logistics',
    rounds: [
      { id: '4', number: 1, driverId: '1', driverName: 'Jean Dupont' },
      { id: '5', number: 2, driverId: '4', driverName: 'Sophie Leroy' }
    ]
  },
  {
    id: '3',
    date: '2026-04-12',
    clientId: '1',
    clientName: 'Mauffrey Transport',
    rounds: [
      { id: '6', number: 1, driverId: '2', driverName: 'Marie Bernard' },
      { id: '7', number: 2, driverId: '3', driverName: 'Pierre Martin' },
      { id: '8', number: 3, driverId: '4', driverName: 'Sophie Leroy' },
      { id: '9', number: 4, driverId: '1', driverName: 'Jean Dupont' }
    ]
  }
]

// Stats calculation helpers
export function calculateTodayRounds(entries: DayEntry[]): number {
  const today = new Date().toISOString().split('T')[0]
  const todayEntry = entries.find(e => e.date === today)
  return todayEntry ? todayEntry.rounds.length : 0
}

export function calculateMonthRounds(entries: DayEntry[]): number {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  
  return entries
    .filter(e => {
      const date = new Date(e.date)
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear
    })
    .reduce((sum, entry) => sum + entry.rounds.length, 0)
}

export function calculateEstimatedRevenue(entries: DayEntry[], clients: Client[]): number {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  
  return entries
    .filter(e => {
      const date = new Date(e.date)
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear
    })
    .reduce((sum, entry) => {
      const client = clients.find(c => c.id === entry.clientId)
      const pricePerRound = client?.pricePerRound || 180
      return sum + (entry.rounds.length * pricePerRound)
    }, 0)
}

export function calculateDriverStats(entries: DayEntry[], drivers: Driver[], clients: Client[]) {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  
  const monthEntries = entries.filter(e => {
    const date = new Date(e.date)
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear
  })
  
  return drivers.map(driver => {
    const roundCount = monthEntries.reduce((sum, entry) => {
      const driverRounds = entry.rounds.filter(r => r.driverId === driver.id)
      return sum + driverRounds.length
    }, 0)
    
    const revenue = monthEntries.reduce((sum, entry) => {
      const client = clients.find(c => c.id === entry.clientId)
      const pricePerRound = client?.pricePerRound || 180
      const driverRounds = entry.rounds.filter(r => r.driverId === driver.id)
      return sum + (driverRounds.length * pricePerRound)
    }, 0)
    
    const cost = roundCount * driver.pricePerRound
    
    return {
      driver,
      roundCount,
      revenue,
      cost
    }
  })
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
