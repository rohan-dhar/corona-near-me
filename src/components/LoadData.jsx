import React, { useContext } from "react";
import axios from "axios";
import { DISTRICT_URL, STATE_URL } from "../conf";

export default (type, context) => {
	let url = type === "district" ? DISTRICT_URL : STATE_URL;

	const [data, setData] = useContext(context);

	const loadData = () => {
		setData({
			...data,
			loading: true,
			resp: null,
			error: false,
		});
		axios
			.get(url)
			.then((req) => {
				if (req.status !== 200) {
					setData({
						...data,
						loading: false,
						error: "An unknown error occured. Please try again later.",
					});
				} else {
					setData({
						...data,
						resp: req.data,
						loading: false,
					});
				}
			})
			.catch(() => {
				setData({
					...data,
					loading: false,
					error: "You're not connected to the internet. Please get online and try again.",
				});
			});
	};

	return loadData;
};
