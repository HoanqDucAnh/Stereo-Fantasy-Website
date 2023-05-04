import React from "react";
import { loginEndpoint } from "../../spotifyauth";
import "./Login.css";

export default function Login() {
	const handleClick = () => {
		window.location.href = loginEndpoint;
	};

	return (
		<div className="login-page">
			<img
				src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"
				alt="spotify"
				className="spotify-logo"
			/>
			<button className="login-btn" onClick={handleClick}>
				Login to spotify
			</button>
		</div>
	);
}
