export interface Weather {
    main: string
    description: string
    icon: string
}

export interface CurrentWeather {
    name: string
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        humidity: number
        pressure: number
    }
    weather: Weather[]
    wind: {
        speed: number
        deg: number
    }
    visibility: number
    sys: {
        country: string
        sunrise: number
        sunset: number
    }
}

export interface ForecastItem {
    dt: number
    main: {
        temp: number
        temp_min: number
        temp_max: number
        humidity: number
    }
    weather: Weather[]
    wind: {
        speed: number
    }
}

export interface Forecast {
    list: ForecastItem[]
}