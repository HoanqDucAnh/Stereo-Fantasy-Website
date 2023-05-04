import React, { useState, useEffect } from "react";
import "./FollowingArtist.css";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import APIkit from "../../spotifyauth";
import { useLocation } from "react-router-dom";

export default function FollowingArtist() {
	const [following, setFollowing] = useState([]);
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const artistId = searchParams.get("artistId");

	const showArtist = (id) => {
		navigate("/feed?artistId=" + id);
	};

	useEffect(() => {
		APIkit.get("me/following?type=artist")
			.then((response) => {
				setFollowing(response.data.artists.items);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	var container = "";
	useEffect(() => {
		if (following.length < 6) {
			container = "trending-container height100%";
		} else {
			container = "trending-container";
		}
	}, [following]);

	return (
		<div className="trending-container">
			<div className="trending-header">
				<h1 className="trending-title">Following Artists</h1>
			</div>
			<div className="trending-body">
				{following.map((item) => (
					<div
						className="trending-card"
						key={item.id}
						onClick={() => {
							showArtist(item.id);
						}}
					>
						<img
							src={item.images[0].url}
							alt="playlist"
							className="trending-img"
						/>
						<p className="trendingCard-title">{item.name}</p>
						<p className="trendingCard-subtitle">
							{item.tracks?.total} Song(s)
						</p>
						<div className="play-btn">
							<IconContext.Provider value={{ color: "#EA5455", size: "50px" }}>
								<AiFillPlayCircle />
							</IconContext.Provider>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
