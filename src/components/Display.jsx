/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PodcastList from './PodcastList'; 
import Favorites from './Favorites';
import SeriesDetail from './SeriesDetail'; 
import Episodes from './Episodes'; 

const Display = ({ searchQuery }) => {
    return (
        <div className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
            <Routes>
                <Route path="/podcasts" element={<PodcastList searchQuery={searchQuery} />} />
                <Route path="/favorites" element={<Favorites />} /> 
                <Route path="/series/:id" element={<SeriesDetail />} />
                <Route path="/series/:showId/season/:seasonIndex/episodes" element={<Episodes />} />
            </Routes>
        </div>
    );
};

export default Display;
