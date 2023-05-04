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
	const location = useLocation();
	const [tracks, setTracks] = useState([]);
	const [currentTrack, setCurrentTrack] = useState({});
	const [currentIndex, setCurrentIndex] = useState(0);
	const { playlistId } = location.state.id;

	useEffect(() => {
		apiClient
			.get("/playlists/" + location.state.id + "/tracks")
			.then((response) => {
				setTracks(response.data.items);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [location.state.id]);

	useEffect(() => {
		setCurrentTrack(tracks[currentIndex]?.track);
	}, [currentIndex, tracks]);

	return (
		<>
			<div className="local-screen-container">
				<div className="left-player-body">
					<AudioPlayer
						currentTrack={currentTrack}
						// isPlaying={true}
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
