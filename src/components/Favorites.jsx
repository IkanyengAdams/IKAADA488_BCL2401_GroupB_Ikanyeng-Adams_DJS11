/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const Favorites = () => {
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const [sortOption, setSortOption] = useState("recent");

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoriteEpisodesData = storedFavorites.map((id) => {
      return JSON.parse(localStorage.getItem(`favorite-${id}`));
    }).filter(episode => episode != null);
    
    setFavoriteEpisodes(favoriteEpisodesData);
  }, []);

  const sortEpisodes = (episodes, option) => {
    switch (option) {
      case "az":
        return [...episodes].sort((a, b) => a.title.localeCompare(b.title));
      case "za":
        return [...episodes].sort((a, b) => b.title.localeCompare(a.title));
      case "recent":
      default:
        return [...episodes]; // Assuming the episodes are added in chronological order.
    }
  };

  const sortedEpisodes = sortEpisodes(favoriteEpisodes, sortOption);

  if (!favoriteEpisodes.length) {
    return <div className="text-center mt-4">No favorite episodes</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Favorite Episodes</h2>
      <div className="mb-4">
        <button
          onClick={() => setSortOption("az")}
          className={`px-4 py-2 mr-2 ${sortOption === "az" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"} rounded-lg`}
        >
          Sort A-Z
        </button>
        <button
          onClick={() => setSortOption("za")}
          className={`px-4 py-2 mr-2 ${sortOption === "za" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"} rounded-lg`}
        >
          Sort Z-A
        </button>
        <button
          onClick={() => setSortOption("recent")}
          className={`px-4 py-2 ${sortOption === "recent" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"} rounded-lg`}
        >
          Sort by Recently Added
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedEpisodes.map((episode, index) => (
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
