import "../style/header.css";
import React from "react";
import logo from "../img/logo.svg";

export default function Header() {
	return (
		<header>
			<section className="header-logo">
				<img src={logo} alt="Logo" />
				<h3>
					Corona<span>Near</span>Me
				</h3>
			</section>
			<h3 className="header-credits">
				Designed and Developed by
				<br />
				<b>
					<a href="https://rohan-dhar.github.io" target="_blank" rel="noopener noreferrer">
						Rohan Dhar
					</a>
				</b>
			</h3>
		</header>
	);
}
