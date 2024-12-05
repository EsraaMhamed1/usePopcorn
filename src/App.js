import { useEffect, useState, useRef } from 'react';
import StarRating from './StarRating';
import { useMovies } from './useMovies';
import { useLocalStorageState } from './useLocalStorageState';
import { useKey } from './useKey';
// const tempMovieData = [
// 	{
// 		imdbID: 'tt1375666',
// 		Title: 'Inception',
// 		Year: '2010',
// 		Poster:
// 			'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
// 	},
// 	{
// 		imdbID: 'tt0133093',
// 		Title: 'The Matrix',
// 		Year: '1999',
// 		Poster:
// 			'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
// 	},
// 	{
// 		imdbID: 'tt6751668',
// 		Title: 'Parasite',
// 		Year: '2019',
// 		Poster:
// 			'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
// 	},
// ];

// const tempWatchedData = [
// 	{
// 		imdbID: 'tt1375666',
// 		Title: 'Inception',
// 		Year: '2010',
// 		Poster:
// 			'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
// 		runtime: 148,
// 		imdbRating: 8.8,
// 		userRating: 10,
// 	},
// 	{
// 		imdbID: 'tt0088763',
// 		Title: 'Back to the Future',
// 		Year: '1985',
// 		Poster:
// 			'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
// 		runtime: 116,
// 		imdbRating: 8.5,
// 		userRating: 9,
// 	},
// ];

const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = 'c0f3dde3';
export default function App() {
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState(null);

	const { movies, isLoading, error } = useMovies(query);
	const [watched, setWatched] = useLocalStorageState([], 'watched');

	// const TempQuery = 'interstellar';

	// useEffect(function () {
	// 	console.log('مرة واحدة بعد اول مرة ريندر');
	// }, []);
	// useEffect(
	// 	function () {
	// 		console.log('D');
	// 	},
	// 	[query]
	// );
	// useEffect(function () {
	// 	console.log('بعد كل ريندر');
	// });

	// console.log('اثناء الريندر');

	const handelSelectMovie = (id) => {
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	};

	const handelCloseMovie = () => {
		setSelectedId(null);
	};

	const handelAddWatched = (movie) => {
		setWatched((watched) => [...watched, movie]);
	};

	const handelDeleteWatchedMovie = (id) => {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	};

	return (
		<>
			<NavBar>
				<Search query={query} setQuery={setQuery} />
				<NumResult movies={movies} />
			</NavBar>
			<Main>
				<Box>
					{/* {
						isLoading ? <Loader /> : <MovieList movies={movies} />
					} */}

					{!isLoading && !error && (
						<MovieList movies={movies} onSelectMovie={handelSelectMovie} />
					)}
					{error && <ErrorMessage message={error} />}
					{isLoading && <Loader />}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDatails
							selectedId={selectedId}
							onCloseMovie={handelCloseMovie}
							onAddWatched={handelAddWatched}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMovieList
								watched={watched}
								onDeleteWatched={handelDeleteWatchedMovie}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

const Loader = () => {
	return <p className='loader'>loading..</p>;
};

const ErrorMessage = ({ message }) => {
	return (
		<p className='error'>
			<span>⛔{message}</span>
		</p>
	);
};
const NavBar = ({ children }) => {
	return (
		<nav className='nav-bar'>
			<Logo />
			{children}
		</nav>
	);
};

const Logo = () => {
	return (
		<div className='logo'>
			<span role='img'>🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
};

const Search = ({ query, setQuery }) => {
	const inputEl = useRef(null);
	useKey('Enter', function () {
		if (document.activeElement === inputEl.current) return;
		inputEl.current.focus();
		setQuery('');
	});

	return (
		<input
			className='search'
			type='text'
			placeholder='Search movies...'
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={inputEl}
		/>
	);
};

const NumResult = ({ movies }) => {
	return (
		<p className='num-results'>
			Found <strong>{movies.length}</strong> results
		</p>
	);
};

const Main = ({ children }) => {
	return <main className='main'>{children}</main>;
};

const Box = ({ children }) => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className='box'>
			<button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
				{isOpen ? '–' : '+'}
			</button>
			{isOpen && children}
		</div>
	);
};

const MovieList = ({ movies, onSelectMovie }) => {
	return (
		<ul className='list list-movies'>
			{movies?.map((movie) => (
				<Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
			))}
		</ul>
	);
};

const Movie = ({ movie, onSelectMovie }) => {
	return (
		<li onClick={() => onSelectMovie(movie.imdbID)}>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
			</div>
		</li>
	);
};

const MovieDatails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState('');
	const countRef = useRef(0);

	useEffect(
		function () {
			if (userRating) countRef.current += 1;
		},
		[userRating]
	);
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
		plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	const handelAdd = () => {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(' ').at(0)),
			userRating,
			countRatingDecisions: countRef.current,
		};
		onAddWatched(newWatchedMovie);
		onCloseMovie();
	};

	useKey('Escape', onCloseMovie);

	useEffect(
		function () {
			async function getMovieDetails() {
				setIsLoading(true);
				const res =
					await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}
			`);

				const data = await res.json();
				setMovie(data);
				setIsLoading();
			}
			getMovieDetails(false);
		},
		[selectedId]
	);

	useEffect(
		function () {
			if (!title) return;
			document.title = `Movie | ${title}`;

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
					<button className='btn-back' onClick={onCloseMovie}>
						&larr;
					</button>
					<header>
						<img src={poster} alt={`poster of ${movie}`} />
						<div className='details-overview'>
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐</span>
								{imdbRating} ImdbRating
							</p>
						</div>
					</header>
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
											+ Add to list
										</button>
									)}
								</>
							) : (
								<p>
									You rated with movie {watchedUserRating} <span>⭐ </span>
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
};

// const WatchedBox = () => {
// 	const [watched, setWatched] = useState(tempWatchedData);
// 	const [isOpen2, setIsOpen2] = useState(true);

// 	return (
// 		<div className='box'>
// 			<button
// 				className='btn-toggle'
// 				onClick={() => setIsOpen2((open) => !open)}
// 			>
// 				{isOpen2 ? '–' : '+'}
// 			</button>
// 			{isOpen2 && (
// 				<>
// 					<WatchedSummary watched={watched} />

// 					<WatchedMovieList watched={watched} />
// 				</>
// 			)}
// 		</div>
// 	);
// };

const WatchedSummary = ({ watched }) => {
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));
	return (
		<div className='summary'>
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating.toFixed(1)}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating.toFixed(1)}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime.toFixed(1)} min</span>
				</p>
			</div>
		</div>
	);
};

const WatchedMovieList = ({ watched, onDeleteWatched }) => {
	return (
		<ul className='list'>
			{watched.map((movie) => (
				<WatchedMovie
					key={movie.imdbID}
					movie={movie}
					onDeleteWatched={onDeleteWatched}
				/>
			))}
		</ul>
	);
};

const WatchedMovie = ({ movie, onDeleteWatched }) => {
	return (
		<li>
			<img src={movie.poster} alt={`${movie.title} poster`} />
			<h3>{movie.title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>
				<button
					className='btn-delete'
					onClick={() => {
						onDeleteWatched(movie.imdbID);
					}}
				>
					X
				</button>
			</div>
		</li>
	);
};
