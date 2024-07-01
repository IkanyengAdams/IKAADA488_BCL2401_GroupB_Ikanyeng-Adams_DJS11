import React, { useState, useEffect } from "react";

const Favorites = () => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoriteEpisodesData = storedFavorites.map((id) => {
      return JSON.parse(localStorage.getItem(`favorite-${id}`));
    }).filter(episode => episode != null);
    setFavoriteEpisodes(favoriteEpisodesData);
  }, []);

  if (!favoriteEpisodes.length) {
    return <div className="text-center mt-4">No favorite episodes</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Favorite Episodes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favoriteEpisodes.map((episode, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold mb-2 text-black">{episode.title}</h3>
            <p className="text-sm text-gray-700 mb-2">{episode.description}</p>
            <audio controls className="w-full mb-2">
              <source src={episode.file} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
