export interface Logbook {
    userId: string
    type: 'incident' | 'soin' | 'observation' | 'logistique' 
    description: string 
    severity: 'low' | 'medium' | 'high' | 'critical' 
    date: Date
}