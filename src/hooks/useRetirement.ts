// react
import { useState } from 'react'

// finances
import { get401KContributions, getRoth401KContributions } from '../utils/retirement'

export function useRetirement() {
    const [_401K, set401K] = useState<number>(get401KContributions())
    const [roth401K, setRoth401K] = useState<number>(getRoth401KContributions())

    function handle401KChange(newValue: number) {
        set401K(newValue)
        localStorage.setItem('401K', newValue.toString())
    }

    function handleRoth401KChange(newValue: number) {
        setRoth401K(newValue)
        localStorage.setItem('roth401K', newValue.toString())
    }

    return { _401K, handle401KChange, roth401K, handleRoth401KChange }
}
