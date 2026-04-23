export const DAYS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

export function getIcon(condition: string) {
    const map: Record<string, string> = {
        Clear: '☀️', Clouds: '⛅', Rain: '🌧️',
        Snow: '❄️', Thunderstorm: '⛈️', Drizzle: '🌦️', Mist: '🌫️',
    }
    return map[condition] ?? '🌤️'
}

export function getWeatherEmoji(condition: string) {
    const map: Record<string, string> = {
        Clear: '☀️',
        Clouds: '⛅',
        Rain: '🌧️',
        Snow: '❄️',
        Thunderstorm: '⛈️',
        Drizzle: '🌦️',
        Mist: '🌫️',
    }
    return map[condition] ?? '🌤️'
}