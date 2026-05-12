import type { PayRate } from '../types/income'

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

export function getIncomeRate() {
    const incomeRate = localStorage.getItem('incomeRate')
    return incomeRate ? Number(incomeRate) : null
}

export function saveIncomeRate(incomeRate: number | null) {
    if (incomeRate) {
        localStorage.setItem('incomeRate', incomeRate.toString())   
    } else {
        localStorage.removeItem('incomeRate')
    }
}

export function savePayRate(payRate: PayRate | '') {
    localStorage.setItem('payRate', payRate) 
}

export function getPayRate(): PayRate | '' {
    const payCycle = localStorage.getItem('payRate') as PayRate | ''
    return payCycle || ''
}

export function calculateIncomePerPayRate(income: number, payRate: PayRate) : number {
    switch (payRate) {
        case 'Hourly':
            return income * 2080
        case 'Salary':
            return income
        default:
            return income
    }
}