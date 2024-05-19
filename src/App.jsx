import React, { useState } from 'react';
import './App.css';
import fetchMovies from './components/fetchmovies';
import MovieCard from './components/movieCard';

const genres = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Thriller',
];

function sortbyId(movies) {
    return [...movies].sort((a, b) => a.id - b.id);
}

function sortbyRating(movies) {
    return [...movies].sort((a, b) => b.Rating - a.Rating);
}

function sortbyTitle(movies) {
    return [...movies].sort((a, b) => a.Title.localeCompare(b.Title));
}

function sortbyDirector(movies) {
    return [...movies].sort((a, b) => a.Director.localeCompare(b.Director));
}

function App({ setView, setSelectedId }) {
    const movies = fetchMovies(); // Use custom hook to fetch movies
    const [sortCriteria, setSortCriteria] = useState('id');

    const getSortedMovies = () => {
        switch (sortCriteria) {
            case 'id':
                return sortbyId(movies);
            case 'rating':
                return sortbyRating(movies);
            case 'title':
                return sortbyTitle(movies);
            case 'director':
                return sortbyDirector(movies);
            default:
                return movies;
        }
    };

    const sortedMovies = getSortedMovies();

    const handleSortChange = (criteria) => {
        setSortCriteria(criteria);
    };

    const highestId = movies.length ? Math.max(...movies.map((movie) => movie.id)) : 0;

    return (
        <div className="App p-10">
            <header className="App-header mt-10 grid grid-cols-3">
                <div className='col-1'></div>
                <h1 className='text-center text-3xl font-medium col-1'></h1>
                <div className='col-1 text-right text-lg font-medium'>
                    <select
                        value={sortCriteria}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="border-2 p-2 rounded"
                    >
                        <option value="id">ID</option>
                        <option value="rating">Rating</option>
                        <option value="title">Title</option>
                        <option value="director">Director</option>
                    </select>
                </div>
            </header>
            <div className="movies grid grid-cols-3 gap-4 md:mx-60">
                {sortedMovies.map((movie) => (
                    <MovieCard key={movie.document_id} movie={movie} setView={setView} highestId={highestId} setSelectedId={setSelectedId} />
                ))}
            </div>
        </div>
    );
}

export default App;
