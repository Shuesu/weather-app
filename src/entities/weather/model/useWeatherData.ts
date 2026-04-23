import { useEffect, useState } from 'react'
import { fetchCurrentWeather, fetchWeekWeather } from '@/shared/api/weatherApi'
import { useWeatherStore } from './weatherStore'
import type { CurrentWeather, Forecast } from './types'

export function useWeatherData() {
    const { city, units } = useWeatherStore()
    const [current, setCurrent] = useState<CurrentWeather | null>(null)
    const [forecast, setForecast] = useState<Forecast | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(null)
        Promise.all([
            fetchCurrentWeather(city, units),
            fetchWeekWeather(city, units)
        ])
            .then(([curr, fore]) => {
                setCurrent(curr)
                setForecast(fore)
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [city, units])

    return { current, forecast, error, loading }
}