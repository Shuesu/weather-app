import { Link, useLocation } from 'react-router-dom'
import { useWeatherStore } from '@/entities/weather/model/weatherStore'
import { SoundButton } from '@/features/sound/ui/SoundButton'
import styles from './TopBar.module.css'

export function TopBar() {
    const { units, setUnits } = useWeatherStore()
    const location = useLocation()

    return (
        <div className={styles.toprow}>
            <div className={styles.tabs}>
                <Link to="/today" className={`${styles.tab} ${location.pathname === '/today' ? styles.active : ''}`}>Сегодня</Link>
                <Link to="/week" className={`${styles.tab} ${location.pathname === '/week' ? styles.active : ''}`}>Неделя</Link>
            </div>
            <div className={styles.actions}>
                <SoundButton />
                <div className={styles.units}>
                    <button className={`${styles.unitBtn} ${units === 'metric' ? styles.unitActive : ''}`} onClick={() => setUnits('metric')}>°C</button>
                    <button className={`${styles.unitBtn} ${units === 'imperial' ? styles.unitActive : ''}`} onClick={() => setUnits('imperial')}>°F</button>
                </div>
            </div>
        </div>
    )
}