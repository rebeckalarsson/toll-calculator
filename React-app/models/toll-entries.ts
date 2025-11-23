import type { VehicleType } from './vehicles'

export interface TollEntries {
  id: number
  firstName: string
  lastName: string
  email: string
  vehicles: Array<VehicleEntries>
  entries: Array<TollEntry>
}

export interface VehicleEntries {
  type: VehicleType
  registration: string
}

export interface TollEntry {
  vehicle: VehicleType
  registration: string
  date: Date
}
