import styles from './WeekCards.module.css'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface Props {
    data: any
}

export function WeekCards({ data }: Props) {
    if (!data) return <div className={styles.loading}>Загрузка...</div>

    const daily = data.list.filter((_: any, i: number) => i % 8 === 0).slice(0, 7)

    return (
        <div className={styles.cards}>
            {daily.map((item: any, i: number) => {
                const date = new Date(item.dt * 1000)
                const day = DAYS[date.getDay()]
                const icon = getIcon(item.weather[0].main)

                return (
                    <div key={i} className={`${styles.card} ${i === 0 ? styles.active : ''}`}>
                        <div className={styles.dayName}>{i === 0 ? 'Today' : day}</div>
                        <div className={styles.icon}>{icon}</div>
                        <div className={styles.temps}>
                            <span className={styles.hi}>{Math.round(item.main.temp_max)}°</span>
                            <span className={styles.lo}>{Math.round(item.main.temp_min)}°</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function getIcon(condition: string) {
    const map: Record<string, string> = {
        Clear: '☀️', Clouds: '⛅', Rain: '🌧️',
        Snow: '❄️', Thunderstorm: '⛈️', Drizzle: '🌦️', Mist: '🌫️',
    }
    return map[condition] ?? '🌤️'
}