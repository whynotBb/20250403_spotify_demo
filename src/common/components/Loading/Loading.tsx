import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
	return (
		<div className="sweet-loading">
			<BeatLoader color={"#000000"} size={15} loading={true} aria-label="Loading Spinner" data-testid="loader" />
		</div>
	);
};

export default Loading;
