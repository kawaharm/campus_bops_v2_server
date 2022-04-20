import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SchoolsContext } from "../context/CampusContext";
import SchoolFinder from "../api/SchoolFinder";
import Categories from "./Categories";

function SchoolDetail(props) {
  const { id } = useParams();
  const { selectedSchool, setSelectedSchool } = useContext(SchoolsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SchoolFinder.get(`/${id}`);
        console.log(response);
        setSelectedSchool(response.data);
      } catch (err) {
        console.log("ERROR: ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {selectedSchool && (
        <>
          <h1 className="text-center display-1">
            {selectedSchool.school.name}
          </h1>
          <h3>Select a Category to start voting: </h3>
          <div className="mt-3">
            <Categories categories={selectedSchool.categories} />
          </div>
        </>
      )}
    </div>
  );
}

export default SchoolDetail;
