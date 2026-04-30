import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Income } from './pages/Income'
import { FinanceProvider } from './context/FinanceContext'
import { Retirement } from './pages/Retirement'

function App() {
    return (
        <FinanceProvider>
           <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/income' element={<Income />} />
                    <Route path='/retirement' element={<Retirement />} />
                </Routes>
            </BrowserRouter>
        </FinanceProvider>
    )
}

export default App
