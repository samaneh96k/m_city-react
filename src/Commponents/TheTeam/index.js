import React, { useEffect, useState } from "react";
import PlayersCard from "../Utils/playersCard";
import { Slide } from "react-awesome-reveal";
import {  dataplayers, storage } from "../../firebase";
import {  getDocs } from "firebase/firestore/lite";
import { showToastError } from "../Utils/tools";
import { Promise } from "core-js";
import { getDownloadURL, ref } from "firebase/storage";
import { CircularProgress } from "@mui/material";
const TheTeam = () => {
  const [loading, setLoading] = useState(true);
  const [Players, setPlayers] = useState(null);
  useEffect(
    () => {
      if (!Players) {
        getDocs(dataplayers)
          .then(snapshop => {
            let players = snapshop.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
          
            let promises = [];

            players.forEach((player, index) => {
              promises.push(
                new Promise((resolve, reject) => {
                  getDownloadURL(
                    ref(storage, `player/${player.image}`)
                  ).then(url => {
                    players[index].url = url;
                    resolve();
                  }).catch(error=>{reject()});
                })
                  
              );
            });
          Promise.all(promises).then(() => {
                setPlayers(players);
              });
          
          
          })
          .catch(error => {
            showToastError("sorry try again later");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [Players]
  );
  const showPlayerByCategory = category => (
   Players?
      Players.map(player => {
          return player.position === category
            ? <Slide left key={player.id} triggerOnce>
                <div className="item">
                  <PlayersCard
                    number={player.number}
                    name={player.name}
                    lastname={player.lastname}
                    bck={player.url}
                  />
                </div>
              </Slide>
            : null;
        })
      :null
  );
  return (
    <div className="the_team_container">
      {loading
        ? <div className="progress">
            <CircularProgress />
          </div>
        : <div>
            <div className="team_category_wrapper">
              <div className="title">Keepers</div>
              <div className="team_cards">
                {showPlayerByCategory("keeper")}
              </div>
                  </div>
                  
                  <div className="team_category_wrapper">
              <div className="title">Defences</div>
              <div className="team_cards">
                {showPlayerByCategory("Defence")}
              </div>
                  </div>
                  
                  <div className="team_category_wrapper">
              <div className="title">Midfields</div>
              <div className="team_cards">
                {showPlayerByCategory("Midfield")}
              </div>
                  </div>
                  <div className="team_category_wrapper">
              <div className="title">Strikers</div>
              <div className="team_cards">
                {showPlayerByCategory("Striker")}
              </div>
            </div>
          </div>}
    </div>
  );
};

export default TheTeam;
