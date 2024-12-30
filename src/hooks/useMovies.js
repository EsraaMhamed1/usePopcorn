import { useEffect, useState } from 'react';

const KEY = 'c0f3dde3';

function useMovies(query) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(
		function () {
			// callBack?.();

			const controller = new AbortController();

			async function fetchMovies() {
				try {
					setIsLoading(true);
					setError('');
					const res = await fetch(
						`https://www.omdbapi.com/?apikey=${KEY}&s=${query} `,
						{ signal: controller.signal }
					);
					if (!res.ok) throw new Error("can't fetch data");
					const data = await res.json();
					if (data.Response === 'False') throw new Error('Movie not found');

					setMovies(data.Search);
					console.log(data.Search);
				} catch (err) {
					console.error(err.message);
					setError(err.message);
				} finally {
					setIsLoading(false);
				}
			}

			if (query.length < 3) {
				setMovies([]);
				setError('');
				return;
			}

			// handelCloseMovie();
			fetchMovies();

			return function () {
				controller.abort();
			};
		},
		[query]
	);
	return { movies, isLoading, error };
}

export { useMovies };
