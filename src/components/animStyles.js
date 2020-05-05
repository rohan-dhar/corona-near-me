const animStyles = {
	dataCont: {
		enter: {
			opacity: 0,
			y: -200,
			scale: 0.8,
		},
		open: {
			opacity: 1,
			y: 0,
			scale: 1,
		},
		exit: {
			opacity: 0,
			y: 200,
			scale: 0.8,
		},
	},
	statsCont: {
		enter: {
			opacity: 0,
			y: -200,
			scale: 0.8,
		},
		open: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
		exit: {
			opacity: 0,
			y: 200,
			scale: 0.8,
		},
	},
	children: {
		enter: {
			opacity: 0,
			y: 30,
			scale: 0.85,
		},
		open: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.4,
			},
		},
		exit: {
			opacity: 0,
			y: -40,
		},
	},
	heightGrow: {
		enter: {
			opacity: 0,
			scaleY: 0,
		},
		open: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.4,
			},
		},
		exit: {
			opacity: 0,
			scaleY: 0,
		},
	},
};

export default animStyles;
