import React from 'react'
import { easePolyOut } from "d3-ease";
import { Animate } from 'react-move';

let stripesState = [
    {
        id:1457557,
        background: '#98c5e9',
        left: 120,
        rotate: 25,
        top: -260,
        delay:0
    },
    {
        id:457888,
        background:'#fff',
        left: 360,
        rotate: 25,
        top: -394,
        delay:200
    },
    {
        id:456678,
        background:'#98c5e9',
        left: 600,
        rotate: 25,
        top: -498,
        delay:400
    },
]


const Stripes = () => {
    
    const handleShowStripe = () => (
        stripesState.map((stripe) =>
        (
            <Animate key={stripe.id} show={true}
                start={{
                    background:'#fff',
                    left: 0,
                    rotate: 0,
                    opacity: 0,
                    top: 0
                }}
                enter={{
                    background:`${stripe.background}`,
                    opacity: [1],
                    left: [stripe.left],
                    rotate: [stripe.rotate],
                    top: [stripe.top],
                    timing: {
                        duration: 200,
                        delay: stripe.delay,
                        ease: easePolyOut
                    }
                }}>
                {
                    ({ opacity, left, rotate, top, background }) => (
                        <div className='stripe'
                            style={{
                        background,
                        opacity,
                        transform:`rotate(${rotate}deg) translate(${left}px,${top}px)`
                    }}></div>
                )

                }
            </Animate>
        ))
    )
  return (
      <div className='featured_stripes'>
          {handleShowStripe()}
      </div>
  )
}

export default Stripes