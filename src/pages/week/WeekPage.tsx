import { useEffect, useState } from 'react'
import { fetchCurrentWeather, fetchWeekWeather } from '@/shared/api/weatherApi'
import { useWeatherStore } from '@/entities/weather/model/weatherStore'
import { MainLayout } from '@/app/layouts/MainLayout'
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar'
import { Link, useLocation } from 'react-router-dom'
import styles from './WeekPage.module.css'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getIcon(condition: string) {
    const map: Record<string, string> = {
        Clear: '☀️', Clouds: '⛅', Rain: '🌧️',
        Snow: '❄️', Thunderstorm: '⛈️', Drizzle: '🌦️', Mist: '🌫️',
    }
    return map[condition] ?? '🌤️'
}

export function WeekPage() {
    const { city, units, setUnits } = useWeatherStore()
    const [current, setCurrent] = useState<any>(null)
    const [forecast, setForecast] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const location = useLocation()

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

    const daily = forecast?.list.filter((_: any, i: number) => i % 8 === 0).slice(0, 7) ?? []

    return (
        <MainLayout
            sidebar={<Sidebar data={current} />}
            content={
                <div className={styles.content}>
                    <div className={styles.toprow}>
                        <div className={styles.tabs}>
                            <Link to="/today" className={`${styles.tab} ${location.pathname === '/today' ? styles.active : ''}`}>Today</Link>
                            <Link to="/week" className={`${styles.tab} ${location.pathname === '/week' ? styles.active : ''}`}>Week</Link>
                        </div>
                        <div className={styles.units}>
                            <button className={`${styles.unitBtn} ${units === 'metric' ? styles.unitActive : ''}`} onClick={() => setUnits('metric')}>°C</button>
                            <button className={`${styles.unitBtn} ${units === 'imperial' ? styles.unitActive : ''}`} onClick={() => setUnits('imperial')}>°F</button>
                        </div>
                    </div>

                    {loading && <div className={styles.loading}>Загрузка...</div>}
                    {error && <div className={styles.error}>⚠️ {error} — попробуй другой город</div>}

                    {!loading && !error && (
                        <div className={styles.list}>
                            {daily.map((item: any, i: number) => {
                                const date = new Date(item.dt * 1000)
                                const day = DAYS[date.getDay()]
                                const icon = getIcon(item.weather[0].main)
                                const desc = item.weather[0].description

                                return (
                                    <div key={i} className={styles.row}>
                                        <div className={styles.dayName}>{i === 0 ? 'Today' : day}</div>
                                        <div className={styles.icon}>{icon}</div>
                                        <div className={styles.desc}>{desc}</div>
                                        <div className={styles.stats}>
                                            <span>💧 {item.main.humidity}%</span>
                                            <span>💨 {item.wind.speed} m/s</span>
                                        </div>
                                        <div className={styles.temps}>
                                            <span className={styles.hi}>{Math.round(item.main.temp_max)}°</span>
                                            <span className={styles.lo}>{Math.round(item.main.temp_min)}°</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            }
        />
    )
}