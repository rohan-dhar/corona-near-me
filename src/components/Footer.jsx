import React from "react";
import "../style/footer.css";
import github from "../img/github.png";

export default function Footer() {
	return (
		<footer>
			<h3>Stay Home, Stay Safe.</h3>
			<div className="footer-links">
				<h4>Important Links</h4>
				<a href="https://www.mohfw.gov.in/">India Ministry of Health and Family Welfare</a> <br />
				<a href="https://www.who.int/health-topics/coronavirus">World Health Organization - Corona Virus</a>
			</div>

			<p className="footer-github">
				<a href="https://github.com" target="_blank" rel="noopener noreferrer">
					Feel free to collaborate on Github
					<img src={github} alt="Github Logo" />
				</a>
			</p>

			<p className="footer-copy">&copy; Rohan Dhar | 2020</p>
		</footer>
	);
}
