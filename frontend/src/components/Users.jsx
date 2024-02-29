import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Button, Checkbox } from "@mui/material";
import { blockUser, deleteUser, getAllUsers } from "../apis/admin";
import dayjs from "dayjs";

// "allUsers": [
//     {
//       "_id": "65def2de5fe2c74adb3d1407",
//       "chatId": "2121172550",
//       "username": "saksham1968",
//       "name": "Saksham Chhimwal",
//       "city": "Dharwad",
//       "state": "Karnataka",
//       "country": "India",
//       "joined": 1709109982930,
//       "__v": 0,
//       "blocked": true
//     }
//   ]

function Users(props) {
	const [userRows, setUserRows] = useState([]);
	const setAllUsers = useCallback(async () => {
		const res = await getAllUsers();
		setUserRows(res);
	}, []);
	useEffect(() => {
		let mount = true;
		if (mount) {
			setAllUsers();
		}
		return () => {
			mount = false;
		};
	}, []);
	const deleteHandler = useCallback(async (chatId) => {
		const res = await deleteUser(chatId);
		setUserRows((userRows) => {
			return userRows.filter((ele) => {
				return ele.chatId != chatId;
			});
		});
	}, []);
	const blockHandler = useCallback(async (chatId, blocked) => {
		setUserRows((userRows) => {
			return userRows.map((ele) => {
				if (ele.chatId === chatId) {
					return {
						...ele,
						blocked,
					};
				} else {
					return ele;
				}
			});
		});
		const res = await blockUser(chatId, blocked);
	}, []);
	// // Faker
	// const userRows = [];
	// for (let i = 0; i < 100; i++) {
	// 	userRows.push({
	// 		id: i,
	// 		username: faker.string.alphanumeric(10),
	// 		fullname: faker.person.fullName(),
	// 		city: faker.location.city(),
	// 		state: faker.location.state(),
	// 		country: faker.location.country(),
	// 		joined: faker.date.anytime(),
	// 		blocked: faker.datatype.boolean(),
	// 	});
	// }
	const columns = [
		{
			field: "username",
			renderHeader: (params) => (
				<b style={{ margin: "auto" }}>Username</b>
			),
			width: 200,
		},
		{
			field: "name",
			renderHeader: (params) => <b>Full Name</b>,
			width: 200,
		},
		{ field: "city", renderHeader: (params) => <b>City</b>, width: 200 },
		{ field: "state", renderHeader: (params) => <b>State</b>, width: 200 },
		{
			field: "country",
			renderHeader: (params) => <b>Country</b>,
			width: 150,
		},
		{
			field: "joined",
			renderHeader: (params) => <b>Joined</b>,
			renderCell: (params) => {
				return dayjs(params.rows?.joined).format("DD/MM/YYYY");
			},
			width: 200,
		},
		{
			field: "blocked",
			renderHeader: (params) => <b>Blocked</b>,
			width: 100,
			renderCell: (params) => {
				return (
					<Checkbox
						checked={params.row?.blocked}
						onChange={(e) => {
							blockHandler(params.row?.chatId, e.target.checked);
						}}
					/>
				);
			},
		},
		{
			field: "chatId",
			renderHeader: (params) => <b>Delete</b>,
			width: 100,
			renderCell: (params) => {
				return (
					<Button
						onClick={() => {
							deleteHandler(params.row?.chatId);
						}}
					>
						<GridDeleteIcon />
					</Button>
				);
			},
		},
	];
	return (
		<Container
			maxWidth="xl"
			sx={{
				margin: "auto",
				padding:"10px 10px"
			}}
		>
			<Typography
				variant="h3"
				component="p"
				sx={{
					margin: "auto",
				}}
				gutterBottom
				textAlign="center"
			>
				User Details
			</Typography>
			{userRows && (
				<DataGrid
					rows={userRows}
					columns={columns}
					sx={{
						width: "90vw",
						margin: "auto",
						minHeight: "40vh",
					}}
					initialState={{
						pagination: { paginationModel: { pageSize: 5 } },
					}}
					pageSizeOptions={[5, 10, 25]}
				/>
			)}
		</Container>
	);
}

export default Users;
