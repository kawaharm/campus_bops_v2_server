import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SchoolsContextProvider } from "./context/CampusContext";

import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Schools from "./routes/Schools";
import SchoolDetail from "./routes/SchoolDetail";
import CategoryBracket from "./routes/CategoryBracket";
import SongSearch from "./routes/SongSearch";

function App() {
  return (
    <SchoolsContextProvider>
      {/* container class will give page side margins */}
      <div className="container">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/schools/" element={<Schools />} />
            <Route path="/schools/:id" element={<SchoolDetail />} />
            <Route path="/categories/:id/" element={<CategoryBracket />} />
            <Route path="/search" element={<SongSearch />} />
          </Routes>
        </Router>
      </div>
    </SchoolsContextProvider>
  );
}

export default App;
