import React, { useState, useRef, useEffect } from "react";
import "./AudioPlayer.css";
import ProgressCircle from "./ProgressCircle/ProgressCircle";
import Controls from "./Controls/Controls";
import WaveAnimation from "./WaveAnimation/WaveAnimation";

export default function AudioPlayer({
	currentTrack,
	currentIndex,
	setCurrentIndex,
	total,
}) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [trackProgress, setTrackProgress] = useState(0);
	var audioSrc = total[currentIndex]?.track.preview_url;

	const audioRef = useRef(new Audio(total[currentIndex]?.track.preview_url));
	const intervalRef = useRef();
	const isReady = useRef(false);

	const { duration } = audioRef.current;

	const currentPerc = duration ? (trackProgress / duration) * 100 : 0;

	const startTimer = () => {
		// Clear any timers already running
		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			if (audioRef.current.ended) {
				handleNext();
			} else {
				setTrackProgress(audioRef.current.currentTime);
			}
		}, [1000]);
	};

	useEffect(() => {
		if (audioRef.current.src) {
			if (isPlaying) {
				audioRef.current.play();

				startTimer();
			} else {
				clearInterval(intervalRef.current);
				audioRef.current.pause();
			}
		} else {
			if (isPlaying) {
				audioRef.current = new Audio(audioSrc);
				audioRef.current.play();
				startTimer();
			} else {
				clearInterval(intervalRef.current);
				audioRef.current.pause();
			}
		}
	}, [isPlaying]);

	useEffect(() => {
		audioRef.current.pause();
		audioRef.current = new Audio(audioSrc);

		setTrackProgress(audioRef.current.currentTime);

		if (isReady.current) {
			audioRef.current.play();
			// setIsPlaying(true); // This will cause an infinite loop
			startTimer();
		} else {
			isReady.current = true;
		}
	}, [currentIndex]);

	useEffect(() => {
		return () => {
			// Make sure to clear the interval, on unmount
			audioRef.current.pause();
			setIsPlaying(false);
			clearInterval(intervalRef.current);
		};
	}, []);

	const handleNext = () => {
		if (currentIndex < total.length - 1) {
			setCurrentIndex(currentIndex + 1);
		} else {
			setCurrentIndex(0);
		}
	};

	const handlePrev = () => {
		if (currentIndex - 1 < 0) {
			setCurrentIndex(total.length - 1);
		} else {
			setCurrentIndex(currentIndex - 1);
		}
	};

	const addZero = (num) => {
		return num < 10 ? "0" + num : num;
	};

	const artists = [];
	currentTrack?.album?.artists.forEach((artist) => {
		artists.push(artist.name);
	});

	return (
		<div className="audioPlayer-body">
			<div className="audioPlayer-left-body">
				<ProgressCircle
					percentage={currentPerc}
					isPlaying={isPlaying}
					image={currentTrack?.album?.images[0]?.url}
					size={300}
					color="#ea5454c0"
				/>
			</div>
			<div className="audioPlayer-right-body">
				<p className="song-title">{currentTrack?.name}</p>
				<p className="song-artist">{artists?.join(", ")}</p>
				<div className="player-right-bottom">
					<div className="song-duration">
						<p className="duration">0:{addZero(Math.round(trackProgress))}</p>
						<WaveAnimation
							isPlaying={isPlaying}
							currentIndex={currentIndex}
							setCurrentIndex={setCurrentIndex}
						/>
						<p className="duration">0:30</p>
					</div>
					<Controls
						isPlaying={isPlaying}
						setIsPlaying={setIsPlaying}
						handleNext={handleNext}
						handlePrev={handlePrev}
						total={total}
					/>
				</div>
			</div>
		</div>
	);
}
