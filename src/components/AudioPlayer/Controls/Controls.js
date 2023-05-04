import React from "react";
import "./Controls.css";
import { IconContext } from "react-icons";
import {
	IoPause,
	IoPlay,
	IoPlaySkipBack,
	IoPlaySkipForward,
	IoRepeat,
	IoShuffle,
} from "react-icons/io5";

export default function Controls({
	isPlaying,
	setIsPlaying,
	handleNext,
	handlePrev,
}) {
	const handleShuffle = () => {};

	const handlePlayToggle = () => {
		setIsPlaying(!isPlaying);
	};

	const handleRepeat = () => {};

	return (
		<>
			<IconContext.Provider value={{ size: "35px", color: "#c4d0e3" }}>
				<div className="control-wrapper">
					<div className="control-button" onClick={handleShuffle}>
						<IoShuffle />
					</div>
					<div className="control-button" onClick={handlePrev}>
						<IoPlaySkipBack />
					</div>
					<div
						className={
							isPlaying ? "play-toggle-button active" : "play-toggle-button"
						}
						onClick={handlePlayToggle}
					>
						{isPlaying ? <IoPause /> : <IoPlay />}
					</div>
					<div className="control-button" onClick={handleNext}>
						<IoPlaySkipForward />
					</div>
					<div className="control-button" onClick={handleRepeat}>
						<IoRepeat />
					</div>
				</div>
			</IconContext.Provider>
		</>
	);
}
