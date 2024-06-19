import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import SeriesDetail from './SeriesDetail'; 
import PodcastList from './PodcastList'; 

const Display = () => {
    return (
        <div className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
            <Routes>
                <Route path="/" element={<DisplayHome />} />
                <Route path="/series/:id" element={<SeriesDetail />} />
                <Route path="/podcasts" element={<PodcastList />} />
            </Routes>
        </div>
    );
};

export default Display;
