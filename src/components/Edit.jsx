import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchbyId, updateReview } from "./fetchmovies";

const Edit = ({ setView, selectedId }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(1);
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedId) {
        const fetchedMovie = await fetchbyId(selectedId);
        if (fetchedMovie) {
          setMovie(fetchedMovie);
          setTitle(fetchedMovie.Title || "");
          setRating(fetchedMovie.Rating || 1);
          setGenre(fetchedMovie.Genre || "");
          setDirector(fetchedMovie.Director || "");
          setYear(fetchedMovie.Year || 2024);
          setMonth(fetchedMovie.Month || 1);
          setDay(fetchedMovie.Day || 1);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedId]);

  const handleSaveClick = async () => {
    if (movie) {
      const updatedMovie = {
        Title: title,
        Rating: rating,
        Genre: genre,
        Director: director,
        Year: year,
        Month: month,
        Day: day,
      };
      updateReview(selectedId, updatedMovie);
      setView('main');
    }
  };

  const handleCancelClick = () => {
    setView('main');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>No such document!</div>;
  }

  return (
    <div className="w-full h-full px-8 flex flex-col items-center">
            <h1 className="text-3xl font-semibold mt-10">Edit Movie</h1>
      <div className="editcontainer shadow-xl rounded-md border-[1px] mt-[50px] w-[500px] h-[500px] px-8 py-14 flex flex-col gap-8 items-center justify-start text-base">
        <div className="title justify-start flex flex-row w-full gap-2">
          <h1 className="font-semibold text-xl">Title: </h1>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[90%] border-[1px] border-black px-1 rounded-md text-gray-700"
          />
        </div>
        <div className="rating justify-start items-center flex flex-row w-full gap-2">
          <h1 className="font-semibold text-xl">Rating: </h1>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-[10%] border-[1px] text-xs py-1 w-[20%] border-black px-1 rounded-md text-gray-700"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="genre justify-start flex flex-row w-full gap-2 px-0">
          <h1 className="font-semibold text-xl">Genre: </h1>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-[90%] text-xs border-[1px] border-black px-1 rounded-md text-gray-700"
          />
        </div>
        <div className="director justify-start flex flex-row w-full gap-2">
          <h1 className="font-semibold text-xl">Director: </h1>
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            className="w-[90%] text-xs border-[1px] border-black px-1 rounded-md text-gray-700"
          />
        </div>
        <div className="date justify-start item-center flex flex-row w-full gap-2">
          <h1 className="font-semibold text-xl">Date: </h1>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-[40%] border-[1px] border-black px-1 rounded-md text-xs text-gray-700"
          >
            {[...Array(50).keys()].map((value) => (
              <option key={value} value={2024 - value}>
                {2024 - value}
              </option>
            ))}
          </select>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-[30%] border-[1px] border-black px-1 rounded-md text-xs text-gray-700"
          >
            {[...Array(12).keys()].map((value) => (
              <option key={value + 1} value={value + 1}>
                {value + 1}
              </option>
            ))}
          </select>
          <select
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            className="w-[30%] border-[1px] border-black px-1 rounded-md text-xs text-gray-700"
          >
            {[...Array(31).keys()].map((value) => (
              <option key={value + 1} value={value + 1}>
                {value + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="btn flex flex-row gap-5 mt-4">
          <button
            className="bg-black hover:scale-105 transition-transform text-white w-20 rounded-md px-2 py-1"
            onClick={handleSaveClick}
          >
            Save
          </button>
          <button
            className="bg-white hover:scale-105 transition-transform hover:bg-red-600 hover:text-white hover:border-0 text-black border-[2px] border-black w-20 rounded-md px-2 py-1"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
