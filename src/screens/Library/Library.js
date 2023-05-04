import React, { useEffect } from "react";
import APIkit from "../../spotifyauth";
import "./Library.css";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Library() {
	const [playlist, setPlaylist] = React.useState([]);

	useEffect(() => {
		APIkit.get("/me/playlists").then((response) => {
			setPlaylist(response.data.items);
		});
	}, []);

	const navigate = useNavigate(); // To navigate to player screen

	const playPlaylist = (id) => {
		navigate("/player", { state: { id: id } });
	};

	return (
		<>
			<div className="screen-container">
				<div className="library-body">
					{playlist?.map((item) => (
						<div
							className="playlist-card"
							key={item.id}
							onClick={() => playPlaylist(item.id)}
						>
							<img
								src={item.images[0]?.url}
								alt="playlist"
								className="playlist-img"
							/>
							<p className="playlist-title">{item.name}</p>
							<p className="playlist-subtitle">{item.tracks?.total} Songs</p>
							<div className="playlist-btn">
								<IconContext.Provider
									value={{ color: "#EA5455", size: "50px" }}
								>
									<AiFillPlayCircle />
								</IconContext.Provider>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
