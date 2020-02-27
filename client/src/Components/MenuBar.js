import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AuthContext } from "../Utilities/Auth";

const MenuBar = () => {
	const { admin, logOut } = useContext(AuthContext);
	const pathname = window.location.pathname;
	const path = pathname === "/" ? "home" : pathname.substr(1);
	const [activeItem, setActive] = useState(path);
	const handleItemClick = (e, { name }) => setActive(name);
	const menuBar = admin ? (
		<Menu pointing secondary size="massive" color="teal">
			<Menu.Item name={`Hello ${admin.username}`} as={Link} to="/" />

			<Menu.Menu position="right">
				<Menu.Item
					name="Enroll a Student"
					active={activeItem === "register"}
					onClick={handleItemClick}
					as={Link}
					to="/register"
				/>

				<Menu.Item name="logOut" onClick={logOut} />
			</Menu.Menu>
		</Menu>
	) : (
		<Menu pointing secondary size="massive" color="teal">
			<Menu.Item
				name="Iris Attendance"
				active={activeItem === "home"}
				onClick={handleItemClick}
				as={Link}
				to="/"
			/>
			<Menu.Menu position="right">
				<Menu.Item
					name="login"
					active={activeItem === "login"}
					onClick={handleItemClick}
					as={Link}
					to="/login"
				/>
			</Menu.Menu>
		</Menu>
	);

	return menuBar;
};
export default MenuBar;
