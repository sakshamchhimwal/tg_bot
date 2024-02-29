import { Button, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";
import { getCron, setCron } from "../apis/admin";
import cronstrue from "cronstrue";
function Schedule() {
	const [cronString, setCronString] = useState("");
	const [cronValue, setCronValue] = useState("");
	const [shadow, setShadow] = useState("");
    const [isInvalid,setIsinvalid] = useState(false)
	const getAndSetCron = useCallback(async () => {
		const res = await getCron();
		setCronString(res);
		setCronValue(cronstrue.toString(res));
	});
	const updateCron = useCallback(async () => {
		const res = setCron(cronString);
	});
	const handleCronChange = (value) => {
		try {
			const res = cronstrue.toString(value);
			setCronValue(res);
            setIsinvalid(false);
		} catch (err) {
			setCronValue("Invalid");
            setIsinvalid(true)
		}
	};
	useEffect(() => {
		let mount = true;
		if (mount) {
			getAndSetCron();
		}
		return () => {
			mount = false;
		};
	}, []);
	return (
		<Container
			maxWidth="xl"
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "90vh",
				flexDirection: "column",
				gap: "20px",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					gap: "20px",
					padding: "20px",
					backdropFilter: "blur(3px)",
					borderRadius: "20px",
                    transition:"0.2s",
                    width:"90vw"
				}}
				className={shadow}
				onMouseEnter={() => setShadow("shadow-box")}
                onMouseLeave={() => setShadow("")}
			>
				<Typography variant="body"sx={{
                    fontFamily: "Pacifico, cursive",
                    fontSize:"xx-large",
                    letterSpacing:"2px",
                }}>{cronValue}</Typography>
				<TextField
					value={cronString}
					onChange={(e) => {
						setCronString(e.target.value);
						handleCronChange(e.target.value);
					}}
                    inputProps={{
                        style:{
                            textAlign:"center",
                            fontSize:"40px"
                        }
                    }}
                    sx={{
                        maxWidth:"80vw"
                    }}
				/>
				<Button
					onClick={() => {
						updateCron();
					}}
					variant="outlined"
                    disabled={isInvalid}
				>
					Change
				</Button>
			</div>
		</Container>
	);
}

export default Schedule;
