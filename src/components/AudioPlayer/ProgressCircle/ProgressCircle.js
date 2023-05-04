import React from "react";
import "./ProgressCircle.css";

const Circle = ({ color, size, percentage, strokeWidth }) => {
	const radius = size / 2 - 10;
	const circ = 2 * Math.PI * radius - 20;
	const strokePerc = ((100 - Math.round(percentage)) * circ) / 100;

	return (
		<circle
			r={radius}
			cx="50%"
			cy="50%"
			fill="transparent"
			stroke={strokePerc !== circ ? color : ""}
			strokeWidth={strokeWidth}
			strokeDasharray={circ}
			strokeDashoffset={percentage ? strokePerc : 0}
			strokeLinecap="round"
		></circle>
	);
};

export default function ProgressCircle({
	percentage,
	isPlaying,
	size,
	color,
	image,
}) {
	return (
		<div className="progress-circle">
			<svg width={size} height={size}>
				<g>
					<Circle strokeWidth={"0.4rem"} color="#002b5b" size={size} />
					<Circle
						strokeWidth={"0.6rem"}
						color={color}
						size={size}
						percentage={percentage}
					/>
				</g>
				<defs>
					<clipPath id="circle">
						<circle cx="50%" cy="50%" r={size / 2 - 30} fill="0FFFFFF" />
					</clipPath>
					<clipPath id="innerCircle">
						<circle cx="50%" cy="50%" r={size / 2 - 100} fill="0FFFFFF" />
					</clipPath>
				</defs>
				<image
					className={isPlaying ? "active" : ""}
					x={30}
					y={30}
					width={2 * (size / 2 - 30)}
					height={2 * (size / 2 - 30)}
					href="https://pngimg.com/uploads/vinyl/vinyl_PNG107.png"
					clipPath="url(#circle)"
				/>
				<image
					className={isPlaying ? "active" : ""}
					x={100}
					y={100}
					width={2 * (size / 2 - 100)}
					height={2 * (size / 2 - 100)}
					href={image}
					clipPath="url(#innerCircle)"
				/>
			</svg>
		</div>
	);
}
