import React, { useEffect, useState } from "react";
import "../components/admin/style.css";
import logo from "../assets/logo.svg";
import menu from "../assets/menu.svg";
import NavBar from "../components/NavBar";
import WebMenu from "../components/menu/WebMenu";
import Overview from "../components/Overview";
import Table from "../components/Table";
import Scale from "../components/Scale";
import MobileModal from "../components/menu/MobileModal";
import StatusOverviewCard from "../components/admin/StatusOverviewCard";
import UploadForm from "../components/admin/UploadForm";
import AddProject from "../components/admin/AddProject";

const ManagerDash = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("APARTMENT");
  const [selectedRole, setSelectedRole] = useState("Super Admin");
  const [showPopUp, setShowPopUp] = useState("");
  const [showStatusOverview, setShowStatusOverview] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const toggleModal = () => {
    setIsOpen(!isOpen); // Toggle modal visibility
  };

  const buildingType =
    selectedButton.charAt(0).toUpperCase() +
    selectedButton.slice(1).toLowerCase();

  const URL = `${import.meta.env.VITE_BASE_URL}/project/getProjectsData?project_type=${buildingType}`;

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleActionClick = (actionType) => {
    setShowPopUp(actionType);
  };

  const handleCloseClick = () => {
    setShowPopUp(false);
  };

  const handleButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize); // Listen for viewport width changes

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  const handleOpenStatusOverview = () => {
    setShowStatusOverview(true);
  };

  const handleCloseStatusOverview = () => {
    setShowStatusOverview(false);
  };

  return (
    <div className="dash">
      <style>
        {`
                    @media screen and (min-width: 1024px) {
                        body {
                          background-color: #f0f1f3;
                        }
                    }
                    .type-btn button {
                        background-color: ${
                          selectedButton ? "#9FC2F3" : "#1366d9"
                        };
                    }
                `}
      </style>
      <div className="mob-nav">
        <a href="/">
          <img src={logo} alt="" />
        </a>
        <img src={menu} alt="" onClick={toggleModal} />
      </div>
      {viewportWidth >= 1024 && <Overview />}
      <div className="adm-act">
        <select
          className="adm-actions"
          name=""
          id=""
          onChange={(e) => handleActionClick(e.target.value)}
        >
          <option value="">Actions</option>
          <option value="Upload">Upload</option>
          <option value="Download">Download</option>
          <option value="Add">Add Project</option>
        </select>
        <div className="status-over">
          <button onClick={handleOpenStatusOverview}>Status Overview</button>
        </div>
        <select
          className="adm-actions"
          name=""
          id=""
          onChange={(e) => handleButtonClick(e.target.value)}
        >
          <option value="APARTMENT">Apartments</option>
          <option value="VILLA">Villas</option>
          <option value="PLOT">Plots</option>
          <option value="FARM_LAND">Farm lands</option>
        </select>
      </div>
      <div className="dash_data">
        <div className="type">
          <div className="type-btn">
            <button
              style={{
                backgroundColor:
                  selectedButton === "APARTMENT" ? "#1366d9" : "",
              }}
              onClick={() => handleButtonClick("APARTMENT")}
            >
              Apartments
            </button>
          </div>
          <div className="type-btn">
            <button
              style={{
                backgroundColor: selectedButton === "VILLA" ? "#1366d9" : "",
              }}
              onClick={() => handleButtonClick("VILLA")}
            >
              Villas
            </button>
          </div>
          <div className="type-btn">
            <button
              style={{
                backgroundColor: selectedButton === "PLOT" ? "#1366d9" : "",
              }}
              onClick={() => handleButtonClick("PLOT")}
            >
              Plots
            </button>
          </div>
          <div className="type-btn">
            <button
              style={{
                backgroundColor:
                  selectedButton === "FARM_LAND" ? "#1366d9" : "",
              }}
              onClick={() => handleButtonClick("FARM_LAND")}
            >
              Farm lands
            </button>
          </div>
        </div>
      </div>
      <select className="xyz" value={selectedRole} onChange={handleRoleChange}>
        <option value="Sales Person">Sales Person</option>
        <option value="Manager">Manager</option>
        <option value="Channel Person">Channel Person</option>
        <option value="Super Admin">Super Admin</option>
      </select>
      <Table url={URL} selectedButton={selectedButton} />
      {viewportWidth >= 1024 && <Scale selectedButton={selectedButton} />}
      {showStatusOverview && (
        <StatusOverviewCard
          selectedButton={selectedButton}
          onClose={handleCloseStatusOverview}
        />
      )}
      {showPopUp === "Upload" && (
        <UploadForm selectedType={selectedButton} onClose={handleCloseClick} />
      )}
      {showPopUp === "Add" && (
        <AddProject selectedType={selectedButton} onClose={handleCloseClick} />
      )}
      <MobileModal isOpen={isOpen} onClose={toggleModal} />
      <NavBar />
      <WebMenu />
    </div>
  );
};

export default ManagerDash;
