import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SchoolsContext } from "../context/SchoolsContext";

function Categories({ categories }) {
  let navigate = useNavigate();
  const { selectedCategory, setSelectedCategory } = useContext(SchoolsContext);

  const handleCategorySelect = (category) => {
    try {
      setSelectedCategory(category);
      // Navigate to Category Bracket
      navigate(`/categories/${category.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="row row-cols-3 mb-2">
      {categories &&
        categories.map((category) => {
          return (
            <div
              key={category.id}
              className="card text-white bg-primary mb-3 me-4"
              style={{ maxWidth: "30%", cursor: "pointer" }}
            >
              <div className="card-header d-flex justify-content-between">
                <span
                  onClick={() => {
                    handleCategorySelect(category);
                  }}
                >
                  {category.name}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Categories;
