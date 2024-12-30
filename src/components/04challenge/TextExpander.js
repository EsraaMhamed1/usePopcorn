import React, { useState } from 'react';

function TextExpender({
	collapsedNumWords = 10,
	expandButtonText = 'show more',
	collapseButtonText = 'show less',
	buttonColor,
	buttonInline,
	className,
	children,
	expanded = false,
}) {
	const [isExpanded, setIsExpanded] = useState(expanded);
	const displayText = isExpanded
		? children
		: children.split(' ').slice(0, collapsedNumWords).join(' ') + '...';

	function handeExpanded() {
		setIsExpanded(!isExpanded);
	}

	const btnStayle = {
		backgroundColor: 'none',
		border: 'none',
		borderRadius: '15px',
		padding: '5px 10px',
		cursor: 'pointer',
		color: buttonColor || 'black',
		display: buttonInline || 'inline-block',
	};
	return (
		<div className={className}>
			<span>{displayText}</span>
			<button style={btnStayle} onClick={handeExpanded}>
				{isExpanded ? collapseButtonText : expandButtonText}
			</button>
		</div>
	);
}

export default TextExpender;
