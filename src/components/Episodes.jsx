import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Episodes = () => {
  const { showId, seasonIndex } = useParams();
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [favorite, setFavorite] = useState(null);
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
        console.log("Fetched episodes data:", data);
        const seasonEpisodes = data.seasons[seasonIndex]?.episodes || [];
        setEpisodes(seasonEpisodes);
      } catch (error) {
        console.error("Error fetching episodes data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [showId, seasonIndex]);

  const handlePlay = (event) => {
    if (currentAudio && currentAudio !== event.target) {
      currentAudio.pause();
    }
    setCurrentAudio(event.target);
  };

  const handleBackClick = () => {
    navigate(`/series/${showId}`);
  };

  const handleFavoriteClick = (episodeId) => {
    setFavorite((prevFavorite) => {
      const newFavorite = prevFavorite === episodeId ? null : episodeId;
      setMessage(newFavorite ? "Added to favorites" : "Removed from favorites");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return newFavorite;
    });
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
          <div key={episode.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold mb-2 text-black">{episode.title}</h3>
            <p className="text-sm text-gray-700 mb-2">{episode.description}</p>
            <audio controls className="w-full mb-2" onPlay={handlePlay}>
              <source src={episode.file} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <button
              onClick={() => handleFavoriteClick(episode.id)}
              className="text-2xl"
            >
              <FaHeart
                className={
                  favorite === episode.id ? "text-red-500" : "text-gray-500"
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
