import axios from "axios";
import { TELEGRAM_API_URL } from "../utils/constants"

export const sendMessage = async (text: String, chat_id: String) => {
    try {
        const url = `${TELEGRAM_API_URL}sendMessage`;
        const params = {
            text,
            chat_id,
            parse_mode:"markdown"
        }
        const config = {
            method: "post",
            params
        }
        const res = await axios(url, config);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}