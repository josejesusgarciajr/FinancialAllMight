// react
import { useState } from 'react'

// taxes
import { getFilingState, saveFilingState } from '../utils/taxes'

export function useTaxes() {
    const [filingState, setFilingState] = useState<string>(getFilingState())

    function updateFilingState(state: string) {
        setFilingState(state)
        saveFilingState(state)
    }

    return { filingState, updateFilingState }
}