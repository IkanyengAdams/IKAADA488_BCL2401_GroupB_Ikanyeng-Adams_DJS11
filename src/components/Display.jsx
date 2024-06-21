import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PodcastList from './PodcastList'; 
import Favorites from './Favorites';
import SeriesDetail from './SeriesDetail'; 
import SeasonDetail from './SeasonDetail';

const Display = () => {
    return (
        <div className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
            <Routes>
                <Route path="/podcasts" element={<PodcastList />} />
                <Route path="/favorites" element={<Favorites />} /> 
                <Route path="/series/:id" element={<SeriesDetail />} />
                <Route path="/season/:seasonId/episodes" element={<SeasonDetail />} />
            </Routes>
        </div>
    );
};

export default Display;
