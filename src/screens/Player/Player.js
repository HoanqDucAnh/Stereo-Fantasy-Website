import React, { useEffect, useState } from "react";
import "./Player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotifyauth";
import SongCard from "../../components/SongCard/SongCard";
import Queue from "../../components/Queue/Queue";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import Widgets from "../../components/Widgets/Widgets";
import { useParams } from "react-router-dom";

export default function Player() {
	const [tracks, setTracks] = useState([]);
	const [currentTrack, setCurrentTrack] = useState({});
	const [currentIndex, setCurrentIndex] = useState(0);
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const playlistId = searchParams.get("playlistId");

	useEffect(() => {
		apiClient
			.get("/playlists/" + playlistId + "/tracks")
			.then((response) => {
				setTracks(response.data.items);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [playlistId]);

	useEffect(() => {
		setCurrentTrack(tracks[currentIndex]?.track);
	}, [currentIndex, tracks]);

	return (
		<>
			<div className="local-screen-container">
				<div className="left-player-body">
					<AudioPlayer
						currentTrack={currentTrack}
						setCurrentIndex={setCurrentIndex}
						total={tracks}
						currentIndex={currentIndex}
					/>
					<Widgets artistID={currentTrack?.album?.artists[0]?.id} />
				</div>
				<div className="right-player-body">
					<SongCard album={currentTrack?.album} />
					<Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
				</div>
			</div>
		</>
	);
}
