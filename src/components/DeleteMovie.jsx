import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteReview, fetchbyId } from "./fetchmovies";

const DeleteMovie = ({ setView, selectedId }) => {
  const id = selectedId;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const fetchedMovie = await fetchbyId(id);
        setMovie(fetchedMovie);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleDeleteClick = () => {
    deleteReview(id);
    // Redirect after delete
    selectedId = null; // Reset selected id
    setView("main"); // Redirect to main view
  };

  const handleCancelClick = () => {
    // Redirect back to main page
    selectedId = null; // Reset selected id
    setView("main"); // Redirect to main view
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>No such document!</div>;
  }

  return (
    <>
    <div className="deleteContainer  px-2 w-auto flex flex-col gap-2 items-center justify-center">
    <h1 className="text-2xl mt-40 font-semibold text-center">Delete Review</h1>
      <h1 className="">Do you want to delete the Review of this movie?</h1>
      <h1>Title: {movie.Title}</h1>
      <div className="flex gap-4">
        <button
          className="rounded-md px-2 py-1 hover:bg-red-600 hover:text-white border-red-600 hover:scale-105 transition-transform bg-white text-red-600 border-2"
          onClick={() => handleDeleteClick()}
        >
          Delete
        </button>
        <button
          className="border-2 rounded-md px-2 py-1 hover:bg-black hover:text-white border-black"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </div>
    </div>
    </>
  );
};

export default DeleteMovie;
