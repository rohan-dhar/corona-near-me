import React, { useMemo } from "react";
import SetLocation from "./SetLocation";
import StateStatsCont from "./StateStatsCont";
import DistrictStatsCont from "./DistrictStatsCont";

import animStyles from "./animStyles";

import "../style/stats-cont.css";

function LocationCont({ geoData, type, position }) {
	const isViableLocation = (location) => {
		return (
			location.types.indexOf("administrative_area_level_1") !== -1 ||
			location.types.indexOf("administrative_area_level_2") !== -1
		);
	};

	const getAddressComponents = (res) => {
		if (!res) {
			return [];
		}

		console.log(res);

		const components = [];
		for (let i = 0; i < res.length; i++) {
			const address = res[i].address_components;
			if (!address) {
				continue;
			}
			address.forEach((a) => {
				let name = a.long_name.toUpperCase();
				if (components.indexOf(name) === -1 && isViableLocation(a)) {
					if (name === "GURGAON") {
						name = "GURUGRAM";
					}
					components.push(name);
				}
			});
		}
		return components;
	};

	const addressComponents = useMemo(() => getAddressComponents(geoData.res), [geoData.res]);

	return (
		<section className={`stats-cont ${type}-stats-cont`}>
			{type === "district" && (
				<>
					<SetLocation
						addressComponents={addressComponents}
						variants={animStyles}
						initial="enter"
						animate="open"
						exit="exit"
					/>
					<DistrictStatsCont position={position} />
				</>
			)}
			{type === "state" && <StateStatsCont />}
		</section>
	);
}

export default React.memo(LocationCont);
