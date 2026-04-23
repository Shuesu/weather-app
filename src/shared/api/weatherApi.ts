const BASE = 'https://api.openweathermap.org/data/2.5'
const KEY = import.meta.env.VITE_WEATHER_KEY

export const fetchCurrentWeather = (city: string, units: string) =>
    fetch(`${BASE}/weather?q=${city}&appid=${KEY}&units=${units}&lang=ru`)
        .then(res => {
            if (!res.ok) throw new Error('Город не найден')
            return res.json()
        })

export const fetchWeekWeather = (city: string, units: string) =>
    fetch(`${BASE}/forecast?q=${city}&appid=${KEY}&units=${units}&lang=ru`)
        .then(res => {
            if (!res.ok) throw new Error('Город не найден')
            return res.json()
        })