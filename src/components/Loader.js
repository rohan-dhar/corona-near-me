import React from "react";
import "../style/loader.css";

export default function Loader({ text = "Loading" }) {
	return (
		<div className="loader">
			<div className="loader-circle loader-circle-outer">
				<div className="loader-circle loader-circle-inner" />
			</div>
			{text && <div className="loader-text">{text}</div>}
		</div>
	);
}
