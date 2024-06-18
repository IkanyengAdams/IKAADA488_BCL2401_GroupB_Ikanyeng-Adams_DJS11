import React from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
//import PodcastList from './components/PodcastList'
import Display from './components/Display'


const App = () => {
  return (
    <div className='h-screen bg-gray'>
     
      <div className='h-[90%] flex'>
        
      <Sidebar />
      <Display />
      </div>
      <Player />
      <div>
        
      </div>
    </div>
  )
}

export default App
