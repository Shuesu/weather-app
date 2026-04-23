import { useWeatherStore } from '@/entities/weather/model/weatherStore'
import styles from './SoundButton.module.css'

export function SoundButton() {
    const { playing, toggleSound } = useWeatherStore()

    return (
        <button className={`${styles.btn} ${playing ? styles.active : ''}`} onClick={toggleSound}>
            {playing ? '🔊 Музыка' : '🔇 Музыка'}
        </button>
    )
}