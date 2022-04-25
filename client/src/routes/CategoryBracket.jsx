import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CategoryBracket.css";
import CategoryFinder from "../api/CategoryFinder";

function CategoryBracket(props) {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CategoryFinder.get(`/${id}`);
        setCategory(response.data.data.category);
        setSongs(response.data.data.songs);
        console.log(songs);
      } catch (err) {
        console.log("ERROR: ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center display-1 my-3">{category.name}</h1>
      <div className="tournament-container">
        <div className="tournament-headers">
          <h3>Preliminary</h3>
          <h3>Quarter-Finals</h3>
          <h3>Semi-Finals</h3>
          <h3>Final</h3>
          <h3>Winner</h3>
        </div>
        <div className="tournament-brackets">
          <ul className="bracket bracket-1">
            <li className="team-item">#1 - {songs[0] && songs[0].title}</li>
            <li className="team-item">#8 - {songs[1] && songs[1].title}</li>
            <li className="team-item">#4 - {songs[2] && songs[2].title}</li>
            <li className="team-item">#5 - {songs[3] && songs[3].title}</li>
            <li className="team-item">#3 - {songs[4] && songs[4].title}</li>
            <li className="team-item">#6 - {songs[5] && songs[5].title}</li>
            <li className="team-item">#2 - {songs[6] && songs[0].title}</li>
            <li className="team-item">#7 - {songs[7] && songs[7].title}</li>
          </ul>
          <ul className="bracket bracket-2">
            <li className="team-item">
              QF1 <span>vs</span> QF2
            </li>
            <li className="team-item">
              QF3 <span>vs</span> QF4
            </li>
            <li className="team-item">
              QF5 <span>vs</span> QF6
            </li>
            <li className="team-item">
              QF7 <span>vs</span> QF8
            </li>
          </ul>
          <ul className="bracket bracket-3">
            <li className="team-item">
              SF1 <span>vs</span> SF2
            </li>
            <li className="team-item">
              SF3 <span>vs</span> SF4
            </li>
          </ul>
          <ul className="bracket bracket-4">
            <li className="team-item">
              F1 <span>vs</span> F2
            </li>
          </ul>

          <ul className="bracket bracket-5">
            <li className="team-item">Winner</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default CategoryBracket;
