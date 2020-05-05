import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs, Circle } from "react-google-maps";
import { motion } from "framer-motion";
import animStyles from "./animStyles";

function Maps({
	position: {
		coords: { latitude: lat, longitude: lng },
	},
}) {
	const zoom = 12.2;
	return (
		<GoogleMap
			defaultCenter={{ lat, lng }}
			defaultZoom={zoom}
			options={{ clickableIcons: false, disableDefaultUI: true, tilt: 20 }}
		>
			<Circle
				center={{ lat, lng }}
				radius={4000}
				editable={false}
				draggable={false}
				options={{ strokeWeight: 6, fillColor: "#ff4466", fillOpacity: 0.4, strokeOpacity: 0.1 }}
			/>
		</GoogleMap>
	);
}

const MapsHoc = withScriptjs(withGoogleMap((props) => <Maps {...props} />));

const DistrictMap = (props) => (
	<MapsHoc
		googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GEOCODE_KEY}&v=3.exp&libraries=geometry,drawing`}
		loadingElement={<div className="data-cont-map-load" />}
		containerElement={<motion.div variants={animStyles.children} className="data-cont-map" />}
		mapElement={<div className="data-cont-map-el" style={{ height: `100%`, width: "100%" }} />}
		{...props}
	/>
);

export default DistrictMap;
