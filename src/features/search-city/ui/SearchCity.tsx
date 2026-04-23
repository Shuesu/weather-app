import { useState } from 'react'
import { useWeatherStore } from '@/entities/weather/model/weatherStore'
import styles from './SearchCity.module.css'

export function SearchCity() {
    const { setCity } = useWeatherStore()
    const [input, setInput] = useState('')

    const handleSearch = () => {
        if (input.trim()) {
            setCity(input.trim())
            setInput('')
        }
    }

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch()
    }

    return (
        <div className={styles.search}>
            <span>🔍</span>
            <input
                placeholder="Search for places..."
                className={styles.input}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
            />
            {input && (
                <span className={styles.btn} onClick={handleSearch}>→</span>
            )}
        </div>
    )
}