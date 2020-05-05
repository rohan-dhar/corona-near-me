import React from "react";
import StateGraph from "./StateGraph";
import { motion } from "framer-motion";
import animStyles from "./animStyles";
import Counts from "./Counts";

export default function StateStatsView({ state, stateData, inSearch = false }) {
	const recent = stateData.slice(-1)[0].stats;

	return (
		<>
			<motion.section
				className="stats-cont-hero"
				variants={animStyles.statsCont}
				initial="enter"
				animate="open"
				exit="exit"
			>
				<motion.h3 variants={animStyles.children}>{inSearch ? "Region: " : "Your state"}</motion.h3>
				<motion.h1 variants={animStyles.children}>{state.toLowerCase()}</motion.h1>
				<motion.h3 variants={animStyles.children} className="stats-cont-hero-space">
					has
				</motion.h3>
				<motion.h2 variants={animStyles.children}>{recent.confirmed} </motion.h2>
				<motion.h3 variants={animStyles.children}>active cases.</motion.h3>
				<Counts infected={recent.confirmed} recovered={recent.recovered} deaths={recent.death} />
			</motion.section>

			{!inSearch && <StateGraph stateData={stateData} state={state} />}
		</>
	);
}
