import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SchoolsContextProvider } from "./context/SchoolsContext";

import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Schools from "./routes/Schools";
import SchoolDetail from "./routes/SchoolDetail";
import CategoryBracket from "./routes/CategoryBracket";
import SongSearch from "./routes/SongSearch";
import UpdateSchool from "./components/UpdateSchool";

function App() {
  return (
    <SchoolsContextProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/schools/" element={<Schools />} />
            <Route path="/schools/:id/update" element={<UpdateSchool />} />
            <Route path="/schools/:id" element={<SchoolDetail />} />
            <Route path="/categories/:id/" element={<CategoryBracket />} />
            <Route path="/search" element={<SongSearch />} />
          </Routes>
        </div>
      </Router>
    </SchoolsContextProvider>
  );
}

export default App;
