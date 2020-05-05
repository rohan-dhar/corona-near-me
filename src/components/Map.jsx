import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";

function Map({ position: { latitide: lat, longitude: lng } }) {
	return <GoogleMap defaultCenter={{ lat, lng }}></GoogleMap>;
}

const MapsHoc = withScriptjs(withGoogleMap((props) => <Map {...props} />));

export default MapsHoc;
