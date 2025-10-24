export interface Transaction  {
id: string
name: string
description?: string
date: string // ISO date
amount: number
type: 'payment' | 'charge' // payment is credit
pending?: boolean
authorizedUser?: string
authorized?: boolean
icon?: string
}