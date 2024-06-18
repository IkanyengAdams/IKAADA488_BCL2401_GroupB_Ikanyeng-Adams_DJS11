import React, { useState, useEffect } from 'react';

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        
        <div className="p-4 w-full">
            <h2 className="text-2xl font-bold mb-4">Podcasts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {podcasts.map((podcast) => (
                    <div key={podcast.id} className="bg-white rounded-lg shadow-md p-4">
                        <img src={podcast.image} alt={podcast.title} className="w-full h-32 object-cover rounded-md" />
                        <h3 className="mt-2 text-lg font-bold">{podcast.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PodcastList;
