import React from "react";
import "./WidgetEntry.css";

export default function WidgetEntry({ title, subtitle, image }) {
	return (
		<div className="widgetEntry-body">
			<img src={image} alt={title} className="widgetEntry-img" />
			<div className="widgetEntry-text">
				<p className="widgetEntry-title ">{title}</p>
				<p className="widgetEntry-subtitle">{subtitle}</p>
			</div>
		</div>
	);
}
