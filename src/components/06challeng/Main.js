import { useState } from 'react';
import useGeoLocation from './useGeoLocation';

function Main() {
	const [countClicks, setCountClick] = useState(0);
	const {
		isLoading,
		error,
		position: { lat, lng },
		getPosition,
	} = useGeoLocation();

	function handelClick() {
		setCountClick((count) => count + 1);
		getPosition();
	}
	return (
		<div>
			<button onClick={handelClick} disabled={isLoading}>
				Get my position
			</button>
			{isLoading && <p>Loading position...</p>}
			{error && <p>{error}</p>}
			{!isLoading && !error && lat && lng && (
				<p>
					Yuor GPS position:
					<a
						target='_blank'
						rel='noreferrer'
						href={`https://www.openstreetmap.org/#map=5/${lat}/${lng}`}
					>
						{lat}, {lng}
					</a>
				</p>
			)}

			<p>You requeste position {countClicks} times</p>
		</div>
	);
}

export default Main;
