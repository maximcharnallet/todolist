export interface Logbook {
    userId: string
    description: string
    date: Date
    isImportant: boolean
    // type: 'accident' | 'soin' | 'observation' | 'logistique' | 'urgence'
    // severity: 'low' | 'medium' | 'high' | 'critical' 
}