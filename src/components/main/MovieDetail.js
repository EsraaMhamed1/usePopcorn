import { useState, useEffect } from 'react';
import Loader from '../Loader';
import StarRating from '../Rating/StarRating';
import { useKey } from '../../hooks/useKey';

const KEY = 'c0f3dde3';

export function MovieDetail({
	selectedId,
	onCloseMovie,
	onAddWatched,
	watched,
}) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState('');

	const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
	const watchedUserRating = watched.find(
		(movie) => movie.imdbID === selectedId
	)?.userRating;

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Genre: genre,
		Director: director,
	} = movie;

	useEffect(
		function () {
			setIsLoading(true);
			async function fetchMovieDetails() {
				const res = await fetch(
					`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
				);

				const data = await res.json();
				setMovie(data);
				setIsLoading(false);
			}

			fetchMovieDetails();
		},
		[selectedId]
	);

	// top rating
	// const isTop = imdbRating > 7;
	// console.log(isTop);

	// const [avgRating, setAvgRating] = useState(0);

	function handelAdd() {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			userRating,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split('').at(0)),
		};
		onAddWatched(newWatchedMovie);
		onCloseMovie();
		// setAvgRating(Number(imdbRating));
		// setAvgRating((avgRating) => (avgRating + userRating) / 2);
	}

	// custom hook
	useKey('Escape', onCloseMovie);

	// meta data || title
	useEffect(
		function () {
			if (!title) return;
			document.title = `${title}`;

			return function () {
				document.title = 'usePopcorn';
			};
		},
		[title]
	);

	return (
		<div className='details'>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className='btn-back' onClick={onCloseMovie}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of ${movie}`} />
						<div className='details-overview'>
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐</span>
								{imdbRating} IMDb rating
							</p>
						</div>
					</header>
					{/* <p>{avgRating}</p> */}
					<section>
						<div className='rating'>
							{!isWatched ? (
								<>
									<StarRating
										maxRating={10}
										size={24}
										onSetRating={setUserRating}
									/>
									{userRating > 0 && (
										<button className='btn-add' onClick={handelAdd}>
											Add to list
										</button>
									)}
								</>
							) : (
								<p>
									You rated this movie {watchedUserRating} <span>⭐</span>
								</p>
							)}
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>String {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
		</div>
	);
}
