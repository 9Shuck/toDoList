import React from "react";
import PropTypes from "prop-types";

const Task = props => {
	return (
		<li onClick={() => props.delete(props.id)}>
			<p>{props.text}</p>
		</li>
	);
};

Task.propTypes = {
	text: PropTypes.string,
	delete: PropTypes.func,
	id: PropTypes.string
};

export default Task;
