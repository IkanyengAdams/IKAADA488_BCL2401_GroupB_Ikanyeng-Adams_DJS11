// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const SeriesDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data); // Log the fetched data to verify its structure
        setSeries(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchSeries();
  }, [id]);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const handleSeasonClick = (showid) => {
    navigate(`/season/${showid}/episodes`);
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const todayDate = new Date().toLocaleDateString();

  return (
    <div className="p-4 w-full text-white">
      <h2 className="text-2xl font-bold mb-4">{series.title}</h2>
      <img
        src={series.image}
        alt={series.title}
        className="w-45 h-80 rounded-md mb-2"
      />
      <p className="text-lg mb-4">{series.description}</p>
      <p className="text-sm mb-2">Last updated: {todayDate}</p>
      <p className="text-sm mb-4">Genre: {series.genre}</p>
      <div className="flex items-center">
        <button onClick={handleFavoriteClick} className="text-2xl">
          <FaHeart className={isFavorite ? "text-red-500" : "text-gray-500"} />
        </button>
        {showMessage && (
          <div className="ml-2 p-2 bg-green-500 text-white rounded-md">
            Added to favorites
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {series.seasons.map((season) => (
          <div
            key={season.id}
            className="bg-white rounded-md shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleSeasonClick(season.id)} // Pass season.id to handleSeasonClick
          >
            <img
              src={season.image}
              alt={season.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-black">
                {season.title}
              </h3>
              <p className="text-sm text-gray-700">{season.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriesDetail;
