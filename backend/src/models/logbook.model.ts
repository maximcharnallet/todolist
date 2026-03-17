export interface Logbook {
    userId: string
    type: 'accident' | 'soin' | 'observation' | 'logistique' | 'urgence'
    description: string 
    severity: 'low' | 'medium' | 'high' | 'critical' 
    date: Date
}