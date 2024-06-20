import React from 'react';
import { Route, Routes } from 'react-router-dom';
//import Navbar from './Navbar';
//import DisplayHome from './DisplayHome';
import SeriesDetail from './SeriesDetail'; 
import PodcastList from './PodcastList'; 
import Favorites from './Favorites';
import SeasonDetail from './SeasonDetail';

const Display = () => {
    return (
        <div className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
            { /*<Navbar />*/ }
            <Routes>
                
                <Route path="/series/:id" element={<SeriesDetail />} />
                <Route path="/season/:id" element={<SeasonDetail />} />
                <Route path="/podcasts" element={<PodcastList />} />
                <Route path="/favorites" element={<Favorites />} /> 
                
            </Routes>
        </div>
    );
};

export default Display;
