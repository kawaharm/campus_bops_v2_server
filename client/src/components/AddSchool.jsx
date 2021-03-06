import React, { useState, useContext } from "react";
import SchoolFinder from "../api/SchoolFinder";
import { SchoolsContext } from "../context/SchoolsContext";

function AddSchool() {
  const [newSchool, setNewSchool] = useState("");
  const { addSchool } = useContext(SchoolsContext);
  // const navigate = useNavigate();

  const handleAddSchool = async (e) => {
    e.preventDefault();
    try {
      const addNewSchool = await SchoolFinder.post("/", {
        name: newSchool,
      });
      addSchool(addNewSchool.data.data.school.name);
      // Refresh page to render new school
      window.location.reload(false);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <>
      <form>
        <div className="form-group">
          <label for="addSchool" className="add-school-label">
            Don't See Your School?
          </label>
          <div className="school-input">
            <input
              value={newSchool}
              onChange={(e) => setNewSchool(e.target.value)}
              type="text"
              className="form-control "
              id="addSchool"
              placeholder="Add Your Awesome School"
            />
            <button
              onClick={handleAddSchool}
              type="submit"
              className="btn btn-primary submit-btn"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddSchool;
