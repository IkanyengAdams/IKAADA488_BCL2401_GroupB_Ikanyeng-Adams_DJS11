import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Episodes = () => {
  const { showId, seasonIndex } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);

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

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (!episodes.length)
    return <div className="text-center mt-4">No episodes available</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Episodes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {episodes.map((episode) => (
          <div key={episode.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold mb-2">{episode.title}</h3>
            <p className="text-sm text-gray-700 mb-2">{episode.description}</p>
            <audio controls className="w-full mb-2" onPlay={handlePlay}>
              <source src={episode.file} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Episodes;
