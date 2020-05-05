import React from "react";
import recoveredImg from "../img/recovered.svg";
import deathImg from "../img/death.svg";
import infectedImg from "../img/infected.svg";
import "../style/counts.css";

export default function Counts({ infected, recovered, deaths }) {
	return (
		<div className="stats-cont-counts">
			<div className="stats-cont-count stats-cont-count-infected">
				<img src={infectedImg} alt="Infected" />
				<h3>{infected}</h3>
				<h4>Infected</h4>
			</div>
			<div className="stats-cont-count stats-cont-count-recovered">
				<div className="stats-cont-count stats-cont-count-recovered">
					<img src={recoveredImg} alt="Recovered" />
					<h3>{recovered}</h3>
					<h4>Recovered</h4>
				</div>
			</div>
			<div className="stats-cont-count stats-cont-count-death">
				<div className="stats-cont-count stats-cont-count-death">
					<img src={deathImg} alt="death" />
					<h3>{deaths}</h3>
					<h4>Deaths</h4>
				</div>
			</div>
		</div>
	);
}
