import React from "react";
import SchoolList from "../components/SchoolList";
import AddSchool from "../components/AddSchool";
import "./Schools.css";

function Schools() {
  return (
    <>
      <h1 className="font-weight-light display-1 text-center">
        Select Your School
      </h1>
      <SchoolList />
      <AddSchool />
    </>
  );
}

export default Schools;
