import React, { useState, useEffect } from "react";
import "./Widgets.css";
import apiClient from "../../spotifyauth";
import WidgetsCard from "./WidgetsCard/WidgetsCard";

export default function Widgets({ artistID }) {
	const [similar, setSimilar] = useState([]);
	const [feature, setFeature] = useState([]);
	const [newRelease, setNewRelease] = useState([]);

	useEffect(() => {
		apiClient
			.get(`artists/${artistID}/related-artists`)
			.then((response) => {
				const artists = response.data?.artists?.slice(0, 3);
				setSimilar(artists);
			})
			.catch((error) => {
				console.log("related artists error: " + error);
			});

		apiClient
			.get(`browse/featured-playlists?country=US&limit=3`)
			.then((response) => {
				const featuredPlaylists = response.data?.playlists?.items;
				setFeature(featuredPlaylists);
			})
			.catch((error) => {
				console.log("featured error: " + error);
			});

		apiClient
			.get(`browse/new-releases?country=US&limit=3`)
			.then((response) => {
				const newReleases = response.data?.albums?.items;
				setNewRelease(newReleases);
			})
			.catch((error) => {
				console.log("set new release error: " + error);
			});
	}, [artistID]);

	return (
		<div className="widgets-body">
			<WidgetsCard title="Similar artist" similar={similar} />
			<WidgetsCard title="Made for you" feature={feature} />
			<WidgetsCard title="New releases" newRelase={newRelease} />
		</div>
	);
}
