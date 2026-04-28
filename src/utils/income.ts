
export function getIncome() {
    const income = localStorage.getItem('income')
    
    return income ? Number(income) : null
}

export function saveIncome(amount: number) {
    localStorage.setItem('income', amount.toString())
}