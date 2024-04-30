import React from "react";
import "../sales-channel/style.css";
import close from "../../assets/menuClose.svg";

const ProjectDetails = ({ project, getStatusColor, onClose }) => {
  if (!project) return null;

  const renderProjectDetails = () => {
    switch (project.project_type) {
      case "APARTMENT":
        return (
          <>
            <div className="data-fld">
              <p>Project Name</p>
              <p>{project.project_name}</p>
            </div>
            <div className="data-fld">
              <p>Tower Number</p>
              <p>{project.tower_number}</p>
            </div>
            <div className="data-fld">
              <p>Flat Number</p>
              <p>{project.flat_number}</p>
            </div>
            <div className="data-fld">
              <p>Project ID</p>
              <p>{project.pid}</p>
            </div>
            <div className="data-fld">
              <p>Status</p>
              <p style={{ color: getStatusColor(project.status) }}>
                {project.status}
              </p>
            </div>
            {/* Add more fields specific to Apartments */}
          </>
        );
      case "VILLA":
        return (
          <>
            <div className="data-fld">
              <p>Project Name</p>
              <p>{project.project_name}</p>
            </div>
            <div className="data-fld">
              <p>Villa Number</p>
              <p>{project.villa_number}</p>
            </div>
            <div className="data-fld">
              <p>Project ID</p>
              <p>{project.pid}</p>
            </div>
            <div className="data-fld">
              <p>Status</p>
              <p style={{ color: getStatusColor(project.status) }}>
                {project.status}
              </p>
            </div>
            {/* Add more fields specific to Villas */}
          </>
        );
      case "PLOT":
        return (
          <>
            <div className="data-fld">
              <p>Project Name</p>
              <p>{project.project_name}</p>
            </div>
            <div className="data-fld">
              <p>Plot Number</p>
              <p>{project.plot_number}</p>
            </div>
            <div className="data-fld">
              <p>Project ID</p>
              <p>{project.pid}</p>
            </div>
            <div className="data-fld">
              <p>Status</p>
              <p style={{ color: getStatusColor(project.status) }}>
                {project.status}
              </p>
            </div>
            {/* Add more fields specific to Plots */}
          </>
        );
      case "FARM_LAND":
        return (
          <>
            <div className="data-fld">
              <p>Project Name</p>
              <p>{project.project_name}</p>
            </div>
            <div className="data-fld">
              <p>Plot Number</p>
              <p>{project.plot_number}</p>
            </div>
            <div className="data-fld">
              <p>Sq Yards</p>
              <p>{project.sq_yards}</p>
            </div>
            <div className="data-fld">
              <p>Project ID</p>
              <p>{project.pid}</p>
            </div>
            <div className="data-fld">
              <p>Status</p>
              <p style={{ color: getStatusColor(project.status) }}>
                {project.status}
              </p>
            </div>
            {/* Add more fields specific to Farm lands */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="proj-det">
      <div className="det-sec">
        <div className="close">
          <img src={close} alt="Close card" onClick={onClose} />
        </div>
        <div className="det-head">
          <h3>Project Details</h3>
        </div>
        <div className="data">{renderProjectDetails()}</div>
      </div>
    </div>
  );
};

export default ProjectDetails;
