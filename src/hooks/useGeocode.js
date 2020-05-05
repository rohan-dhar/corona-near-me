import { useState } from "react";
import { GEOCODE_URL as url, GEOCODE_KEY as key } from "../conf.js";
import axios from "axios";

export default function useGeocode() {
	const [loading, setLoading] = useState(true);
	const [res, setRes] = useState(null);
	const [error, setError] = useState(false);

	async function getData(pos) {
		const {
			coords: { latitude: lat, longitude: lng },
		} = pos;
		setLoading(true);
		setError(false);
		setRes(null);
		axios
			.get(url, {
				params: {
					key,
					latlng: `${lat}, ${lng}`,
				},
			})
			.then((resp) => {
				setLoading(false);
				if (resp.status != 200) {
					setLoading(false);
					setError("An unknown error occured.");
				} else {
					if (resp.data.results) {
						setLoading(false);
						setRes(resp.data.results);
					} else {
						setLoading(false);
						setError("An unknown error occured.");
					}
				}
			})
			.catch((err) => {
				setLoading(false);
				setError("Could not connect to the internet. Get online and try again later.");
			});
	}

	const data = { loading, res, error };
	return [data, getData];
}
