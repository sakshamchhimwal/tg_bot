import dayjs from "dayjs";
import { UserDetails } from "../interfaces/userInterface";
import { Weather } from "../interfaces/weatherAPIInterface";

export const weatherMessage = (user: UserDetails, weather: Weather): string => {
    const message: string = `
\*Hello ${user.name}\*
Today's Weather:
\*Date:\* ${dayjs(Date.now()).format("DD-MM-YYYY")}
\*Time:\* ${dayjs(Date.now()).format("H:m:s")}
\*Location:\* ${weather.location.name} (${weather.location.lat},${weather.location.lon})
\*Temperature:\* ${weather.current.temp_c}°C, Feels Like ${weather.current.feelslike_c}°C
\*Wind Speed:\* ${weather.current.wind_kph} KMPH
\*Humidity:\* ${weather.current.humidity}
\*UV:\* ${weather.current.uv}
\*Percipitation:\* ${weather.current.precip_mm}
`
    return message;
}

export const errorMessage = (message: string): string => {
    const msg: string = `
\* ❌ Error!!! ❌ \*
${message}
`
    return msg;
}