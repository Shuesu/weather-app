import { create } from 'zustand'

interface WeatherStore {
    city: string
    units: 'metric' | 'imperial'
    setCity: (city: string) => void
    setUnits: (units: 'metric' | 'imperial') => void
}

export const useWeatherStore = create<WeatherStore>((set) => ({
    city: 'Almaty',
    units: 'metric',
    setCity: (city) => set({ city }),
    setUnits: (units) => set({ units }),
}))