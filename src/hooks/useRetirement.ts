// react
import { useState } from 'react'

// finances
import { 
    get401KContributions, updateLocalStorage401KTraditional,
    getRoth401KContributions, updateLocalStorageRoth401K,
    getEmployerMatch, updateLocalStorageEmployerMatch
 } from '../utils/retirement'

export function useRetirement() {
    const [_401K, set401K] = useState<number>(get401KContributions())
    const [roth401K, setRoth401K] = useState<number>(getRoth401KContributions())
    const [employerMatch, setEmployerMatch] = useState<number>(getEmployerMatch())

    function handle401KChange(newValue: number) {
        if (newValue === 0) 
        {
            set401K(NaN)
            updateLocalStorage401KTraditional(NaN)
            return
        }

        set401K(newValue)
        updateLocalStorage401KTraditional(newValue)
    }

    function handleRoth401KChange(newValue: number) {
        if (newValue === 0) 
        {
            setRoth401K(NaN)
            updateLocalStorageRoth401K(NaN)
            return
        }

        setRoth401K(newValue)
        updateLocalStorageRoth401K(newValue)
    }

    function handleEmployerMatchChange(newValue: number) {
        if (newValue === 0) 
        {
            setEmployerMatch(NaN)
            updateLocalStorageEmployerMatch(NaN)
            return
        }

        setEmployerMatch(newValue)
        updateLocalStorageEmployerMatch(newValue)
    }

    return { 
        _401K, handle401KChange, 
        roth401K, handleRoth401KChange, 
        employerMatch, handleEmployerMatchChange 
    }
}
