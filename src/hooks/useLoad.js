import { useState } from "react";
import axios from "axios";

export default (type) => {
	let url = type === "district" ? process.env.REACT_APP_DISTRICT_URL : process.env.REACT_APP_STATE_URL;

	const [loading, setLoading] = useState(true);
	const [resp, setResp] = useState(null);
	const [error, setError] = useState(false);

	const loadData = () => {
		setLoading(true);
		setResp(null);
		setError(false);
		axios
			.get(url)
			.then((req) => {
				if (req.status !== 200) {
					setLoading(false);
					setError("An unknown error occured. Please try again later.");
				} else {
					setLoading(false);
					setResp(req.data);
				}
			})
			.catch(() => {
				setLoading(false);
				setError("You're not connected to the internet. Please get online and try.");
			});
	};

	return [{ loading, resp, error }, loadData];
};
