import { config } from "dotenv";
config();
export const WEATHER_API_URL = "https://api.weatherapi.com/v1/current.json"
export const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_API_KEY}/`
export const WEBHOOK_PROXY_URL = <string>process.env.WEBHOOK_PROXY_URL;
export const WEBHOOK_RETURN_URL = <string>process.env.WEBHOOK_RETURN_URL;