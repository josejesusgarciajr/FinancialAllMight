import type { Debt } from '../types/debt'

export function saveDebtToLocalStorage(debt: Debt): void {
    const existingDebts = localStorage.getItem('debts');
    const debts = existingDebts ? JSON.parse(existingDebts) : [];

    debts.push(debt);
    localStorage.setItem('debts', JSON.stringify(debts));
}

export function getDebtsFromLocalStorage(): Debt[] {
    const existingDebts = localStorage.getItem('debts');
    return existingDebts ? JSON.parse(existingDebts) : [];
}

export function deleteDebtFromLocalStorage(debtId: string): void {
    const existingDebts = localStorage.getItem('debts');
    if (!existingDebts) return;

    const debts = JSON.parse(existingDebts) as Debt[];
    const updatedDebts = debts.filter(debt => debt.id !== debtId);
    localStorage.setItem('debts', JSON.stringify(updatedDebts));
}

export function updateDebtInLocalStorage(updatedDebt: Debt): void {
    const debts = getDebtsFromLocalStorage();
    const updated = debts.map(d => d.id === updatedDebt.id ? updatedDebt : d);
    localStorage.setItem('debts', JSON.stringify(updated));
}