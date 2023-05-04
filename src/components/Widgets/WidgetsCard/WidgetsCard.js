import React from "react";
import "./WidgetsCard.css";
import WidgetEntry from "./WidgetEntry/WidgetEntry";
import { IconContext } from "react-icons";
import { HiChevronDoubleRight } from "react-icons/hi";

export default function WidgetsCard({ title, similar, feature, newRelase }) {
	return (
		<div className="widgetcard-body">
			<div className="widgetcard-title">{title}</div>
			{similar
				? similar.map((artist) => (
						<WidgetEntry
							title={artist?.name}
							subtitle={artist?.followers?.total + " followers"}
							image={artist?.images[2]?.url}
						/>
				  ))
				: feature
				? feature.map((playlist) => (
						<WidgetEntry
							title={playlist?.name}
							subtitle={playlist?.tracks?.total + " track(s)"}
							image={playlist?.images[0]?.url}
						/>
				  ))
				: newRelase
				? newRelase.map((album) => (
						<WidgetEntry
							title={album?.name}
							subtitle={album?.artists[0]?.name}
							image={album?.images[2]?.url}
						/>
				  ))
				: null}
			<div className="widget-fade">
				<div className="fade-btn">
					<IconContext.Provider value={{ size: "24px", color: "white" }}>
						<HiChevronDoubleRight />
					</IconContext.Provider>
				</div>
			</div>
		</div>
	);
}
