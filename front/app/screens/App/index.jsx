import React from "react";
import style from "./App.scss";

import Select from "./components/select.jsx";

export default React.createClass({
	displayName: "App",
	render: function() {
		const options = [
			{ value: "option 1", label: "option 1" },
			{ value: "option 2", label: "option 2" },
			{ value: "option 3", label: "option 3" },
			{ value: "option 4", label: "option 4" },
			{ value: "option 5", label: "option 5" },
			{ value: "option 6", label: "option 6" },
			{ value: "option 7", label: "option 7" },
			{ value: "option 8", label: "option 8" }
		];

		return <div className={style.app}>
			<Select options={options} value={false} />
		</div>
	}
})
