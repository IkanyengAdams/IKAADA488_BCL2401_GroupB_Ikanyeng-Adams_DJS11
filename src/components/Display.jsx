import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import DisplayHome from './DisplayHome';

const Display = () => {
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

    return (
        <div className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
          <Routes>
                <Route path="/" element={<DisplayHome />} />
            </Routes>
            <div className="p-4 w-full">
                <h2 className="text-2xl font-bold mb-4">Podcasts you might like...</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error: {error.message}</div>
                    ) : (
                        podcasts.map((podcast) => (
                            <div key={podcast.id} className="bg-white rounded-lg shadow-md p-4">
                                <img src={podcast.image} alt={podcast.title} className="w-full h-32 object-cover rounded-md" />
                                <h3 className="mt-2 text-lg font-bold">{podcast.title}</h3>
                            </div>
                        ))
                    )}
                </div>
            </div>
            </div>
    );
};

export default Display;
