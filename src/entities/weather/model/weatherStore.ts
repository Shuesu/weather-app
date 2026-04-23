import { create } from 'zustand'

interface WeatherStore {
    city: string
    units: 'metric' | 'imperial'
    audio: HTMLAudioElement | null
    playing: boolean
    setCity: (city: string) => void
    setUnits: (units: 'metric' | 'imperial') => void
    toggleSound: () => void
}

export const useWeatherStore = create<WeatherStore>((set, get) => ({
    city: 'Almaty',
    units: 'metric',
    audio: null,
    playing: false,
    setCity: (city) => set({ city }),
    setUnits: (units) => set({ units }),
    toggleSound: () => {
        let { audio, playing } = get()

        if (!audio) {
            audio = new Audio('/sound.mp3')
            audio.loop = true
            set({ audio })
        }

        if (playing) {
            audio.pause()
        } else {
            audio.play()
        }

        set({ playing: !playing })
    }
}))