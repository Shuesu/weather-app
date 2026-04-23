import { useState, useRef } from 'react'
import styles from './SoundButton.module.css'

export function SoundButton() {
    const [playing, setPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const toggle = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio('/sound.mp3')
            audioRef.current.loop = true
        }

        if (playing) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }

        setPlaying(!playing)
    }

    return (
        <button className={`${styles.btn} ${playing ? styles.active : ''}`} onClick={toggle}>
            {playing ? '🔊 SOUND' : '🔇 SOUND'}
        </button>
    )
}