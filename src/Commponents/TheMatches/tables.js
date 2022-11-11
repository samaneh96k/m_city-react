import React, { useEffect, useState } from 'react';
import { Table ,TableBody,TableCell,TableHead,TableRow} from '@mui/material';
import { datapositions } from '../../firebase';
import { getDocs } from 'firebase/firestore/lite';


const LeagueTable = () => {
    const [position, setPosition] = useState(null);
    useEffect(() => {
        if (!position) {
            getDocs(datapositions).then(snapshot => {
                const positions = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setPosition(positions)
            })
        }
    }, [position]);
   

    const showTeamPositions = () => (
        position ?
            position.map((pos, i) => (
                <TableRow key={i}>
                    <TableCell>{i+1}</TableCell>
                    <TableCell>{pos.team}</TableCell>
                    <TableCell>{pos.w}</TableCell>
                    <TableCell>{pos.d}</TableCell>
                    <TableCell>{pos.l}</TableCell>
                    <TableCell>{pos.pts}</TableCell>
                 
        </TableRow>
    ))
        : null
    )

  return (
      <div className='league_table_wrapper'>
          <div className='title'>
            LeagueTable
          </div>
          <div>
              <Table>
                  <TableHead>
                  <TableRow>
                      <TableCell>Pos</TableCell>
                      <TableCell>Team</TableCell>
                      <TableCell>W</TableCell>
                      <TableCell>L</TableCell>
                      <TableCell>D</TableCell>
                      <TableCell>Pts</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      
                      {showTeamPositions()}
                  </TableBody>
              </Table>
              
          </div>
    </div>
  )
}

export default LeagueTable