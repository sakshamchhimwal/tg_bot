import axios from "axios";
import { BACKEND_URL } from "../constants";
export const getAllUsers = async () => {
	try {
		const res = await axios.get(`${BACKEND_URL}admin/user`);
		return res.data.allUsers.map((ele) => {
			return { ...ele, id: ele._id };
		});
	} catch (err) {
		return null;
	}
};

export const blockUser = async (chatId, blocked) => {
	try {
		console.log({ chatId, blocked });
		const res = await axios.patch(`${BACKEND_URL}admin/user`, {
			chatId,
			blocked,
		});
		return res.data;
	} catch (err) {
		return null;
	}
};

export const deleteUser = async (chatId) => {
	try {
		const res = await axios.delete(`${BACKEND_URL}admin/user`, {
			data: {
				chatId,
			},
		});
		return res.data;
	} catch (err) {
		return null;
	}
};

export const getCron = async () => {
	try {
		const res = await axios.get(`${BACKEND_URL}admin/cron`);
		return res.data.cron;
	} catch (err) {
		return null;
	}
};

export const setCron = async (newCron) => {
	try {
		const res = await axios.post(`${BACKEND_URL}admin/cron`, {
			newCron,
		});
		return res.data;
	} catch (err) {
		return null;
	}
};
