import React from "react";
import fetchMovies, { addReview } from "./fetchmovies";

const AddApp = ({ setView }) => {
    const movies = fetchMovies(); // Fetch movies from API
    var highestId = Math.max(...movies.map((movie) => movie.id)); // Find the highest id in the movies array
    if (isNaN(highestId) || highestId < 0 || highestId === Infinity) {
        // If highestId is NaN, set it to 0
        highestId = 0;
    }

    const [title, setTitle] = React.useState("");
    const [rating, setRating] = React.useState(1);
    const [genre, setGenre] = React.useState("");
    const [director, setDirector] = React.useState("");
    const [year, setYear] = React.useState("2024");
    const [month, setMonth] = React.useState("1");
    const [day, setDay] = React.useState("1");

    function handleTitleChange (event) {
        setTitle(event.target.value);
    };

    function handleRatingChange (event){
        setRating(parseInt(event.target.value));
    };

    function handleGenreChange (event){
        setGenre(event.target.value);
    };

    function handleDirectorChange (event) {
        setDirector(event.target.value);
    };

    function handleYearChange (event){
        setYear(event.target.value);
    };

    function handleMonthChange (event){
        setMonth(event.target.value);
    };

    function handleDayChange (event)  {
        setDay(event.target.value);
    };

    const handleAddClick = () => {
        addReview({
            id: highestId + 1,
            title: title,
            rating: rating,
            genre: genre,
            director: director,
            year: year,
            month: month,
            day: day
        });

        //clear the form
        setTitle("");
        setRating(1);
        setGenre("");
        setDirector("");
        setYear("");
        setMonth("");
        setDay("");

        //wait for 0.5 second before redirecting to the main page
        setTimeout(() => {
            setView("main");
        }, 500);
    };

    return (
        <>
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold mt-[80px] ">Add a Review</h1>
            <div className="mt-10 border-[1px] addcontainer w-[500px] h-[600px] shadow-md rounded-md flex flex-col gap-8 justify-start p-10 ">
                <div className="title  flex flex-row w-full gap-2">
                    <h1 className="text-xl font-base"> Title: </h1>
                    <input type="text" value={title} onChange={handleTitleChange} className="w-[90%] px-2 py-1 border-[1px] border-gray-500 text-gray-700 rounded-md" required />
                </div>
                <div className="rating flex flex-row w-full gap-2">
                    <h1 className="text-xl font-base">Rating: </h1>
                    <select value={rating} onChange={handleRatingChange} className="w-[15%] px-2 py-1 border-[1px] border-gray-500 text-gray-700 rounded-md" required>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </select>
                </div>
                <div className="genre flex flex-row w-full gap-2">
                    <h1 className="text-xl font-base">Genre: </h1>
                    <input type="text" value={genre} onChange={handleGenreChange} className="w-[90%] px-2 py-1 border-[1px] border-gray-500 text-gray-700 rounded-md" required />
                </div>
                <div className="director flex flex-row w-full gap-2">
                    <h1 className="text-xl font-base">Director: </h1>
                    <input type="text" value={director} onChange={handleDirectorChange} className="w-[90%] px-2 py-1 border-[1px] border-gray-500 text-gray-700 rounded-md" required />
                </div>
                <div className="date flex flex-row w-full gap-2">
                    <h1 className="text-xl font-base">Date: </h1>
                    <select value={year} onChange={handleYearChange} className="w-[20%] px-2 py-1 border-[1px] border-gray-500 text-gray-700 rounded-md" required>
                        {[...Array(50).keys()].map((value) => (
                            <option key={value} value={2024 - value}>{2024 - value}</option>
                        ))}
                    </select>
                    <select value={month} onChange={handleMonthChange} className="w-[15%] px-2 py-1 border-[1px] border-gray-500 text-gray-700 rounded-md" required>
                        {[...Array(12).keys()].map((value) => (
                            <option key={value + 1} value={value + 1}>{value + 1}</option>
                        ))}
                    </select>
                    <select value={day} onChange={handleDayChange} className="w-[15%] px-2 py-1 border-[1px] border-gray-500 text-gray-700 rounded-md" required>
                        {[...Array(31).keys()].map((value) => (
                            <option key={value + 1} value={value + 1}>{value + 1}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleAddClick}
                    className="w-full py-2 hover:border-[2px] hover:bg-white hover:border-blue-500 hover:text-blue-500 bg-blue-500 text-white rounded-md" >
                Add</button>
            </div>
        </div>
        </>
    );
}

export default AddApp;
