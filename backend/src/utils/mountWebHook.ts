import { config } from "dotenv";
config();
import axios from "axios"
import { TELEGRAM_API_URL, WEBHOOK_PROXY_URL } from "./constants"

export const mountWebHook = async () => {
    try {
        const url = `${TELEGRAM_API_URL}setWebhook`;
        const params = {
            url: WEBHOOK_PROXY_URL
        }
        const config = {
            method: "get",
            params
        }
        const res = await axios(url, config);
        if (res.status === 200) {
            console.log("Webhook mount successful");
        } else {
            console.log("Webhook mount unsuccessful");
        }
    } catch (err) {
        console.log("Webhook mount unsuccessful");
        throw err;
    }
}