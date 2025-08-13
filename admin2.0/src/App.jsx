import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/content_component/Dashboard";
import Project from "./Components/content_component/Project";

const App = () => {
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-[1440px] flex justify-between">

          {/* left side bar */}
          <div className="left w-[25%] h-screen overflow-y-scroll border">
            <Sidebar />
          </div>

          {/* right content bar */}
          <div className="right w-[75%] border">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/project" element={<Project />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
