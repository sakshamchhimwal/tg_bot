import { UserDetails } from "../interfaces/userInterface";
import { User } from "../models/user";

export const getAllUsers = async () => {
    try {
        const allUsers = await User.find();
        if(allUsers){
            return allUsers;
        }else{
            return null;
        }
    }catch(err){
        console.log(err);
        throw err;
    }
}

export const findUser = async (chatId: String) => {
    try {
        const user = await User.findOne({ chatId });
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const addUser = async (userDetails: UserDetails) => {
    try {
        const user = await User.create(userDetails);
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const deleteUser = async (chatId: String) => {
    try {
        const user = await User.findOneAndDelete({ chatId });
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}
