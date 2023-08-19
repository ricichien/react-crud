import React, { useState } from "react";
import { faCalendar, faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Tasks() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="header-icons">
      <div className="header-icon" onClick={handleSidebarToggle}>
        <FontAwesomeIcon icon={faClipboard} />
      </div>
      {isSidebarOpen && (
        <div className="tasks-sidebar">
          <div className="sidebar-title">Tarefas</div>
          <div className="task-list">
            <div className="task-card">
              <div className="task-card-title">
                <span className="task-card-title-icon">Esta é uma tarefa</span>

                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{ color: "#f18a66", fontSize: "20px" }}
                />
                <span className="task-card-content">20 Ago</span>
              </div>
              <div className="task-card-content">
                Este é o texto da sua tarefa. Algo que deve ser feito por você
                até uma data.
              </div>
            </div>
          </div>
          <div className="task-list">
            <div className="task-card">
              <div className="task-card-title">
                <span className="task-card-title-icon">Esta é uma tarefa</span>

                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{ color: "#f18a66", fontSize: "20px" }}
                />
                <span className="task-card-content">20 Ago</span>
              </div>
              <div className="task-card-content">
                Este é o texto da sua tarefa. Algo que deve ser feito por você
                até uma data.
              </div>
            </div>
          </div>
          <div className="task-list">
            <div className="task-card">
              <div className="task-card-title">
                <span className="task-card-title-icon">Esta é uma tarefa</span>

                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{ color: "#f18a66", fontSize: "20px" }}
                />
                <span className="task-card-content">20 Ago</span>
              </div>
              <div className="task-card-content">
                Este é o texto da sua tarefa. Algo que deve ser feito por você
                até uma data.
              </div>
            </div>
          </div>
          <div className="task-list">
            <div className="task-card">
              <div className="task-card-title">
                <span className="task-card-title-icon">Esta é uma tarefa</span>

                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{ color: "#f18a66", fontSize: "20px" }}
                />
                <span className="task-card-content">20 Ago</span>
              </div>
              <div className="task-card-content">
                Este é o texto da sua tarefa. Algo que deve ser feito por você
                até uma data.
              </div>
            </div>
          </div>
          <div className="task-list">
            <div className="task-card">
              <div className="task-card-title">
                <span className="task-card-title-icon">Esta é uma tarefa</span>

                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{ color: "#f18a66", fontSize: "20px" }}
                />
                <span className="task-card-content">20 Ago</span>
              </div>
              <div className="task-card-content">
                Este é o texto da sua tarefa. Algo que deve ser feito por você
                até uma data.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
