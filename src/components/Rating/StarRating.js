import { useState } from 'react';
import propTyps from 'prop-types';
import styles from './starRating.module.css';
import Star from './Star';

StarRating.propTyps = {
	maxRating: propTyps.number,
};
function StarRating({
	maxRating = 5,
	color = 'gold',
	size = 40,
	className = '',
	message = [],
	defaultRating = 0,
	onSetRating,
}) {
	const [rating, setRating] = useState(defaultRating);
	const [hover, setHover] = useState(0);

	function handelRating(rating) {
		setRating(rating);
		onSetRating(rating);
	}
	function handelHover(hover) {
		setHover(hover);
	}
	function handelMouseOut() {
		setHover(null);
	}
	return (
		<div className={styles.containerStyle}>
			<div className={styles.starContainerStyle}>
				{Array.from({ length: maxRating }, (_, i) => (
					<Star
						key={i}
						onRating={() => handelRating(i + 1)}
						onMouseHover={() => handelHover(i + 1)}
						onMouseOut={handelMouseOut}
						color={color}
						size={size}
						className={className}
						full={hover ? hover >= i + 1 : rating >= i + 1}
					/>
				))}
			</div>
			<p className={styles.textSyle}>
				{message.length === maxRating
					? message[hover ? hover - 1 : rating - 1]
					: hover || rating || ''}
			</p>
		</div>
	);
}

export default StarRating;
