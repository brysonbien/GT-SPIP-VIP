import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Navbar/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        
        <div className="hiddenLinks">
          <Link to="/"> Home </Link>
          <Link to="/Dashboard"> Dashboard </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/Dashboard"> Dashboard </Link>


      </div>
    </div>
  );
}

export default Navbar;