import React, { useState, useEffect } from "react";

const Favorites = () => {
  const [favoriteEpisode, setFavoriteEpisode] = useState(null);

  useEffect(() => {
    const storedFavorite = localStorage.getItem("favoriteEpisode");
    if (storedFavorite) {
      setFavoriteEpisode(JSON.parse(storedFavorite));
    }
  }, []);

  if (!favoriteEpisode) {
    return <div className="text-center mt-4">No favorite episode</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Favorite Episode</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-bold mb-2 text-black">{favoriteEpisode.title}</h3>
        <p className="text-sm text-gray-700 mb-2">{favoriteEpisode.description}</p>
        <audio controls className="w-full mb-2">
          <source src={favoriteEpisode.file} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default Favorites;
