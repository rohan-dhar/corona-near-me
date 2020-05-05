import { useState } from "react";

export default function useLocation() {
	const [isSet, setIsSet] = useState(false);
	const [error, setError] = useState(false);
	const [position, setPosition] = useState(null);

	const setLocation = () => {
		setIsSet(false);
		setError(false);
		setPosition(null);

		if (!navigator.geolocation) {
			setIsSet(true);
			setError("Your browser does not support GeoLocations! Try using a modern browser.");
		} else {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setIsSet(true);
					setPosition(position);
				},
				(e) => {
					setIsSet(true);
					if (e.code === e.PERMISSION_DENIED) {
						setError("You declined location access. Please allow access to continue.");
					} else {
						setError("Could not determine location. Try again later.");
					}
				},
				{ timeout: 5000 }
			);
		}
	};

	return [{ isSet, position, error }, setLocation];
}
