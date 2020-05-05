import React from "react";
import { AreaChart, XAxis, YAxis, Tooltip, Area, Label, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import animStyles from "./animStyles";

export default function StateGraph({ state, stateData }) {
	const data = stateData.map((d) => ({ date: d.date, num: d.stats.confirmed }));

	return (
		<motion.div variants={animStyles.children} className="data-cont-graph">
			<ResponsiveContainer width="95%" height="100%">
				<AreaChart
					data={data}
					margin={{
						top: 30,
						left: 10,
						right: 10,
					}}
				>
					<XAxis dataKey="date">
						<Label value="Date" />
					</XAxis>
					<YAxis>
						<Label angle={-90} value="Cases" position="left" />
					</YAxis>
					<Tooltip />
					<defs>
						<linearGradient id="statsColor" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#6298ff" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#6298ff" stopOpacity={0} />
						</linearGradient>
					</defs>
					<Area type="monotone" dataKey="num" stroke="#587eff" fillOpacity={1} fill="url(#statsColor)" />
				</AreaChart>
			</ResponsiveContainer>
		</motion.div>
	);
}
