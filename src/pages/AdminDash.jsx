import React, { useContext, useEffect, useState } from "react";
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
import AddProj from "../assets/images/dashAddProj.svg";
import Upload from "../assets/images/dashUpload.svg";
import Download from "../assets/images/dashDownload.svg";
import sharedContext from "../context/SharedContext";
import toast from "react-hot-toast";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import PdfGenerator from "../components/PdfGenerator";

const AdminDash = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {projects} = useContext(sharedContext);
  const [selectedButton, setSelectedButton] = useState("APARTMENT");
  const [selectedRole, setSelectedRole] = useState("Super Admin");
  const [showPopUp, setShowPopUp] = useState("");
  const [showStatusOverview, setShowStatusOverview] = useState(false);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [buttonText, setButtonText] = useState("Download");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const roleType = localStorage.getItem("role_type");

  const buildingType =
    selectedButton.charAt(0).toUpperCase() +
    selectedButton.slice(1).toLowerCase();

  const URL = `${import.meta.env.VITE_BASE_URL}/project/getProjectsData?project_type=${buildingType}`;

  const toggleModal = () => {
    setIsOpen(!isOpen); // Toggle modal visibility
  };

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

  const handleAddProject = () => {
    setShowAddProjectForm(true);
  };

  const handleCloseProject = () => {
    setShowAddProjectForm(false);
  };

  const handleUpload = () => {
    setShowUploadForm(true);
  };

  const handleCloseUpload = () => {
    setShowUploadForm(false);
  };

  // Code to download table data PDF
  const downloadPdf = async (projectData) => {
    try {
      setButtonText('Downloading...');
      setIsButtonDisabled(true);

      const zip = new JSZip();
      const mainFolder = zip.folder("Projects");

      // Filter projects based on selected project type
      const filteredProjects = projectData.filter(project => project.project_type === selectedButton.toUpperCase());

      // Iterate over filtered projects
      for (const project of filteredProjects) {
        // Generate PDF for the project
        const doc = (
          <PdfGenerator projects={filteredProjects} projectType={selectedButton} />
        ); // Implement this function to generate PDF for each project
        const asPdf = pdf([]);
        asPdf.updateContainer(doc);
        const blob = await asPdf.toBlob();

        // Save PDF in project folder
        mainFolder.file(`${selectedButton}_DATA.pdf`, blob, { binary: true });
      }

      // Generate ZIP file and trigger download
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "projects.zip");
      toast.success("Download successful");

      setButtonText("Download");
      setIsButtonDisabled(false);
    } catch (error) {
      console.error("An error occurred while generating the PDF/ZIP:", error);
      toast.error("Download failed");
      setButtonText("Download");
      setIsButtonDisabled(false);
    }
  }

  return (
    <div className="dash">
      <style>
        {`
          .type-btn button {
            color: ${
              selectedButton ? "#585454" : "rgba(255, 255, 255, 0.96)"
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
        <div className="dash-button-sec">
          <div className="type">
            <div className="type-btn">
              <button
                style={{
                  color:
                    selectedButton === "APARTMENT" ? "rgba(255, 255, 255, 0.96)" : "",
                }}
                onClick={() => handleButtonClick("APARTMENT")}
              >
                Apartments
              </button>
            </div>
            <div className="type-btn">
              <button
                style={{
                  color: selectedButton === "VILLA" ? "rgba(255, 255, 255, 0.96)" : "",
                }}
                onClick={() => handleButtonClick("VILLA")}
              >
                Villas
              </button>
            </div>
            <div className="type-btn">
              <button
                style={{
                  color: selectedButton === "PLOT" ? "rgba(255, 255, 255, 0.96)" : "",
                }}
                onClick={() => handleButtonClick("PLOT")}
              >
                Plots
              </button>
            </div>
            <div className="type-btn">
              <button
                style={{
                  color:
                    selectedButton === "FARM_LAND" ? "rgba(255, 255, 255, 0.96)" : "",
                }}
                onClick={() => handleButtonClick("FARM_LAND")}
              >
                Farm lands
              </button>
            </div>
          </div>
          {(roleType === "SUPER ADMIN" || roleType === "MANAGER") && <div className="dash-actions">
            <div className="action" onClick={handleAddProject}>
              <img src={AddProj} alt="Add Project" />
              <p>Add Project</p>
            </div>
            <div className="action" onClick={handleUpload}>
              <img src={Upload} alt="Bulk Upload" />
              <p>Upload</p>
            </div>
            <div className="action" onClick={() => downloadPdf(projects)} style={isButtonDisabled ? {cursor: "not-allowed"} : {cursor: "pointer"}}>
              <img src={Download} alt="Download" />
              <p>{buttonText}</p>
            </div>
          </div>}
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
      <WebMenu roleType={selectedRole} />
      {showAddProjectForm && <AddProject selectedType={selectedButton} onClose={handleCloseProject}/>}
      {showUploadForm && <UploadForm selectedType={selectedButton} onClose={handleCloseUpload} />}
    </div>
  );
};

export default AdminDash;
