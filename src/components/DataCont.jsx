import React, { useEffect } from "react";
import useLocation from "../hooks/useLocation";
import LocationCont from "./LocationCont";
import useGeocode from "../hooks/useGeocode";
import Error from "./Error";
import Loader from "./Loader";

import { motion } from "framer-motion";
import animStyles from "./animStyles";

import "../style/data-cont.css";

export default function DataCont() {
	const [posData, setLocation] = useLocation();
	const [geoData, setGeoData] = useGeocode();

	const { isSet: posIsSet, position, error: posError } = posData;

	useEffect(() => {
		setLocation();
	}, []);

	useEffect(() => {
		if (position) {
			setGeoData(position);
		}
	}, [position]);

	return (
		<motion.section className="data-cont" variants={animStyles.dataCont} initial="enter" animate="open" exit="exit">
			{!posIsSet && (
				<div className="data-cont-enable">
					Please allow <b>Location access</b>
					<br />
					to use this app.
				</div>
			)}
			{posError && (
				<Error text={`${posError} This App needs your location to work.`} handleTryAgain={setLocation} />
			)}
			{position && geoData.loading && <Loader text="Getting your location" />}
			{position && geoData.error && (
				<Error
					text={geoData.error}
					handleTryAgain={() => {
						setGeoData(position);
					}}
				/>
			)}
			{position && geoData.res && (
				<>
					<LocationCont position={position} geoData={geoData} type="district" />
					<LocationCont position={position} geoData={geoData} type="state" />
				</>
			)}
		</motion.section>
	);
}
