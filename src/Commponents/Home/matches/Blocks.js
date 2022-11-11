import React, { useEffect, useState } from 'react'
import {Slide} from "react-awesome-reveal"
import {dataMatches} from '../../../firebase'
import {  getDocs } from 'firebase/firestore/lite';
import MatchesBlock from '../../Utils/matches_blocks';
import { showToastError } from '../../Utils/tools';
const Blocks = () => {
    const [matches, setMatches] = useState([])
  useEffect( () => {
    if (!matches.length > 0) {
      //const docsSnap = getDocs(dataMatches);
      getDocs(dataMatches).then(snapShot => {
        const matches = snapShot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setMatches(matches)
      }).catch(error =>showToastError(error))
    }
  }, [matches]);
  
  const showMatches = (matches) => (
    matches ?
      matches.map((match) => (
        <Slide botton key={match.id} className='item' triggerOnce>
          <div>
            <div className='wrapper'>
              <MatchesBlock match={match} />
            </div>
          </div>
        </Slide>
      )):null
  )
  return (
    <div className='home_matches'>{ showMatches(matches)}</div>
  )
}

export default Blocks