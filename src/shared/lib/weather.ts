export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function getIcon(condition: string) {
    const map: Record<string, string> = {
        Clear: '☀️', Clouds: '⛅', Rain: '🌧️',
        Snow: '❄️', Thunderstorm: '⛈️', Drizzle: '🌦️', Mist: '🌫️',
    }
    return map[condition] ?? '🌤️'
}