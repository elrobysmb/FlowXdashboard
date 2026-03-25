// Definición de Dashboards
export const dashboards = [
    { name: 'Grijalva', path: '/instancias/Grijalba', icon: 'mdi-domain', logo: 'grijalvalogo.png' },
    { name: 'Soletanche', path: '/instancias/Soletanche', icon: 'mdi-domain', logo: 'soletanche_logo.jpg' },
    { name: 'Jamleo SAC', path: '/instancias/Jamleo', icon: 'mdi-truck', logo: 'Jamleo SAC LOGO.jpeg' }
]

// Tipos para la sesión de usuario
export interface UserSession {
    email?: string;
    role?: string;
    company_id?: string;
    [key: string]: any;
}

// Helpers de Verificación

function normalize(str: string | undefined | null): string {
    return str ? str.toLowerCase().trim() : ''
}

export function isSuperAdmin(sessionOrRole: UserSession | string | undefined | null): boolean {
    if (!sessionOrRole) return false

    // Si pasan un string, asumimos que es el rol
    if (typeof sessionOrRole === 'string') {
        return normalize(sessionOrRole) === 'superadmin'
    }

    // Si pasan un objeto sesión
    return normalize(sessionOrRole.role) === 'superadmin'
}

// Función genérica para verificar acceso a dashboard de empresa
export function canAccessCompanyDashboard(session: UserSession | null, targetCompanyId: string): boolean {
    if (!session) return false

    const role = normalize(session.role)
    const userCompanyId = normalize(session.company_id)
    const target = normalize(targetCompanyId)

    // 1. Superadmin tiene acceso a todo
    if (role === 'superadmin') return true

    // 2. Admin o Agente tiene acceso SOLO a su compañía asignada
    if ((role === 'admin' || role === 'agent' || role === 'agente') && userCompanyId === target) {
        return true
    }

    return false
}

// Helpers específicos para cada Dashboard (wrappers)
// Nota: 'Healup', 'Brada', etc. deben coincidir con lo que viene en company_id de la BD
// O podemos normalizar aquí. Asumiremos los IDs que ví en la imagen: 'Alef', 'Brada', 'Heal up', 'Alegrated'

export function canAccessHealup(session: UserSession | null): boolean {
    // Normalizamos 'Heal up' a lo que esperamos se use en lógica
    // Ojo: En la BD dice "Heal up", pero mejor soportar variaciones
    if (!session) return false
    if (isSuperAdmin(session)) return true

    const cid = normalize(session.company_id)
    return cid === 'heal up' || cid === 'healup' || cid.includes('heal')
}

export function canAccessBrada(session: UserSession | null): boolean {
    if (!session) return false
    if (isSuperAdmin(session)) return true

    const cid = normalize(session.company_id)
    return cid === 'brada' || cid === 'brada perfumes' || cid.includes('brada')
}

export function canAccessOrigitec(session: UserSession | null): boolean {
    if (!session) return false
    if (isSuperAdmin(session)) return true

    const cid = normalize(session.company_id)
    return cid === 'origitec' || cid.includes('origitec')
}

export function canAccessAlef(session: UserSession | null): boolean {
    // Alef es la empresa dueña, generalmente solo superadmin o admin de Alef
    if (!session) return false
    if (isSuperAdmin(session)) return true

    const cid = normalize(session.company_id)
    return cid === 'alef' || cid === 'alef company' || cid.includes('alef')
}

export function canAccessClinicaArroyo(session: UserSession | null): boolean {
    if (!session) return false
    if (isSuperAdmin(session)) return true

    const cid = normalize(session.company_id)
    return cid === 'clinica arroyo' || cid === 'clinicaarroyo' || cid.includes('arroyo')
}

export function canAccessAlegrated(session: UserSession | null): boolean {
    if (!session) return false
    if (isSuperAdmin(session)) return true

    const cid = normalize(session.company_id)
    return cid === 'alegrated' || cid.includes('alegrated')
}

export function canAccessGrijalva(session: UserSession | null): boolean {
    if (!session) return false
    if (isSuperAdmin(session)) return true

    const cid = normalize(session.company_id)
    return cid === 'grijalva' || cid.includes('grijalva')
}

export function canAccessJamleo(session: UserSession | null): boolean {
    if (!session) return false
    if (isSuperAdmin(session)) return true

    const cid = normalize(session.company_id)
    return cid === 'jamleo' || cid.includes('jamleo')
}

export function canAccessSoletanche(session: UserSession | null): boolean {
    if (!session) return false
    if (isSuperAdmin(session)) return true

    const cid = normalize(session.company_id)
    return cid === 'soletanche' || cid.includes('soletanche')
}

export function getDashboardPathByCompanyId(companyId: string | undefined | null): string {
    if (!companyId) return '/'

    const normalizedId = normalize(companyId)

    // Exact matches based on DB and simple variations
    if (normalizedId === 'heal up' || normalizedId === 'healup' || normalizedId.includes('heal')) return '/instancias/Healup'
    if (normalizedId === 'brada' || normalizedId === 'brada perfumes' || normalizedId.includes('brada')) return '/instancias/BradaPerfumes'
    if (normalizedId === 'alef' || normalizedId === 'alef company' || normalizedId.includes('alef')) return '/instancias/AlefCompany'
    if (normalizedId === 'alegrated' || normalizedId.includes('alegrated')) return '/instancias/Alegrated'
    if (normalizedId === 'clinica arroyo' || normalizedId === 'clinicaarroyo' || normalizedId.includes('arroyo')) return '/instancias/ClinicaArroyo'
    if (normalizedId === 'origitec' || normalizedId.includes('origitec')) return '/instancias/Origitec'
    if (normalizedId === 'grijalva' || normalizedId.includes('grijalva')) return '/instancias/Grijalba'
    if (normalizedId === 'soletanche' || normalizedId.includes('soletanche')) return '/instancias/Soletanche'
    if (normalizedId === 'jamleo' || normalizedId.includes('jamleo')) return '/instancias/Jamleo'

    return '/'
}

