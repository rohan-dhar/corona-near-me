import React, { useContext, useMemo } from "react";
import { allDistrictContext, districtContext, stateContext } from "../App";
import DistrictStatsView from "./DistrictStatsView";
import Loader from "./Loader";
import Error from "./Error";

const getDist = (state, dist, allDist) => {
	if (!state || !dist || !allDist) {
		return false;
	}
	for (let i = 0; i < allDist.length; i++) {
		if (allDist[i].state.toUpperCase() !== state) {
			continue;
		}
		const d = allDist[i].districtData;
		for (let j = 0; j < d.length; j++) {
			if (d[j].district.toUpperCase() === dist) {
				return d[j];
			}
		}
	}
	return null;
};

export default function DistrictStatsCont({ position }) {
	const [district] = useContext(districtContext);
	const [state] = useContext(stateContext);
	const [allDistricts, setDistricts] = useContext(allDistrictContext);
	const { loading, resp, error } = allDistricts;

	const distData = useMemo(() => getDist(state, district, resp), [state, district, resp]);

	if (loading) {
		return <Loader text="Loading District Statistics" />;
	}
	if (error) {
		return (
			<Error
				text={error}
				handleTryAgain={() => {
					setDistricts();
				}}
			/>
		);
	}

	if (!district) {
		return <Error text="No data found for your district." />;
	}

	if (!distData) {
		return <div className="data-cont-stat-none"> No data found for your district :/ </div>;
	}

	return <DistrictStatsView district={{ dist: distData, position }} />;
}
