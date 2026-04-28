import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Income } from './pages/Income'
import { FinanceProvider } from './context/FinanceContext'

function App() {
    return (
        <FinanceProvider>
           <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/income' element={<Income />} />
                </Routes>
            </BrowserRouter>
        </FinanceProvider>
    )
}

export default App
