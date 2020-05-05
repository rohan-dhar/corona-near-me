import React, { useContext, useMemo } from "react";
import { stateContext, allStateContext } from "../App";
import StateStatsView from "./StateStatsView";
import Loader from "./Loader";
import Error from "./Error";

const getState = (state, resp) => {
	if (!state || !resp) {
		return false;
	}

	const allStates = resp.data;
	let stateData = [];

	for (let i = 0; i < allStates.length; i++) {
		const d = allStates[i].regional;
		if (!d) {
			continue;
		}
		for (let j = 0; j < d.length; j++) {
			if (d[j].loc.toUpperCase() === state) {
				const stateStat = {
					date: new Date(allStates[i].day),
					stats: { confirmed: d[j].totalConfirmed, recovered: d[j].discharged, death: d[j].deaths },
				};
				stateData.push(stateStat);
			}
		}
	}

	if (stateData.length < 1) {
		return null;
	} else {
		return stateData;
	}
};

export default function StateeStatsCont({ type }) {
	const [state] = useContext(stateContext);
	const [allState, setStates] = useContext(allStateContext);
	const { resp, loading, error } = allState;

	const stateData = useMemo(() => getState(state, resp), [resp, state]);

	if (loading) {
		return <Loader text="Loading State Statistics" />;
	}
	if (error) {
		return (
			<Error
				text={error}
				handleTryAgain={() => {
					setStates();
				}}
			/>
		);
	}
	if (!stateData) {
		return <div className="data-cont-stat-none"> No data found for your state. </div>;
	}

	return <StateStatsView state={state} stateData={stateData} />;
}
