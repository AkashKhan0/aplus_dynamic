import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/content_component/Dashboard";
import Project from "./Components/content_component/Project";
import Team from "./Components/content_component/Team";

const App = () => {
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-[1440px] flex justify-between">
          {/* left side bar */}
          <div className="left w-[25%] h-screen overflow-y-scroll bg-slate-300">
            <Sidebar />
          </div>

          {/* right content bar */}
          <div className="right w-[75%] h-full min-h-screen bg-slate-400 p-5">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/project" element={<Project />} />
              <Route path="/team" element={<Team />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
