import React, { useState } from "react";
import { FaTrash, FaStar } from "react-icons/fa";

const CardContainer = ({ movie, setView, setSelectedId }) => {
    return (
        <div className="transition-transform hover:scale-105 rounded-xl shadow-xl border-[1px] border-gray-300 w-[280px] h-[350px] flex flex-col gap-2 items-center justify-center">
            <MovieContent movie={movie} setView={setView} setSelectedId={setSelectedId} />
        </div>
    );
}

const MovieContent = ({ movie, setView, setSelectedId }) => {
    const handleEditClick = () => {
      setSelectedId(movie.document_id);
      setView('edit');
    };

    const handleDeleteClick = () => {
      setSelectedId(movie.document_id);
      setView('delete');
    };

    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    const Month = months[movie.Month - 1];

    return (
        <div className="">
            <div className="moviecontainer">
                <div className="title justify-start flex flex-row w-full gap-2">
                    <h1 className="text-md font-semibold text-left">Title: </h1>
                    <h1>{movie.Title}</h1>
                </div>
                <div className="rating justify-start flex flex-row w-full gap-2">
                    <h1 className="text-md font-semibold">Rating: </h1>
                    <>
                        {spawnStars(movie.Rating)}
                    </>
                </div>
                <div className="genre justify-start flex flex-row w-full gap-2">
                    <h1 className="text-md font-semibold">Genre: </h1>
                    <h1>{movie.Genre}</h1>
                </div>
                <div className="director justify-start flex flex-row w-full gap-2">
                    <h1 className="text-md font-semibold">Director: </h1>
                    <h1>{movie.Director}</h1>
                </div>
                <div className="date justify-start flex flex-row w-full gap-2">
                    <h1 className="text-md font-semibold">Released On </h1>
                    <h1>{movie.Day} {Month} {movie.Year}</h1>
                </div>
            </div>
            <div className="btn flex flex-row gap-5 mt-4">
                <button className="border-[1px] border-black hover:scale-105 transition-transform rounded-md px-2 py-1 text-black-300 hover:bg-red-600 hover:text-white hover:border-0" onClick={handleDeleteClick}>
                    <FaTrash />
                </button>
                <button className="bg-white border-[1px] hover:bg-black hover:text-white hover:scale-105 transition-transform text-black border-2 border-black w-20 rounded-md px-2 py-1" onClick={handleEditClick}>Edit</button>
            </div>
        </div>
    );
};

const spawnStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    if (rating < 5) {
        for (let i = rating; i < 5; i++) {
            stars.push(<FaStar key={i + 5} className="text-gray-300" />);
        }
    }
    return stars;
};

export default CardContainer;
