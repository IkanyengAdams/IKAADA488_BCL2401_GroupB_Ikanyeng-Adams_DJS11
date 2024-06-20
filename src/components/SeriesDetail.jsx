import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const SeriesDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [series, setSeries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState('');

    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/id/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setSeries(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 2000);
    };

    const handleSeasonChange = (e) => {
        setSelectedSeason(e.target.value);
        navigate(`/season/${e.target.value}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const todayDate = new Date().toLocaleDateString();

    return (
        <div className="p-4 w-full text-white">
            <h2 className="text-2xl font-bold mb-4">{series.title}</h2>
            <img src={series.image} alt={series.title} className="w-45 h-80 rounded-md mb-2" />
            <p className="text-lg mb-4">{series.description}</p>
            <p className="text-sm mb-2">Last updated: {todayDate}</p>
            <p className="text-sm mb-4">Genre: {series.genre}</p>
            <div className="mb-4">
                <label htmlFor="season-select" className="block text-lg font-bold mb-2">Select a season:</label>
                <select
                    id="season-select"
                    value={selectedSeason}
                    onChange={handleSeasonChange}
                    className="bg-gray-800 text-white p-2 rounded"
                >
                    <option value="">-- Select a season --</option>
                    {series.seasons.map((season) => (
                        <option key={season.id} value={season.id}>
                            {season.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center">
                <button onClick={handleFavoriteClick} className="text-2xl">
                    <FaHeart className={isFavorite ? 'text-red-500' : 'text-gray-500'} />
                </button>
                {showMessage && (
                    <div className="ml-2 p-2 bg-green-500 text-white rounded-md">
                        Added to favorites
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeriesDetail;
