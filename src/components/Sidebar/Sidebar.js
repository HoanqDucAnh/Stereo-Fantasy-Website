import React, { useEffect } from "react";
import "./Sidebar.css";
import SidebarButton from "../SidebarButton/SidebarButton";
import { ImNewspaper } from "react-icons/im";
import { BiTrendingUp } from "react-icons/bi";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { BiLibrary } from "react-icons/bi";
import { GoSignOut } from "react-icons/go";
import apiClient from "../../spotifyauth";

export default function Sidebar() {
	const [image, setImage] = React.useState(
		"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
	);
	useEffect(() => {
		apiClient.get("/me").then((response) => {
			setImage(response.data.images[0].url);
		});
	}, []);

	return (
		<>
			<div className="sidebar-container">
				<img src={image} className="profile-image" alt="profile" />
				<div>
					<SidebarButton title="Feed" to="/feed" icon={<ImNewspaper />} />
					<SidebarButton
						title="Trending"
						to="/trending"
						icon={<BiTrendingUp />}
					/>
					<SidebarButton
						title="Player"
						to="/player"
						icon={<BsFillCollectionPlayFill />}
					/>
					<SidebarButton title="Search" to="/search" icon={<GoSearch />} />
					<SidebarButton title="Library" to="/" icon={<BiLibrary />} />
				</div>
				<SidebarButton title="Signout" to="" icon={<GoSignOut />} />
			</div>
		</>
	);
}
