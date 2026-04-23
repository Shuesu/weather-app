import styles from './Sidebar.module.css'
import { useWeatherStore } from '@/entities/weather/model/weatherStore'
import { SearchCity } from '@/features/search-city/ui/SearchCity'
import type {CurrentWeather} from "@/entities/weather/model/types.ts";

interface Props {
    data: CurrentWeather | null
}

export function Sidebar({ data }: Props) {
    const { city } = useWeatherStore()

    return (
        <div className={styles.sidebar}>
            <SearchCity />

            <div className={styles.iconWrap}>
                <div className={styles.sun} />
                <div className={styles.cloud} />
                <div className={styles.rainLines}>
                    <div className={styles.rain} style={{ height: 18 }} />
                    <div className={styles.rain} style={{ height: 24 }} />
                    <div className={styles.rain} style={{ height: 14 }} />
                    <div className={styles.rain} style={{ height: 20 }} />
                </div>
            </div>

            <div className={styles.temp}>
                {data ? Math.round(data.main.temp) : '--'}
                <span>°C</span>
            </div>

            <div className={styles.date}>
                {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </div>

            <div className={styles.divider} />

            <div className={styles.condRow}>
                <span>☁️</span>
                <span>{data?.weather[0]?.description ?? '...'}</span>
            </div>

            <div className={styles.condRow}>
                <span>💧</span>
                <span>Humidity — {data?.main?.humidity ?? '--'}%</span>
            </div>

            <div className={styles.cityCard}>
                <div className={styles.cityName}>{data?.name ?? city}</div>
                <div className={styles.citySub}>{data?.sys?.country ?? ''}</div>
            </div>
        </div>
    )
}