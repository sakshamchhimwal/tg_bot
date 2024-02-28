import { CronJob } from 'cron';
import { User } from '../models/user';
import { getWeather } from './weatherService';
import { weatherMessage } from '../utils/messageFormatter';
import { sendMessage } from './messageService';
import dayjs from 'dayjs';

let cornString = "0 5 * * *";

const getCronString = (): string => {
    return cornString;
}

const updateCronString = (newCronString: string) => {
    cornString = newCronString;
    console.log(cornString);
}

const messageCRONJob = new CronJob(
    cornString, // cronTime
    // '* * * * *', // dev testing
    async function () {
        console.log("Cron service started at ", dayjs(Date.now()).format("DD:MM:YYYY:h:m:s"));
        const allUsers = await User.find();
        const messages = await Promise.all(allUsers.map(async (user) => {
            if (!user.blocked) {
                const location = `${user?.city},${user?.state},${user?.country}`;
                const weather = await getWeather(location);
                if (weather) {
                    await sendMessage(weatherMessage(user, weather), <String>user?.chatId);
                }
                else {
                    throw Error(JSON.stringify({ "error": "WEATEHR_API_ERROR", "message": "weather is undefined" }));
                }

            }
        }))
    }, // onTick
    null, // onComplete
);

export { messageCRONJob, updateCronString, getCronString };