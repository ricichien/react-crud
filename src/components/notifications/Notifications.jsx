import React, { useState } from "react";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Notifications() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="header-icons">
      <div className="header-icon" onClick={handleSidebarToggle}>
        <FontAwesomeIcon icon={faBell} />
      </div>
      {isSidebarOpen && (
        <div className="notifications-sidebar">
          <div className="sidebar-title">Notificações</div>
          <div className="notification-list">
            <div className="notification-card">
              <div className="notification-card-title">
                <span className="notification-card-title-icon">
                  Esta é uma notificação
                </span>

                <span className="notification-card-content">12 jul</span>
              </div>
              <div className="notification-card-content">
                Este é o texto da sua notificação. Algo que aconteceu e você
                precisa saber
              </div>
            </div>
          </div>
          <div className="notification-list">
            <div className="notification-card">
              <div className="notification-card-title">
                <span className="notification-card-title-icon">
                  Esta é uma notificação
                </span>

                <span className="notification-card-content">12 jul</span>
              </div>
              <div className="notification-card-content">
                Este é o texto da sua notificação. Algo que aconteceu e você
                precisa saber
              </div>
            </div>
          </div>
          <div className="notification-list">
            <div className="notification-card">
              <div className="notification-card-title">
                <span className="notification-card-title-icon">
                  Esta é uma notificação
                </span>

                <span className="notification-card-content">12 jul</span>
              </div>
              <div className="notification-card-content">
                Este é o texto da sua notificação. Algo que aconteceu e você
                precisa saber
              </div>
            </div>
          </div>
          <div className="notification-list">
            <div className="notification-card">
              <div className="notification-card-title">
                <span className="notification-card-title-icon">
                  Esta é uma notificação
                </span>

                <span className="notification-card-content">12 jul</span>
              </div>
              <div className="notification-card-content">
                Este é o texto da sua notificação. Algo que aconteceu e você
                precisa saber
              </div>
            </div>
          </div>
          <div className="notification-list">
            <div className="notification-card">
              <div className="notification-card-title">
                <span className="notification-card-title-icon">
                  Esta é uma notificação
                </span>

                <span className="notification-card-content">12 jul</span>
              </div>
              <div className="notification-card-content">
                Este é o texto da sua notificação. Algo que aconteceu e você
                precisa saber
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
