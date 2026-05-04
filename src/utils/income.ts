
export function getIncome() {
    const income = localStorage.getItem('income')
    
    return income ? Number(income) : null
}

export function saveIncome(amount: number | null) {
    if (amount) {
        localStorage.setItem('income', amount.toString())
    } else {
        localStorage.removeItem('income')
    }
}