import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import Owl1 from "../../assets/owl1.png";
import Morning_bird from "../../assets/morning_bird.png";
import bg_owl from "../../assets/owl.png";
import moon from "../../assets/moon.png";
import house from "../../assets/house1.png";
import sun from "../../assets/sun.png";
import cloud from "../../assets/cloud.png";
import cloud1 from "../../assets/cloud1.png";
import bg_bird from "../../assets/morning_bird1.gif";
import {
  FaHome,
  FaServicestack,
  FaInfoCircle,
  FaEnvelope,
  FaProjectDiagram,
  FaBlog,
} from "react-icons/fa";
import Fireflies from "../Fireflies";
import "../Fireflies.css";

const menuItems = [
  { path: "/", name: "home", icon: <FaHome /> },
  { path: "/services", name: "services", icon: <FaServicestack /> },
  { path: "/about", name: "about", icon: <FaInfoCircle /> },
  { path: "/contact", name: "contact", icon: <FaEnvelope /> },
  { path: "/project", name: "project", icon: <FaProjectDiagram /> },
  { path: "/blog", name: "blog", icon: <FaBlog /> },
];

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []); // runs only once

  return (
    <div>
      {theme === "dark" && <Fireflies />}

      {/* background image night */}
      <div
        className={`fixed bottom-0 left-0 -z-[1] ${
          theme === "dark" ? "opacity-5" : "opacity-0 hidden"
        }`}
      >
        <img src={bg_owl} alt="" />
      </div>
      {/* moon */}
      <div
        className={`fixed top-[10%] right-[10%] -z-[1] ${
          theme === "dark"
            ? "opacity-50 translate-y-0 duration-[3s]"
            : "opacity-0 translate-y-[-300px]"
        }`}
      >
        <img src={moon} alt="" className="w-[70px]" />
      </div>
      {/* house */}
      <div
        className={`fixed top-[37%] left-[7%] -z-[1] ${
          theme === "dark" ? "opacity-5" : "opacity-0"
        }`}
      >
        <img src={house} alt="" className="w-[200px]" />
      </div>
      {/* sun */}
      <div
        className={`fixed top-[10%] left-[10%] -z-[1] ${
          theme === "light"
            ? "opacity-50 translate-y-0 duration-[9s]"
            : "opacity-0 translate-y-[500px]"
        }`}
      >
        <img src={sun} alt="" className="w-[180px]" />
      </div>

      {/* cloud night */}
      <div
        className={`fixed top-[10%] right-[30%] -z-[1] ${
          theme === "dark"
            ? "opacity-10 translate-x-0 duration-[20s]"
            : "opacity-0 translate-x-[300px]"
        }`}
      >
        <img src={cloud} alt="" className="w-[150px]" />
      </div>

      {/* cloud1 day */}
      <div
        className={`fixed top-[20%] left-[20%] -z-[1] ${
          theme === "light"
            ? "opacity-60 translate-x-0 duration-[20s]"
            : "opacity-0 translate-x-[300px]"
        }`}
      >
        <img src={cloud1} alt="" className="w-[200px]" />
      </div>

      {/* background image day */}
      <div
        className={`fixed bottom-0 left-10 -z-[1] ${
          theme === "light" ? "opacity-40" : "opacity-0 hidden"
        }`}
      >
        <img src={bg_bird} alt="" className="h-[300px]" />
      </div>

      <div className="navbar fixed bottom-0 left-0 w-full h-[50px] flex items-center justify-center py-7 gap-3">
        {/* night effect */}
        <div className="absolute right-0 bottom-0 -z-[1]">
          <img
            src={Owl1}
            alt="owl"
            className={`w-[70px] duration-1000 ${
              theme === "dark"
                ? "translate-x-0 opacity-100"
                : "translate-x-[200px] opacity-0"
            }
  }`}
          />
        </div>

        {/* day effect  */}
        <div className="absolute right-0 bottom-0 -z-[1]">
          <img
            src={Morning_bird}
            alt="owl"
            className={`w-[140px] duration-1000 ${
              theme === "light"
                ? "translate-x-0 opacity-100"
                : "translate-x-[200px] opacity-0"
            }
  }`}
          />
        </div>

        {/* Navbar menu items */}
        <div className="flex items-center justify-center gap-5 max_w">
          {menuItems.map((item) => (
            <div className="menus" key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `text-base font-semibold ${isActive ? "active-menu" : ""}`
                }
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="menu_icon">{item.icon}</div>
                  <div className="menu_name">{item.name}</div>
                </div>
              </NavLink>
            </div>
          ))}

          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="px-5 py-2 bg-orange-400 rounded-md text-slate-900"
          >
            change color
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
