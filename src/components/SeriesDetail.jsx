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
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setSeries(data);
      } catch (error) {
        setError(error);
      } finally {
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

  const handleSeasonClick = (showId, seasonId, seasonIndex) => {
    navigate(`season/${seasonId}/episodes`);
  };

  const handleBackClick = () => {
    navigate('/podcasts');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const lastUpdatedDate = new Date(series.updated).toLocaleDateString();

  return (
    <div className="p-4 w-full text-white">
      <button
        onClick={handleBackClick}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Back to Podcasts
      </button>
      <h2 className="text-2xl font-bold mb-4">{series.title}</h2>
      <img
        src={series.image}
        alt={series.title}
        className="w-45 h-80 rounded-md mb-2"
      />
      <p className="text-lg mb-4">{series.description}</p>
      <p className="text-sm mb-2">Last updated: {lastUpdatedDate}</p>
      <p className="text-sm mb-4">
        Genre: {series.genres && series.genres.length > 0 ? (
          series.genres.map((genre, index) => (
            <span key={index} className="genre-badge">
              {genre}
              {index < series.genres.length - 1 ? ', ' : ''}
            </span>
          ))
        ) : (
          <span>No genres available</span>
        )}
      </p>
      <div className="flex items-center">
        <button onClick={handleFavoriteClick} className="text-2xl">
          <FaHeart className={isFavorite ? "text-red-500" : "text-gray-500"} />
        </button>
        {showMessage && (
          <div className="ml-2 p-2 bg-green-500 text-white rounded-md">
            {isFavorite ? "Added to favorites" : "Removed from favorites"}
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {series.seasons && series.seasons.length > 0 ? (
          series.seasons.map((season, index) => (
            <div
              key={season.id}
              className="bg-white rounded-md shadow-md overflow-hidden cursor-pointer"
              onClick={() => handleSeasonClick(id, season.season, index)}
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
                <p className="text-sm text-gray-700 mb-2">
                  {season.description}
                </p>
                <p className="text-sm text-gray-700">
                  Episodes: {season.episodes.length}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No seasons available</div>
        )}
      </div>
    </div>
  );
};

export default SeriesDetail;
