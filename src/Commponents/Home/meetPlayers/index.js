import React from 'react'
import { Fade } from "react-awesome-reveal";
import { Tag } from '../../Utils/tools';
import HomeCards from './cards';
let tagDefult = {
    bck: "#0e1731",
    size: "100px",
    color:"#fff"
}
const MeetPlayers = () => {
    const showTextTag = (text) => (
        <Tag {...tagDefult} add={{display:"inline-block",marginBottom:'20px'}}>
{text}
        </Tag>
    )
        
    
  return (
      <Fade triggerOnce>
          <div className='home_meetplayers'>
              <div className='container'>
                  <div className='home_meetplayers_wrapper'>
                      <div className='home_card_wrapper'>
                       <HomeCards/>
                      </div>
                      <div className='home_text_wrapper'>
                          <div>
                              {showTextTag('Meet')}
                          </div>
                          <div>
                          {showTextTag('The')}
                          </div>
                          <div>
                          {showTextTag('Players')}
                          </div>
                          <Tag bck="#fff" size="27px" color="#0e1731" link={true} linkTo="/the_team" add={{display:"inline-block",marginBottom:'20px', border:'1px solid #0e1731'}}>Meet Them here</Tag>
                      </div>
                  </div>
              </div>
          </div>
    </Fade>
  )
}

export default MeetPlayers