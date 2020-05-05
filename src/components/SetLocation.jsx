import { useContext, useMemo, useEffect } from "react";
import { allDistrictContext, stateContext, districtContext } from "../App";
import { token_set_ratio } from "fuzzball";

const getState = (resp, components) => {
	if (!resp) {
		return false;
	}
	for (let i = 0; i < resp.length; i++) {
		const s = resp[i];
		for (let j = 0; j < components.length; j++) {
			if (s.state.toUpperCase() === components[j]) {
				return components[j];
			}
		}
	}
	return null;
};

const getDistrict = (resp, components) => {
	if (!resp) {
		return false;
	}
	for (let i = 0; i < resp.length; i++) {
		const dist = resp[i].districtData;
		for (let j = 0; j < components.length; j++) {
			for (let k = 0; k < dist.length; k++) {
				if (dist[k].district.toUpperCase() === components[j]) {
					return components[j];
				}
			}
		}
	}

	let maxSim = 0,
		maxDist,
		maxDistMap;

	for (let i = 0; i < resp.length; i++) {
		const dist = resp[i].districtData;
		for (let j = 0; j < components.length; j++) {
			for (let k = 0; k < dist.length; k++) {
				const sim = token_set_ratio(dist[k].district.toUpperCase(), components[j], { full_process: false });
				if (sim > maxSim) {
					maxSim = sim;
					maxDist = dist[k].district.toUpperCase();
					maxDistMap = components[j];
				}
			}
		}
	}

	if (maxSim >= 92) {
		return maxDist;
	}

	return null;
};

export default function SetLocation({ addressComponents }) {
	const [data] = useContext(allDistrictContext);
	const { resp } = data;
	const [, setState] = useContext(stateContext);
	const [, setDistrict] = useContext(districtContext);

	const state = useMemo(() => getState(resp, addressComponents), [resp, addressComponents]);
	const district = useMemo(() => getDistrict(resp, addressComponents), [resp, addressComponents]);

	useEffect(() => {
		setState(state);
		setDistrict(district);
	}, [state, district]);

	return null;
}
