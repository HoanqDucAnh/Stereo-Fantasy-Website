import React, { Suspense, useEffect, useState, startTransition } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { setClientToken } from "../../spotifyauth";

//lazy loading
const Library = React.lazy(() => import("../Library/Library"));
const Feed = React.lazy(() => import("../Feed/Feed"));
const Search = React.lazy(() => import("../Search/Search"));
const Player = React.lazy(() => import("../Player/Player"));
const Trending = React.lazy(() => import("../Trending/Trending"));
const Login = React.lazy(() => import("../Login/Login"));

export default function Home() {
	const [token, setToken] = useState(null);
	useEffect(() => {
		const token = window.localStorage.getItem("token");
		const hash = window.location.hash;
		window.location.hash = ""; // To remove the token from the url
		if (hash) {
			const _token = hash.split("&")[0].split("=")[1];
			window.localStorage.setItem("token", _token);
			setToken(_token);
			setClientToken(_token);
		} else {
			setToken(token);
			setClientToken(token);
		}
	}, []);

	function handleSearch() {
		React.startTransition(() => {
			// Your search handling code here
		});
	}

	return !token ? (
		<Login /> // If token is not present, show login page
	) : (
		<Router>
			<div className="main-body">
				<Suspense fallback={<h1>Loading...</h1>}>
					<Sidebar />
					<Routes>
						<Route path="/" element={<Library />} />
						<Route path="/feed" element={<Feed />} />
						<Route path="/feed?:artistId" element={<Feed />} />
						<Route path="/search" element={<Search />} />
						<Route path="/player/" element={<Player />} />
						<Route path="/player?:playlistId" element={<Player />} />
						<Route path="/trending" element={<Trending />} />
					</Routes>
				</Suspense>
			</div>
		</Router>
	);
}
