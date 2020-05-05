import React, { useState, useEffect } from "react";
import "./style/app.css";
import DataCont from "./components/DataCont";
import Header from "./components/Header";
import SearchCont from "./components/SearchCont";
import Footer from "./components/Footer";

import { AnimatePresence } from "framer-motion";

import useLoad from "./hooks/useLoad";
const allDistrictContext = React.createContext();
const allStateContext = React.createContext();
const stateContext = React.createContext();
const districtContext = React.createContext();

function App() {
	const [state, setState] = useState(false);
	const [district, setDistrict] = useState(false);

	const [districtData, setDistrictData] = useLoad("district");
	const [stateData, setStateData] = useLoad("state");

	useEffect(() => {
		setDistrictData();
		setStateData();
	}, []);

	return (
		<stateContext.Provider value={[state, setState]}>
			<districtContext.Provider value={[district, setDistrict]}>
				<allStateContext.Provider value={[stateData, setStateData]}>
					<allDistrictContext.Provider value={[districtData, setDistrictData]}>
						<Header />
						<AnimatePresence>
							<DataCont />
							<SearchCont />
						</AnimatePresence>
						<Footer />
					</allDistrictContext.Provider>
				</allStateContext.Provider>
			</districtContext.Provider>
		</stateContext.Provider>
	);
}

export default App;
export { allDistrictContext, allStateContext, stateContext, districtContext };
