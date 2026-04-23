import { Link, useLocation } from 'react-router-dom'
import { useWeatherData } from '@/entities/weather/model/useWeatherData'
import { useWeatherStore } from '@/entities/weather/model/weatherStore'
import { MainLayout } from '@/app/layouts/MainLayout'
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar'
import { WeekCards } from '@/widgets/week-cards/ui/WeekCards'
import { Highlights } from '@/widgets/highlights/ui/Highlights'
import { SoundButton } from '@/features/toggle-units/ui/SoundButton'
import styles from './TodayPage.module.css'

export function TodayPage() {
    const { units, setUnits } = useWeatherStore()
    const { current, forecast, error, loading } = useWeatherData()
    const location = useLocation()

    return (
        <MainLayout
            sidebar={<Sidebar data={current} />}
            content={
                <div className={styles.content}>
                    <div className={styles.toprow}>
                        <div className={styles.tabs}>
                            <Link
                                to="/today"
                                className={`${styles.tab} ${location.pathname === '/today' ? styles.active : ''}`}
                            >
                                Today
                            </Link>
                            <Link
                                to="/week"
                                className={`${styles.tab} ${location.pathname === '/week' ? styles.active : ''}`}
                            >
                                Week
                            </Link>
                            <SoundButton />
                        </div>
                        <div className={styles.units}>
                            <button
                                className={`${styles.unitBtn} ${units === 'metric' ? styles.unitActive : ''}`}
                                onClick={() => setUnits('metric')}
                            >°C</button>
                            <button
                                className={`${styles.unitBtn} ${units === 'imperial' ? styles.unitActive : ''}`}
                                onClick={() => setUnits('imperial')}
                            >°F</button>
                        </div>
                    </div>

                    {loading && <div className={styles.loading}>Загрузка...</div>}

                    {error && (
                        <div className={styles.error}>
                            ⚠️ {error} — попробуй другой город
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            <WeekCards data={forecast} />
                            <Highlights data={current} />
                        </>
                    )}
                </div>
            }
        />
    )
}