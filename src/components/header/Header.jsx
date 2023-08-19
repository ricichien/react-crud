import React from "react";
import { useLocation, Link } from "react-router-dom";
import Tasks from "../tasks/Tasks";
import Notifications from "../notifications/Notifications";
import Profile from "../profile/Profile";

import "../../styles/global.css";

const customPageTitles = {
  register: "Cadastro",
  create: "Novo Cliente",
  monitoring: "Monitoramento",
  edit: "Edição",
};

const customPageTrails = {
  register: "CADASTRO",
  create: "NOVO",
  monitoring: "MONITORAMENTO",
  edit: "EDIÇÃO",
};

export default function Header() {
  const location = useLocation();

  const isEditPage = location.pathname.includes("/edit");

  const generatePageTitle = () => {
    const pathSegments = location.pathname
      .split("/")
      .filter((segment) => segment !== "");

    if (pathSegments.length === 0) {
      return "";
    }

    const lastSegment = pathSegments[pathSegments.length - 1];
    const customTitle = customPageTitles[lastSegment.toLowerCase()];

    if (isEditPage) {
      return "Edição";
    }

    if (customTitle) {
      return customTitle;
    }

    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  const generateBreadcrumb = () => {
    const pathSegments = location.pathname
      .split("/")
      .filter((segment) => segment !== "");

    const breadcrumbItems = pathSegments.map((segment, index) => {
      const path = pathSegments.slice(0, index + 1).join("/");
      const title = customPageTrails[segment.toLowerCase()];

      if (!title) {
        return null;
      }

      if (segment.toLowerCase() === "edit") {
        return (
          <span key={index}>
            {index > 0 && " > "}
            {title}
          </span>
        );
      }

      return (
        <span key={index}>
          {index > 0 && " > "}
          <Link to={path}>{title}</Link>
        </span>
      );
    });

    return breadcrumbItems.filter((item) => item !== null);
  };

  return (
    <div className="header">
      <div className="breadcrumb">
        <div className="breadcrumb-title">{generatePageTitle()}</div>
        <div className="breadcrumb-trail">{generateBreadcrumb()}</div>
      </div>
      <div className="header-menu">
        <Tasks />
        <Notifications />
        <Profile />
      </div>
    </div>
  );
}
