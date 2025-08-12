// IconButton.jsx
import React from "react";
import './footer/Footer.css';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const IconButton = () => {

  const icons = [
    { id: 1, icon: <FaFacebook />, link: "#" },
    { id: 2, icon: <FaLinkedin />, link: "#" },
    { id: 3, icon: <FaInstagram />, link: "#" },
    { id: 4, icon: <FaYoutube />, link: "#" },
    { id: 5, icon: <FaGithub />, link: "#" },
  ];


  return (
    <div>
      <div className="flex justify-center items-center gap-2 s_icons">
          
          {icons.map((item) => (
        <a href={item.link} key={item.id} className="">
          <span className="">{item.icon}</span>
          <span className=""></span>
        </a>
      ))}  


      </div>
    </div>
  );
};

export default IconButton;
