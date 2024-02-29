import { ThemeProvider } from "@emotion/react";
import NavBar from "./components/Navbar";
import Users from "./components/Users";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
import Schedule from "./components/Schedule";
import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<NavBar />
			<div className="bg" style={{
				paddingTop:"90px"
			}}>
				<Routes>
					<Route path="/" element={<Users />} />
					<Route path="/schedule" element={<Schedule />} />
				</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;
