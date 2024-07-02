/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setPodcasts(sortedData);
        setFilteredPodcasts(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const navigate = useNavigate();

  const handleSeriesClick = (id) => {
    navigate(`/series/${id}`);
  };

  const handleSort = (order) => {
    const sortedPodcasts = [...podcasts].sort((a, b) => {
      if (order === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setPodcasts(sortedPodcasts);
    setFilteredPodcasts(sortedPodcasts);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = podcasts.filter((podcast) =>
      podcast.title.toLowerCase().includes(query)
    );
    setFilteredPodcasts(filtered);
  };

  return (
    <div className="p-4 w-full">
      <Navbar onSort={handleSort} />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search podcasts"
          className="bg-white text-black px-4 py-2 rounded-full w-full mt-3"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <h2 className="text-2xl font-bold mb-4">Podcasts you might like...</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : filteredPodcasts.length === 0 ? (
          <div>No podcasts found</div>
        ) : (
          filteredPodcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="bg-white text-black rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => handleSeriesClick(podcast.id)}
            >
              <img
                src={podcast.image}
                alt={podcast.title}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-bold text-center">{podcast.title}</h3>
              <p className="text-sm text-gray-700 text-center">
                Last updated: {new Date(podcast.updated).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700 text-center">
                Seasons: {podcast.seasons}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PodcastList;
