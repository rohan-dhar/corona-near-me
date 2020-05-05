import React from "react";
import DistrictMap from "./DistrictMap";
import { motion } from "framer-motion";
import animStyles from "./animStyles";
import Counts from "./Counts";

export default function DistrictStatsView({ district: { dist: district, position } }) {
	return (
		<>
			<motion.section
				className="stats-cont-hero"
				variants={animStyles.statsCont}
				initial="enter"
				animate="open"
				exit="exit"
			>
				<motion.h3 variants={animStyles.children}>You are in</motion.h3>
				<motion.h1 variants={animStyles.children}>{district.district}</motion.h1>
				<motion.h3 variants={animStyles.children} className="stats-cont-hero-space">
					with
				</motion.h3>
				<motion.h2 variants={animStyles.children}>{district.active} </motion.h2>
				<motion.h3 variants={animStyles.children}>active cases near you.</motion.h3>
				<Counts infected={district.active} recovered={district.recovered} deaths={district.deceased} />
			</motion.section>

			<DistrictMap position={position} />
		</>
	);
}
