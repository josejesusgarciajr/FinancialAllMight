
export function get401KContributions() {
    const storedValue = localStorage.getItem('401K')
    return storedValue ? parseFloat(storedValue) : 0
}

export function getRoth401KContributions() {
    const storedValue = localStorage.getItem('roth401K')
    return storedValue ? parseFloat(storedValue) : 0
}

export function getEmployerMatch() {
    const storedValue = localStorage.getItem('employerMatch')
    return storedValue ? parseFloat(storedValue) : 0
}

export function get401KBalance() {
    const storedValue = localStorage.getItem('401KBalance')
    return storedValue ? parseFloat(storedValue) || 0 : 0
}

export function updateLocalStorage401KBalance(newValue: number) {
    localStorage.setItem('401KBalance', newValue.toString())
}

export const DEFAULT_401K_SYMBOL = 'FXAIX'

export function get401KSymbol() {
    return localStorage.getItem('401KSymbol') || DEFAULT_401K_SYMBOL
}

export function updateLocalStorage401KSymbol(symbol: string) {
    localStorage.setItem('401KSymbol', symbol)
}

export function calculate401KContribution(income: number, contributionPercentage: number) {
    return income * (contributionPercentage / 100)
}

export function calculateEmployerMatch(income: number, contributionPercentage: number) {
    return income * (contributionPercentage / 100)
}

export function updateLocalStorage401KTraditional(newValue: number) {
    localStorage.setItem('401K', newValue.toString())
}

export function updateLocalStorageRoth401K(newValue: number) {
    localStorage.setItem('roth401K', newValue.toString())
}

export function updateLocalStorageEmployerMatch(employerMatchPercentage: number) {
    localStorage.setItem('employerMatch', employerMatchPercentage.toString())
}