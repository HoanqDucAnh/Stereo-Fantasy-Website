import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import APIkit from "../../spotifyauth";
import "../Trending/Trending.css";
import FollowingArtist from "../../components/FollowingArtist/FollowingArtist";
import NaviArtist from "../../components/NaviArtist/NaviArtist";

export default function Feed() {
	const location = useLocation();
	const [naviArtist, setNaviArtist] = useState([]);
	const [locationState, setLocationState] = useState(null);

	useEffect(() => {
		if (location.state) {
			APIkit.get("artists/" + location.state.id)
				.then((response) => {
					setNaviArtist(response.data);
					setLocationState(location.state);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [location.state]);

	return !locationState ? (
		<FollowingArtist />
	) : (
		<NaviArtist artistID={naviArtist.id} />
	);
}
