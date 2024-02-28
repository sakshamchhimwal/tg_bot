import { config } from "dotenv";
config();
import SmeeClient from 'smee-client'
import { WEBHOOK_PROXY_URL, WEBHOOK_RETURN_URL } from "../utils/constants";
export const smee = new SmeeClient({
    source: WEBHOOK_PROXY_URL,
    target: WEBHOOK_RETURN_URL,
    logger: console
})
