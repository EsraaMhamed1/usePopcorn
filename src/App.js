import { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Search from './components/navbar/Search';
import NumResult from './components/navbar/NumResult';
import Box from './components/main/Box';
import Main from './components/main/Main';
import MovieList from './components/main/MovieList';
import Summary from './components/main/Summary';
import WatchedMovieList from './components/main/WatchedMovieList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { MovieDetail } from './components/main/MovieDetail';
import { useMovies } from './hooks/useMovies';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState(null);
	const [watched, setWatched] = useLocalStorage([], 'watched');
	const { movies, error, isLoading } = useMovies(query);

	// const query = 'book';

	function handelSelectMovie(id) {
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	}

	function handelCloseMovie() {
		setSelectedId(null);
	}

	function handelAddWathed(movie) {
		setWatched((watched) => [...watched, movie]);

		// localStorage.setItem('watched', JSON.stringify([...watched, movie]));
	}

	function handelDeleteWatchedMovie(id) {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	}

	// local storage
	// useEffect(
	// 	function () {
	// 		localStorage.setItem('watched', JSON.stringify(watched));
	// 	},
	// 	[watched]
	// );

	return (
		<>
			<Navbar movies={movies}>
				<Search query={query} setQuery={setQuery} />
				<NumResult movies={movies} />
			</Navbar>
			<Main>
				<Box>
					{/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
					{isLoading && <Loader />}
					{!isLoading && !error && (
						<MovieList movies={movies} onSelectMovie={handelSelectMovie} />
					)}
					{error && !isLoading && <ErrorMessage message={error} />}
				</Box>

				<Box>
					<>
						{selectedId ? (
							<MovieDetail
								selectedId={selectedId}
								onCloseMovie={handelCloseMovie}
								onAddWatched={handelAddWathed}
								watched={watched}
							/>
						) : (
							<>
								<Summary watched={watched} />
								<WatchedMovieList
									watched={watched}
									onDeleteWatched={handelDeleteWatchedMovie}
								/>
							</>
						)}
					</>
				</Box>
			</Main>
		</>
	);
}
