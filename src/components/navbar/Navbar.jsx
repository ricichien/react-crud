import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/logo-h.png";
import {
  faAnglesLeft,
  faBookOpen,
  faBriefcase,
  faBuilding,
  faTable,
  faTicketSimple,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../styles/global.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`navbar ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="navbar-logo-box">
        <img
          src={Logo}
          alt="Holu"
          className="navbar-logo"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="navbar-menu">
        <Link className="menu" onClick={handleSidebarToggle}>
          <FontAwesomeIcon icon={faTable} />
        </Link>
      </div>
      <div className="navbar-menu">
        <Link className="menu" onClick={handleSidebarToggle}>
          <FontAwesomeIcon icon={faVolumeHigh} />
        </Link>
      </div>
      <div className="navbar-menu">
        <Link className="menu" onClick={handleSidebarToggle}>
          <FontAwesomeIcon icon={faTicketSimple} />
        </Link>
      </div>
      {isSidebarOpen && (
        <div className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <div className="sidebar-arrow-icon-box">
            <div
              className={`sidebar-arrow-icon ${
                isSidebarOpen ? "sidebar-open" : ""
              }`}
              onClick={handleSidebarToggle}
            >
              <FontAwesomeIcon icon={faAnglesLeft} />
            </div>
          </div>
          <Link to="/monitoring/register">
            <FontAwesomeIcon icon={faBookOpen} />
            <span className="sidebar-text">MONITORAMENTO</span>
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faBriefcase} />
            <span className="sidebar-text">COMPRAS</span>
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faBuilding} />
            <span className="sidebar-text">TEXTO</span>
          </Link>
        </div>
      )}
    </div>
  );
}
