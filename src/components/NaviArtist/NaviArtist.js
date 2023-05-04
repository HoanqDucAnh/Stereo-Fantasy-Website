import React, { useState, useEffect } from "react";
import APIkit from "../../spotifyauth";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./naviArtist.css";

export default function NaviArtist({ artistID }) {
	const [naviArtist, setNaviArtist] = useState([]);
	const [artistAlbum, setArtistAlbum] = useState([]);
	const navigate = useNavigate();
	const showAlbum = (id) => {
		navigate("/player?playlistId=" + id);
	};

	useEffect(() => {
		if (artistID) {
			APIkit.get("artists/" + artistID)
				.then((response) => {
					setNaviArtist(response.data);
				})
				.catch((error) => {
					console.log(error);
				});

			APIkit.get(
				"artists/" +
					artistID +
					"/albums?offset=0&limit=10&include_groups=album,single&market=US&locale=en-US,en;q=0.9"
			)
				.then((response) => {
					setArtistAlbum(response.data.items);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [artistID]);

	return (
		<>
			<div className="overall-container">
				<div className="profile-container">
					<div className="profile-header">
						<p id="profile-name">{naviArtist.name}</p>
						{naviArtist.images?.[0]?.url && (
							<img
								src={naviArtist?.images[0]?.url}
								alt="profile"
								id="profile-img"
							/>
						)}
					</div>
					<div className="profile-body">
						<p id="profile-followers">
							{naviArtist.followers?.total} followers
						</p>
						<p id="profile-genres">
							<strong>Genres:</strong> {naviArtist.genres?.join(", ") + ". "}
						</p>
					</div>
				</div>
				<div className="content-container">
					<div className="content-header">
						<h1 className="content-title">{naviArtist.name}'s Album</h1>
					</div>
					<div className="content-body">
						{artistAlbum.map((item) => (
							<div
								className="content-card"
								key={item.id}
								onClick={() => {
									showAlbum(item.id);
								}}
							>
								<img
									src={item.images[0]?.url}
									alt="playlist"
									className="content-img"
								/>
								<p className="contentCard-title">{item.name}</p>
								<p className="contentCard-subtitle">{item?.album_type}</p>
								<div className="play-btn">
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
			</div>
		</>
	);
}
