import { useEffect, useState } from 'react';
function useLocalStorage(intialState, key) {
	// local storage
	const [value, setValue] = useState(function () {
		const storedValue = localStorage.getItem(key);
		console.log(storedValue);
		return storedValue ? JSON.parse(storedValue) : intialState;
	});

	// update local storage
	useEffect(
		function () {
			localStorage.setItem(key, JSON.stringify(value));
		},
		[value, key]
	);
	return [value, setValue];
}

export { useLocalStorage };
