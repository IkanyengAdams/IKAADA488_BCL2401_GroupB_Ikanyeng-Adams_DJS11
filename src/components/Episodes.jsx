import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Episodes = () => {
  const { showId, seasonIndex } = useParams();
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [favorite, setFavorite] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${showId}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching episodes: ${response.statusText}`);
        }
        const data = await response.json();
        const seasonEpisodes = data.seasons[seasonIndex - 1]?.episodes || [];
        setEpisodes(seasonEpisodes);
      } catch (error) {
        console.error("Error fetching episodes data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [showId, seasonIndex]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorite(storedFavorites);
  }, []);

  const handlePlay = (event) => {
    if (currentAudio && currentAudio !== event.target) {
      currentAudio.pause();
    }
    setCurrentAudio(event.target);
  };

  const handleBackClick = () => {
    navigate(`/series/${showId}`);
  };

  const favoriteUniqueId = (episodeId) => {
    const getSeasonId = seasonIndex ? `-${seasonIndex}` : "";
    const getEpisodeId = episodeId ? `-${episodeId}` : "";
    return `${showId}${getSeasonId}${getEpisodeId}`;
  };

  const handleFavoriteClick = (episode) => {
    const uniqueId = favoriteUniqueId(episode.episode);
    const favoriteAction = favorite.includes(uniqueId) ? "remove" : "add";

    let updatedFavorites;
    if (favoriteAction === "add") {
      setMessage("Added to favorites");
      updatedFavorites = [...favorite, uniqueId];
    } else {
      setMessage("Removed from favorites");
      updatedFavorites = favorite.filter((id) => id !== uniqueId);
    }

    setFavorite(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Save the episode details in local storage
    localStorage.setItem(
      `favorite-${uniqueId}`,
      JSON.stringify({
        title: episode.title,
        description: episode.description,
        file: episode.file,
      })
    );

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (!episodes.length)
    return <div className="text-center mt-4">No episodes available</div>;

  return (
    <div className="p-4">
      <button
        onClick={handleBackClick}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Back to Series
      </button>
      <h2 className="text-2xl font-bold mb-4">Episodes</h2>
      {message && (
        <div className="text-center mb-4 p-2 bg-green-500 text-white rounded-lg">
          {message}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {episodes.map((episode) => (
          <div
            key={episode.episode}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <h3 className="text-lg font-bold mb-2 text-black">
              {episode.title}
            </h3>
            <p className="text-sm text-gray-700 mb-2">{episode.description}</p>
            <audio controls className="w-full mb-2" onPlay={handlePlay}>
              <source src={episode.file} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <button
              onClick={() => handleFavoriteClick(episode)}
              className="text-2xl"
            >
              <FaHeart
                className={
                  favorite.includes(favoriteUniqueId(episode.episode))
                    ? "text-red-500"
                    : "text-gray-500"
                }
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Episodes;
