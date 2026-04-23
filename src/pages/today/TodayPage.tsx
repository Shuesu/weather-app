import { useWeatherData } from '@/entities/weather/model/useWeatherData'
import { MainLayout } from '@/app/layouts/MainLayout'
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar'
import { Highlights } from '@/widgets/highlights/ui/Highlights'
import { TopBar } from '@/widgets/top-bar/ui/TopBar'
import styles from './TodayPage.module.css'

export function TodayPage() {
    const { current, error, loading } = useWeatherData()

    return (
        <MainLayout
            sidebar={<Sidebar data={current} />}
            content={
                <div className={styles.content}>
                    <TopBar />

                    {loading && <div className={styles.loading}>Загрузка...</div>}

                    {error && (
                        <div className={styles.error}>
                            ⚠️ {error} — попробуй другой город
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            <Highlights data={current} />
                        </>
                    )}
                </div>
            }
        />
    )
}