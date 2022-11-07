import React from 'react'
import Featuerd from './featuerd/index';
import MatchesHome from './matches';
import MeetPlayers from './meetPlayers';

const Home = () => {
  return (
    <div className='bck_blue'>
      <Featuerd />
      <MatchesHome />
      <MeetPlayers/>
    </div>
  )
}

export default Home