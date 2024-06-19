import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PodcastList = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://podcast-api.netlify.app/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setPodcasts(data);
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

    return (
        <div className="p-4 w-full">
            <h2 className="text-2xl font-bold mb-4">Podcasts you might like...</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error.message}</div>
                ) : (
                    podcasts.map((podcast) => (
                        <div
                            key={podcast.id}
                            className="bg-white text-black rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer"
                            onClick={() => handleSeriesClick(podcast.id)}
                        >
                            <img src={podcast.image} alt={podcast.title} className="w-full h-auto rounded-md mb-2" />
                            <h3 className="text-lg font-bold text-center">{podcast.title}</h3>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PodcastList;
