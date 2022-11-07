import React from 'react'
import Featuerd from './featuerd/index';
import MatchesHome from './matches';
import MeetPlayers from './meetPlayers';
import Promotion from './poromtion/index';

const Home = () => {
  return (
    <div className='bck_blue'>
      <Featuerd />
      <MatchesHome />
      <MeetPlayers />
      <Promotion/>
    </div>
  )
}

export default Home