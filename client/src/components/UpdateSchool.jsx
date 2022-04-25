import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SchoolsContext } from "../context/SchoolsContext";
import SchoolFinder from "../api/SchoolFinder";

function UpdateSchool(props) {
  const { id } = useParams();
  const { schools } = useContext(SchoolsContext);
  const [name, setName] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SchoolFinder.get(`/${id}`);

        /* DO NOT use useContext to fetch data bc it depends on
         ** RestaurantList to fetch data first. Going directly to
         ** UpdatePage before accessing homepage will cause error.
         */
        setName(response.data.data.restaurant.name);
      } catch (err) {
        console.log("ERROR: ", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSchool = await SchoolFinder.put(`/${id}`, {
      name: name,
    });
    // Navigate back to homepage
    navigate("/schools");
  };

  return (
    <>
      <h1>{name}</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            className="form-control"
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default UpdateSchool;
