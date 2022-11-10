import React, { useEffect, useState } from "react";
import { dataMatches } from "../../../firebase";
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

const AdminMatches = () => {
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState(null);
  useEffect(
    () => {
      if (!matches) {
        setLoading(true);
        getDocs(query(dataMatches, limit(2)))
          .then(snapShot => {
            const lastVisible = snapShot.docs[snapShot.docs.length - 1];
            const matches = snapShot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setLastVisible(lastVisible);
            setMatches(matches);
          })
          .catch(error => {
            showToastError(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [matches]
  );
  const loadMoreMatches = () => {
    if (lastVisible) {
      setLoading(true);
      getDocs(query(dataMatches, startAfter(lastVisible), limit(2)))
        .then(snapShot => {
          const lastVisible = snapShot.docs[snapShot.docs.length - 1];
          const newMatches = snapShot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setLastVisible(lastVisible);
          setMatches([...matches, ...newMatches]);
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
      <AdminLayout title="The Matches">
          <div className="mb-5">
              <Button disableElevation variant="outlined"
                  LinkComponent={Link} to={'/admin_matches/add_match'}>Add Match</Button>
          </div>
          <Paper>
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell>Date </TableCell>
                          <TableCell>Match </TableCell>
                          <TableCell> Result</TableCell>
                          <TableCell> Final</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {
                          matches ?
                          
                              matches.map(match => (
                                  <TableRow key={match.id}>
                                      <TableCell>
                                        
                                          {match.date}
                                          
                                      </TableCell>
                                      <TableCell>
                                          <Link to={`/admin_matches/edit_match/${match.id}`}>
                                          {match.away}<strong>-</strong>{match.local}
                                          </Link>
                                      </TableCell>
                                      <TableCell>
                                          {match.resultAway}<strong>-</strong>{match.resultLocal}
                                      </TableCell> <TableCell>
                                          {match.final === "Yes" ?
                                              <span className="matches_tag_red">Final</span>
                                              : <span className="matches_tag_green">Not played yet</span>}
                                      </TableCell>
                              </TableRow>
                          ))
                          : null
                      }
                  </TableBody>
              </Table>
          </Paper>
          <Button variant="contained" color="primary" disabled={loading} onClick={() => loadMoreMatches()}>
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

export default AdminMatches;
