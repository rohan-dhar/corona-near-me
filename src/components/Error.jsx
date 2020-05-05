import React from "react";
import "../style/error.css";
import error from "../img/error.png";

export default function Error({ text = "An error occured.", handleTryAgain = false }) {
	return (
		<div className="error">
			<img src={error} alt="Exclamation Mark" />
			<h3>Whoops</h3>
			<p>{text}</p>
			{handleTryAgain && (
				<button className="btn btn-light" onClick={handleTryAgain}>
					Try Again
				</button>
			)}
		</div>
	);
}
