import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TodayPage } from '@/pages/today/TodayPage'
import { WeekPage } from '@/pages/week/WeekPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/today" replace />} />
                <Route path="/today" element={<TodayPage />} />
                <Route path="/week" element={<WeekPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App