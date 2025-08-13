import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <div className="w-full flex flex-col gap-2 p-5">

        {/* dashboard */}
        <div className="bg-slate-400 p-2 rounded-md">
          <NavLink to={"/"}>
            <p>Dashboard</p>
          </NavLink>
        </div>

        {/* project */}
        <div className="bg-slate-400 p-2 rounded-md">
          <NavLink to={"/project"}>
            <p>Project</p>
          </NavLink>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
