import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./RecentlyPlayed.css";
import APIkit from "../../spotifyauth";

export default function RecentlyPlayed() {
	const [recentlyPlayed, setRecentlyPlayed] = useState([]);

	useEffect(() => {
		APIkit.get("me/player/recently-played")
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return <div>RecentlyPlayed</div>;
}
