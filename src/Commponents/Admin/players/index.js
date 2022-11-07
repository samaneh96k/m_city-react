import React, { useEffect, useState } from "react";
import { dataplayers } from "../../../firebase";
import AdminLayout from "./../../../HOC/AdminLayout";
import { getDocs, limit, query, startAfter } from "firebase/firestore/lite";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from "@mui/material";
import { showToastError } from "../../Utils/tools";
import { Link } from "react-router-dom";

const AdminPlayers = () => {
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState(null);
  useEffect(
    () => {
      if (!players) {
        setLoading(true);
        getDocs(query(dataplayers, limit(2)))
          .then(snapShot => {
            const lastVisible = snapShot.docs[snapShot.docs.length - 1];
            const players = snapShot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setLastVisible(lastVisible);
            setPlayers(players);
          })
          .catch(error => {
            showToastError(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [players]
  );
  const loadMorePlayers = () => {
    if (lastVisible) {
      setLoading(true);
      getDocs(query(dataplayers, startAfter(lastVisible), limit(2)))
        .then(snapShot => {
          const lastVisible = snapShot.docs[snapShot.docs.length - 1];
          const newplayers = snapShot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setLastVisible(lastVisible);
          setPlayers([...players, ...newplayers]);
        })
        .catch(error => {
          showToastError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      showToastError("noting to load");
    }
  };
  return (
      <AdminLayout title="The Players">
          <div className="mb-5">
              <Button disableElevation variant="outlined"
                  LinkComponent={Link} to={'/admin_players/add_player'}>Add Player</Button>
          </div>
          <Paper>
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell>First Name</TableCell>
                          <TableCell>Last Name</TableCell>
                          <TableCell> Number</TableCell>
                          <TableCell> Position</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {
                          players ?
                          
                              players.map(player => (
                                  <TableRow key={player.id}>
                                      <TableCell>
                                          <Link to={`/admin_player/edit_player/${player.id}`}>
                                          {player.name}
                                          </Link>
                                      </TableCell>
                                      <TableCell>
                                          <Link to={`/admin_player/edit_player/${player.id}`}>
                                          {player.lastname}
                                          </Link>
                                      </TableCell>
                                      <TableCell>
                                          {player.number}
                                      </TableCell> <TableCell>
                                          {player.position}
                                      </TableCell>
                              </TableRow>
                          ))
                          : null
                      }
                  </TableBody>
              </Table>
          </Paper>
          <Button variant="contained" color="primary" disabled={loading} onClick={() => loadMorePlayers()}>
              LOAD MORE</Button>
          <div className="admin_progress">
              {
                  loading ? 
                      <CircularProgress thickness={7} style={{color:'#98c5e9'}}/>
                      :null
              }
          </div>
    </AdminLayout>
  );
};

export default AdminPlayers;
