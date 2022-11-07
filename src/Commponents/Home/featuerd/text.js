import React from 'react'
import { easePolyOut } from "d3-ease";
import { Animate } from 'react-move';
import PlayerImg from '../../../Resources/images/featured_player.png'
const Text = () => {
    const animateNumber = () => (
        <Animate show={true}
        start={{
        
            rotate: 0,
            opacity: 0,
           
            }}
            enter={{
                opacity: [1],
                rotate: [360],
               
                timing: {
                    duration: 1000,
                    ease: easePolyOut
                }
            }}>
            {(opacity,rotate) => (
                <div className='featured_number'
                    style={{
                        opacity,
                        transform:`translate(260px,170px) rotateY(${rotate})`
                }}
                >
5
                </div>
            )}
        </Animate>
    )
    const animateFirstText = () => (
        <Animate show={true} start={{
            opacity: 0,
            x: 503, y: 450
        }}
            enter={{
                opacity: [1],
                x: [273],
                y: [450],
                timing: {
                    duration: 500,
                    ease: easePolyOut
                }
}} >
            {
                ({opacity,x,y}) => (<div className='featured_first'
                style={{opacity,transform:`translate(${x}px,${y}px)`}}>
                    League
                </div>)
            }
        </Animate>
    )
    const animateSecondText = () => (
        <Animate show={true} start={{
            opacity: 0,
            x: 503, y: 586
        }}
            enter={{
                opacity: [1],
                x: [273],
                y: [586],
                timing: {
                    duration: 500,
                    ease: easePolyOut,
                    delay:300
                }
}} >
            {
                ({opacity,x,y}) => (<div className='featured_first'
                style={{opacity,transform:`translate(${x}px,${y}px)`}}>
                    Chanmpinonshps
                </div>)
            }
        </Animate>
    )
        
    const animatePlayer = () => (
        <Animate show={true}
            start={{
            opacity:0
            }}
            enter={{
                opacity: [1],
                timing: {
                    duration: 500,
                    ease: easePolyOut,
                    delay:300
                }
        }}>
            {({opacity }) => (
                <div className='featured_player'
                style={{opacity,background:`url(${PlayerImg}) no-repeat` ,transform:`translate(550px,200px)`}}></div>
            )

            }
        </Animate>
    )
        
    
  return (
      <div className="featured_text">
          {animatePlayer()}
          {animateNumber()}
          {animateFirstText()}
          {animateSecondText()}
    </div>
  )
}

export default Text