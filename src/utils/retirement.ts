
export function get401KContributions() {
    const storedValue = localStorage.getItem('401K')
    return storedValue ? parseFloat(storedValue) : 0
}

export function getRoth401KContributions() {
    const storedValue = localStorage.getItem('roth401K')
    return storedValue ? parseFloat(storedValue) : 0
}

export function calculate401KContribution(income: number, contributionPercentage: number) {
    return income * (contributionPercentage / 100)
}