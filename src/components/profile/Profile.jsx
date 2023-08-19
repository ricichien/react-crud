import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import profileIcon from "../../assets/profile-icon.PNG";

function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="profile-menu-container">
      <div className="profile-icon" onClick={handleMenuToggle}>
        <img src={profileIcon} alt="Profile" />
      </div>
      {isMenuOpen && (
        <div className="profile-menu-options">
          <div className="profile-menu-option">
            <FontAwesomeIcon icon={faUser} />
            <span> Perfil</span>
          </div>
          <div className="profile-menu-option">
            <FontAwesomeIcon icon={faCog} />
            <span> Ajustes</span>
          </div>
          <div className="profile-menu-option" style={{ color: "#E5282C" }}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span> Sair</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
