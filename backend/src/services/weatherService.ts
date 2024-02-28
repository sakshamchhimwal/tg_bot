import { configDotenv } from "dotenv";
import axios from "axios";
import { WEATHER_API_URL } from "../utils/constants";
import { Location, Weather } from "../interfaces/weatherAPIInterface";
configDotenv();

export const getWeather = async (location: string): Promise<Weather | undefined> => {
    try {
        const url = `${WEATHER_API_URL}`;
        const params = {
            q: location,
            key: <string>process.env.WEATHER_API_KEY
        };
        const config = {
            method: "get",
            params
        }
        const res = await axios(url, config);
        return res.data;
    } catch (err) {
        throw err;
    }
}