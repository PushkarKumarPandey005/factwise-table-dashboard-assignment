
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

function App() {
  return (
    <div className="w-full bg-[#e6e7eb] min-h-screen">
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/employees" element={<Employees/>} />
        <Route path="/reports" element={<Reports/>} />
        <Route path="/settings" element={<Settings/>} />
      </Routes>
    </div>
  )
}

export default App
