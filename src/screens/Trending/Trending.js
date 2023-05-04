import React, { useEffect, useState } from "react";
import APIkit from "../../spotifyauth";
import "./Trending.css";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Trending() {
	const [location, setLocation] = React.useState("VN");
	const [playlists, setPlaylists] = useState([]);
	const [trendingArtists, setTrendingArtist] = useState([]);
	const [newRelease, setNewRelease] = useState([]);
	const navigate = useNavigate();

	function handleLocationSelect(e) {
		setLocation(e.target.value);
	}

	const showArtist = (id) => {
		navigate("/feed?artistId=" + id);
	};

	const playTrending = (id) => {
		navigate("/player?playlistId=" + id);
	};

	useEffect(() => {
		APIkit.get(
			"browse/featured-playlists" + "?country=" + location + "&limit=10"
		)
			.then((response) => {
				setPlaylists(response.data.playlists.items);
			})
			.catch((error) => {
				console.log(error);
			});

		APIkit.get("browse/new-releases" + "?country=" + location + "&limit=10")
			.then((response) => {
				setNewRelease(response.data.albums.items);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [location]);

	useEffect(() => {
		APIkit.get("me/top/artists?time_range=medium_term&limit=10")
			.then((response) => {
				setTrendingArtist(response.data.items);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="trending-container">
			<div className="trending-header-container">
				<div className="trending-header">
					Trending now in:
					{location === "US"
						? " United States"
						: location === "GB"
						? " United Kingdom"
						: location === "VN"
						? " Vietnam"
						: " South Korea"}
				</div>
				<select
					name="location"
					id="location-select"
					onChange={handleLocationSelect}
				>
					<option value="US">US</option>
					<option value="GB">UK</option>
					<option value="VN" selected>
						VN
					</option>
					<option value="KR">KR</option>
				</select>
			</div>
			<p id="header">TRENDING PLAYLIST:</p>
			<div className="trending-body">
				{playlists.map((item) => (
					<div
						className="trending-card"
						key={item.id}
						onClick={() => {
							playTrending(item.id);
							console.log(item.id);
						}}
					>
						<img
							src={item.images[0].url}
							alt="playlist"
							className="trending-img"
						/>
						<p className="trendingCard-title">{item.name}</p>
						<p className="trendingCard-subtitle">{item.tracks.total} Song(s)</p>
						<div className="play-btn">
							<IconContext.Provider value={{ color: "#EA5455", size: "50px" }}>
								<AiFillPlayCircle />
							</IconContext.Provider>
						</div>
					</div>
				))}
			</div>
			<p id="header">NEW RELEASES:</p>
			<div className="trending-body">
				{newRelease.map((item) => (
					<div
						className="trending-card"
						key={item.id}
						onClick={() => {
							playTrending(item.id);
						}}
					>
						<img
							src={item.images[0].url}
							alt="playlist"
							className="trending-img"
						/>
						<p className="trendingCard-title">{item.name}</p>
						<p className="trendingCard-subtitle">{item.total_tracks} Song(s)</p>
						<div className="play-btn">
							<IconContext.Provider value={{ color: "#EA5455", size: "50px" }}>
								<AiFillPlayCircle />
							</IconContext.Provider>
						</div>
					</div>
				))}
			</div>
			<p id="header">ARTIST YOU MAY LIKE:</p>
			<div className="trending-body">
				{trendingArtists.map((item) => (
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
							{item.popularity} Worldwide Popular Rating
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
