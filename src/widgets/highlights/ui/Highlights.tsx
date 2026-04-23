import styles from './Highlights.module.css'
import type {CurrentWeather} from "@/entities/weather/model/types.ts";

interface Props {
    data: CurrentWeather | null
}

export function Highlights({ data }: Props) {
    if (!data) return <div className={styles.loading}>Загрузка...</div>

    const uv = data.main.feels_like
    const wind = data.wind.speed
    const humidity = data.main.humidity
    const visibility = (data.visibility / 1000).toFixed(1)
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

    return (
        <div>
            <div className={styles.title}>Today's Highlights</div>
            <div className={styles.grid}>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Wind Status</div>
                    <div className={styles.value}>{wind} <span>m/s</span></div>
                    <div className={styles.sub}>
                        <div className={styles.compass}>WSW</div>
                        West South West
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Feels Like</div>
                    <div className={styles.value}>{Math.round(uv)}<span>°C</span></div>
                    <div className={styles.sub}>Thermal comfort</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Sunrise & Sunset</div>
                    <div className={styles.sunRow}>
                        <div className={styles.sunDot}>↑</div>
                        <div>
                            <div className={styles.sunTime}>{sunrise}</div>
                            <div className={styles.sunSub}>Sunrise</div>
                        </div>
                    </div>
                    <div className={styles.sunRow}>
                        <div className={styles.sunDot}>↓</div>
                        <div>
                            <div className={styles.sunTime}>{sunset}</div>
                            <div className={styles.sunSub}>Sunset</div>
                        </div>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Humidity</div>
                    <div className={styles.humRow}>
                        <div className={styles.value}>{humidity}<span>%</span></div>
                        <div className={styles.barTrack}>
                            <div className={styles.barFill} style={{ height: `${humidity}%` }} />
                        </div>
                    </div>
                    <div className={styles.sub}>{humidity < 40 ? 'Dry 💨' : humidity < 70 ? 'Normal 👍' : 'Humid 💧'}</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Visibility</div>
                    <div className={styles.value}>{visibility} <span>km</span></div>
                    <div className={styles.sub}>{Number(visibility) > 7 ? 'Good 😊' : 'Average 😐'}</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Pressure</div>
                    <div className={styles.value}>{data.main.pressure} <span>hPa</span></div>
                    <div className={styles.sub}>{data.main.pressure > 1013 ? 'High 🔵' : 'Low 🔴'}</div>
                </div>

            </div>
        </div>
    )
}