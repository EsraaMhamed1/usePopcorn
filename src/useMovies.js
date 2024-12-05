import { useState, useEffect } from 'react';

const KEY = 'c0f3dde3';

export const useMovies = (query) => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	useEffect(
		function () {
			// callback?.();
			const controllr = new AbortController();
			async function fetchMovies() {
				try {
					setIsLoading(true);
					setError('');
					const res = await fetch(
						`http://www.omdbapi.com/?apikey=${KEY}&s=${query} 
			                 `,
						{ signal: controllr.signal }
					);

					if (!res.ok) throw new Error('Failed to fetch data');

					const data = await res.json();
					if (data.Response === 'False') throw new Error('Movie not found');

					setMovies(data.Search);
				} catch (err) {
					if (err.name !== 'AbortError') {
						setError(err.message);
					}
				} finally {
					setIsLoading(false);
				}
			}

			if (query.length < 3) {
				setMovies([]);
				setError('');
				return;
			}

			fetchMovies();

			return function () {
				controllr.abort();
			};
		},
		[query]
	);

	return { movies, isLoading, error };
};
