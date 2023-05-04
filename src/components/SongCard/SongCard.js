import React from "react";
import "./SongCard.css";
import AlbumImage from "./AlbumImage/AlbumImage";
import AlbumInfo from "./AlbumInfo/AlbumInfo";

export default function Song({ album }) {
	return (
		<div className="songcard-body">
			<AlbumImage url={album?.images[0]?.url} />
			<AlbumInfo album={album} />
		</div>
	);
}
