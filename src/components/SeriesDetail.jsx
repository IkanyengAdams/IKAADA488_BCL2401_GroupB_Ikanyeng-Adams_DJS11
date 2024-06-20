import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const SeriesDetail = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSeries(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const fetchSeasonDetails = (seasonId) => {
    fetch(`https://podcast-api.netlify.app/season/${seasonId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSeasonDetails(data);
        setPodcasts(data.episodes);  // Assuming episodes array is available in the season details response
      })
      .catch((error) => {
        console.error("Error fetching season details:", error);
      });
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const handleSeasonChange = (e) => {
    const seasonId = e.target.value;
    setSelectedSeason(seasonId);
    fetchSeasonDetails(seasonId);
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
      <div className="mb-4">
        <label htmlFor="season-select" className="block text-lg font-bold mb-2">
          Select a season:
        </label>
        <select
          id="season-select"
          value={selectedSeason}
          onChange={handleSeasonChange}
          className="bg-gray-800 text-white p-2 rounded"
        >
          <option key="" value="">
            -- Select a season --
          </option>
          {series.seasons.map((season) => (
            <option key={season.id} value={season.id}>
              {season.title}
            </option>
          ))}
        </select>
      </div>
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
            onClick={() => fetchSeasonDetails(season.id)}
          >
            <img
              src={season.image}
              alt={season.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-black">{season.title}</h3>
              <p className="text-sm text-gray-700">{season.description}</p>
            </div>
          </div>
        ))}
      </div>

      {seasonDetails && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Season Details</h3>
          <p>{seasonDetails.description}</p>
          <h4 className="text-lg font-bold mt-4">Episodes:</h4>
          <ul className="list-disc list-inside mt-2">
            {podcasts.map((podcast) => (
              <li key={podcast.id} className="mb-2">
                <p className="font-bold">{podcast.title}</p>
                <p className="text-sm">{podcast.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SeriesDetail;
