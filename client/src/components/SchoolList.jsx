import React, { useEffect, useContext, useState } from "react";
import { SchoolsContext } from "../context/SchoolsContext";
import SchoolFinder from "../api/SchoolFinder";
import { useNavigate } from "react-router-dom";

function SchoolList() {
  const { schools, setSchools } = useContext(SchoolsContext);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all schools from server
        const response = await SchoolFinder.get("/");
        // Store school list in state
        setSchools(response.data.data.schools);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (e, id) => {
    // To prevent event bubbling
    // Without this, all parent/child elements above (ex. handleSchoolSelect) will also run
    e.stopPropagation();
    try {
      // Navigate to update page
      navigate(`/schools/${id}/update`);
    } catch (err) {
      console.log("ERROR: ", err);
    }
  };

  const handleSchoolSelect = (id) => {
    try {
      // Navigate to detail page
      navigate(`/schools/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e, id) => {
    // To prevent event bubbling
    e.stopPropagation();
    try {
      const response = await SchoolFinder.delete(`/${id}`);
      console.log(response);
      // To update UI after deletion
      setSchools(
        schools.filter((school) => {
          return school.id !== id;
        })
      );
    } catch (err) {
      console.log("ERROR: ", err);
    }
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary table-headers">
            <th scope="col">School</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* && Means will only render if schools exists */}
          {schools &&
            schools.map((school) => {
              return (
                <tr
                  onClick={() => handleSchoolSelect(school.id)}
                  key={school.id}
                >
                  <td style={{ cursor: "pointer" }} className="school-name">
                    {school.name}
                  </td>
                  <td>
                    {/* "() =>" will prevent function from running immediately and only on click */}
                    <button
                      onClick={(e) => handleUpdate(e, school.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    {/* "() =>" will prevent function from running immediately and only on click */}
                    <button
                      onClick={(e) => handleDelete(e, school.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default SchoolList;
