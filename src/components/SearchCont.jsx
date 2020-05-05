import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import animStyles from "./animStyles";
import { allStateContext, allDistrictContext } from "../App";
import StateStatsView from "./StateStatsView";
import Error from "./Error";

import "../style/search-cont.css";

export default function SearchCont() {
	const bufferTime = 300;

	const [states] = useContext(allStateContext);
	const [districts] = useContext(allDistrictContext);

	const [searchText, setSearchText] = useState("");
	const [timeoutId, setTimeoutId] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);

	function search(s) {
		s = s.replace(/\s/g, "").toUpperCase();
		if (!s) {
			setSelectedItem(null);
			return;
		}

		for (const state of districts.resp) {
			for (const dist of state.districtData) {
				if (dist.district.replace(/\s/g, "").toUpperCase().substring(0, s.length) === s) {
					setSelectedItem({
						name: dist.district,
						death: dist.deceased,
						recovered: dist.deceased,
						confirmed: dist.confirmed,
					});
					return;
				}
			}
		}

		const lastStates = states.resp.data.slice(-1)[0].regional;
		for (const state of lastStates) {
			if (state.loc.replace(/\s/g, "").toUpperCase().substring(0, s.length) === s) {
				setSelectedItem({
					name: state.loc,
					death: state.deaths,
					recovered: state.discharged,
					confirmed: state.totalConfirmed,
				});
				return;
			}
		}
		setSelectedItem(false);
	}

	function handleChange(e) {
		const val = e.target.value;
		setSearchText(val);
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
		}
		setTimeoutId(
			setTimeout(() => {
				search(val);
			}, bufferTime)
		);
	}

	if (!states.resp || !districts.resp) {
		return null;
	}

	return (
		<motion.section
			className="search-cont"
			variants={animStyles.heightGrow}
			intial="enter"
			animate="open"
			exit="exit"
		>
			<div className="search-cont-inp">
				<motion.h1 variants={animStyles.children}>Search for a Location</motion.h1>
				<motion.h3 variants={animStyles.children}>
					Start typing below to see statistics for any region in India.
				</motion.h3>
				<input
					type="text"
					className="inp"
					value={searchText}
					onChange={handleChange}
					placeholder="Type here..."
				/>
			</div>
			{selectedItem !== null && selectedItem !== false && (
				<motion.div className="stats-cont" variants={animStyles.heightGrow}>
					<StateStatsView
						inSearch
						state={selectedItem.name}
						stateData={[
							{
								stats: {
									recovered: selectedItem.recovered,
									death: selectedItem.death,
									confirmed: selectedItem.confirmed,
								},
							},
						]}
					/>
				</motion.div>
			)}
			{selectedItem === false && <Error text="No results found." />}
		</motion.section>
	);
}
