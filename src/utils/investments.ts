import type { Investment } from "../types/investment";

export function getInvestmentsFromStorage(): Investment[] {
    return JSON.parse(localStorage.getItem('investments') || '[]');
}

export function saveInvestmentsToStorage(investments: Investment[]) {
    localStorage.setItem('investments', JSON.stringify(investments));
}