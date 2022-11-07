import React from 'react'
import {Tag} from '../../Utils/tools'
import Blocks from './Blocks';

const MatchesHome = () => {
  return (
      <div className='home_matches_wrapper'>
          <div className='container'>
              <Tag bck="#0e1731" size="50px" color="#fff" add={{ fontFamily: "Roboto" }}>Matches</Tag>
             <Blocks/>
              <Tag bck="#fff" size="22px" color="#0e1731" link={true} linkTo="/the_team" add={{ fontFamily: "Roboto" }}>Matches</Tag>
          </div>
    </div>
  )
}

export default MatchesHome