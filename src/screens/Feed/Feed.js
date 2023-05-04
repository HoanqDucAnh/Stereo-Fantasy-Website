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
	const searchParams = new URLSearchParams(location.search);
	const artistId = searchParams.get("artistId");

	useEffect(() => {
		if (artistId) {
			APIkit.get("artists/" + artistId)
				.then((response) => {
					setNaviArtist(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [artistId]);

	return !artistId ? (
		<FollowingArtist />
	) : (
		<NaviArtist artistID={naviArtist.id} />
	);
}
