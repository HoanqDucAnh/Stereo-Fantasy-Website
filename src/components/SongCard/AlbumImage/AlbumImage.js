import React from "react";
import "./AlbumImage.css";

export default function AlbumImage({ url }) {
	return (
		<div>
			<div className="albumImage-body">
				<img src={url} alt="album" className="albumImage-picture" />
				<div className="albumImage-overlay">
					<img src={url} alt="overlay" className="albumImage-overlay" />
				</div>
			</div>
		</div>
	);
}
