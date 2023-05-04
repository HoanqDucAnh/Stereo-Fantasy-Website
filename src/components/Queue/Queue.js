import React from "react";
import "./Queue.css";

export default function Queue({ tracks, setCurrentIndex }) {
	return (
		<>
			<div className="queue-container">
				<div className="queue">
					<p className="upNext">Up Next</p>
					<div className="queue-list">
						{tracks.map((track, index) => (
							<>
								<div className="queue-item">
									<p
										className="track-name"
										onClick={() => setCurrentIndex(index)}
									>
										{track?.track?.name}
									</p>
									<p>0:30</p>
								</div>
							</>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
