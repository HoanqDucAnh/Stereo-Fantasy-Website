import React, { useEffect, useState } from "react";
import "./Search.css";
import APIkit from "../../spotifyauth";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";

export default function Search() {
	const [query, setQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const type = "artist,track,playlist";

	function handleSearch(e) {
		e.preventDefault();
		if (query.length > 0) {
			// Call the search API
			APIkit.get(
				"search?" +
					"q=" +
					query +
					"&type=" +
					type +
					"&location=US" +
					"&offset=5" +
					"&limit=10"
			).then((response) => {
				setSearchResults(response.data.playlists.items);
			});
		}
	}
	console.log(searchResults);

	const navigate = useNavigate();
	const playAlubum = (id) => {
		navigate("/player", { state: { id: id } });
	};

	return (
		<>
			<div className="search-screen">
				<form className="search-container" onSubmit={handleSearch}>
					<input
						type="text"
						placeholder="Search for an artist, album or track"
						id="search-input"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button type="submit" id="search-button">
						Search
					</button>
				</form>
				<p className="song-header">
					Album you've searched for related to {query ? `${query}` : " "}:
				</p>
				<div className="search-results">
					{searchResults.map((item) => (
						<div
							className="searchRes-card"
							key={item.id}
							onClick={() => {
								playAlubum(item.id);
								console.log(item.id);
							}}
						>
							<img
								src={item.images[0].url}
								alt="playlist"
								className="searchRes-img"
							/>
							<p className="searchRes-title">{item.name}</p>
							<p className="searchRes-subtitle">{item.tracks.total} Song(s)</p>
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
		</>
	);
}
