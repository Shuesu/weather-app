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
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })

    return (
        <div>
            <div className={styles.title}>Сегодня</div>
            <div className={styles.grid}>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>Скорость ветра</div>
                    <div className={styles.value}>{wind} <span>м/с</span></div>
                    <div className={styles.sub}>
                        <div className={styles.compass}>ЗЮЗ</div>
                        Западно-юго-западный
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Ощущается как</div>
                    <div className={styles.value}>{Math.round(uv)}<span>°C</span></div>
                    <div className={styles.sub}>Тепловой комфорт</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Восход и закат</div>
                    <div className={styles.sunRow}>
                        <div className={styles.sunDot}>↑</div>
                        <div>
                            <div className={styles.sunTime}>{sunrise}</div>
                            <div className={styles.sunSub}>Восход</div>
                        </div>
                    </div>
                    <div className={styles.sunRow}>
                        <div className={styles.sunDot}>↓</div>
                        <div>
                            <div className={styles.sunTime}>{sunset}</div>
                            <div className={styles.sunSub}>Закат</div>
                        </div>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Влажность</div>
                    <div className={styles.humRow}>
                        <div className={styles.value}>{humidity}<span>%</span></div>
                        <div className={styles.barTrack}>
                            <div className={styles.barFill} style={{ height: `${humidity}%` }} />
                        </div>
                    </div>
                    <div className={styles.sub}>{humidity < 40 ? 'Сухо 💨' : humidity < 70 ? 'Норма 👍' : 'Влажно 💧'}</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Видимость</div>
                    <div className={styles.value}>{visibility} <span>км</span></div>
                    <div className={styles.sub}>{Number(visibility) > 7 ? 'Хорошая 😊' : 'Средняя 😐'}</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>Давление</div>
                    <div className={styles.value}>{data.main.pressure} <span>гПа</span></div>
                    <div className={styles.sub}>{data.main.pressure > 1013 ? 'Высокое 🔵' : 'Низкое 🔴'}</div>
                </div>
            </div>
        </div>
    )
}