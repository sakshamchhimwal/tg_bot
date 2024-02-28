import { TelegramMessage } from "../interfaces/telegramInterface";
import { UserDetails } from "../interfaces/userInterface";
import { sendMessage } from "../services/messageService";
import { getWeather } from "../services/weatherService";
import { addUser, findUser } from "../utils/database"
import { errorMessage, weatherMessage } from "../utils/messageFormatter";

export const handleEvent = async (event: TelegramMessage) => {
    const from = event.message.from;
    const chat = event.message.chat;
    const text = event.message.text;
    if (text.charAt(0) === '/') {
        if (text.substring(1) === "start") {
            const user = await findUser(chat.id.toString());
            if (user) {
                sendMessage(`Welcode ${user.name}`, user.chatId);
            } else {
                await sendMessage(errorMessage("Please register yourself"), chat.id.toString());
            }
        }
        else if (text.split(" ")[0].substring(1) === "register") {
            const data = text.split(" ");
            if (data.length != 2) {
                await sendMessage(errorMessage("Enter your City, State and Country as /register City,State,Country. Use underscore for spaces"), chat.id.toString());
            }
            if (data.length === 2) {
                const location = data[1].split(',');
                if (location.length !== 3) {
                    await sendMessage(errorMessage("Enter your City, State and Country as /register City,State,Country. Use underscore for spaces"), chat.id.toString());
                } else {
                    const userDetails: UserDetails = {
                        chatId: chat.id.toString(),
                        username: chat.username,
                        name: `${chat.first_name} ${chat.last_name}`,
                        city: location[0].replace('_', ' '),
                        state: location[1].replace('_', ' '),
                        country: location[2].replace('_', ' '),
                        joined: Date.now()
                    }
                    await addUser(userDetails);
                    await sendMessage(`*Welcome ${chat.first_name} ${chat.last_name}!!*`, chat.id.toString());
                }
            }
        }
        else if (text.substring(1) === "weather") {
            const user = await findUser(chat.id.toString());
            if (user) {
                const location = `${user?.city},${user?.state},${user?.country}`;
                const weather = await getWeather(location);
                if (weather) {
                    await sendMessage(weatherMessage(user, weather), <String>user?.chatId);
                } else {
                    throw Error(JSON.stringify({ "error": "WEATEHR_API_ERROR", "message": "weather is undefined" }));
                }
            } else {
                await sendMessage(errorMessage("Please register yourself"), chat.id.toString());
            }
        }
        else {
            await sendMessage(errorMessage("Invalid Command"), chat.id.toString());
        }
    } else {
        await sendMessage(errorMessage("Not a command"), chat.id.toString());
    }
}