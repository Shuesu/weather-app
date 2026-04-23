import { useWeatherData } from '@/entities/weather/model/useWeatherData'
import { DAYS, getIcon } from '@/shared/lib/weather'
import type { ForecastItem } from '@/entities/weather/model/types'
import { MainLayout } from '@/app/layouts/MainLayout'
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar'
import { TopBar } from '@/widgets/top-bar/ui/TopBar'
import styles from './WeekPage.module.css'

export function WeekPage() {
    const { current, forecast, error, loading } = useWeatherData()

    const daily = forecast?.list.filter((_: ForecastItem, i: number) => i % 8 === 0).slice(0, 7) ?? []

    return (
        <MainLayout
            sidebar={<Sidebar data={current} />}
            content={
                <div className={styles.content}>
                    <TopBar />

                    {loading && <div className={styles.loading}>Загрузка...</div>}
                    {error && <div className={styles.error}>⚠️ {error} — попробуй другой город</div>}

                    {!loading && !error && (
                        <div className={styles.list}>
                            {daily.map((item: ForecastItem, i: number) => {
                                const date = new Date(item.dt * 1000)
                                const day = DAYS[date.getDay()]
                                const icon = getIcon(item.weather[0].main)
                                const desc = item.weather[0].description

                                return (
                                    <div key={i} className={styles.row}>
                                        <div className={styles.dayName}>{i === 0 ? 'Сегодня' : day}</div>
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