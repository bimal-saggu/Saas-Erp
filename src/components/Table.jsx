import React, { useContext, useEffect, useState } from "react";
import "./table.css";
import AddProject from "./admin/AddProject";
import ProjectDetails from "./sales-channel/ProjectDetails";
import UploadForm from "./admin/UploadForm";
import sharedContext from "../context/SharedContext";
import Loader from "./Loader";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import PdfGenerator from "./PdfGenerator";
import toast from "react-hot-toast";

const Table = ({ selectedButton, url }) => {
  const { setLoader, loader } = useContext(sharedContext);
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [buttonText, setButtonText] = useState("Download");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const maxRowsPerPage = 10;

  const [scaleData, setScaleData] = useState([]);
  const [loading, setLoading] = useState(true);

  const roleType = localStorage.getItem("role_type");

  useEffect(() => {
    // Reset current page to 1 whenever selectedButton changes
    setCurrentPage(1);

    // Fetch data based on the selected button
    const fetchData = async () => {
      setLoader(true);
      setScaleData([]);

      try {
        const accessToken = localStorage.getItem("token");
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setScaleData(responseData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [selectedButton]);

  useEffect(() => {
    setProjects(
      scaleData?.filter(
        (project) => project.project_type === selectedButton.toUpperCase()
      )
    );
  }, [selectedButton, scaleData]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize); // Listen for viewport width changes

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

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

  const handleCellClick = (project) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  const handleCloseProjectDetails = () => {
    setShowProjectDetails(false);
  };
  // const handleButtonClick = (type) => {
  //   setSelectedButton(type);
  // };

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

  const renderColumns = () => {
    switch (selectedButton) {
      case "APARTMENT":
        return (
          <>
            <th className="tower-number">Tower Number</th>
            <th className="flat-number">Flat Number</th>
          </>
        );
      case "VILLA":
        return <th className="villa-number">Villa Number</th>;
      case "PLOT":
        return <th className="plot-number">Plot Number</th>;
      case "FARM_LAND":
        return (
          <>
            <th className="plot-number">Plot Number</th>
            <th className="sq-yards">Sq yards</th>
          </>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "AVAILABLE":
        return "#10A760";
      case "SOLD":
        return "#FF0000";
      case "TOKEN":
        return "#E19133";
      case "ADVANCE":
        return "#3D4DD6";
      case "BLOCK":
        return "#9C9C9C";
      case "PART PAYMENT":
        return "#515151";
      default:
        return "";
    }
  };

  const startIndex = (currentPage - 1) * maxRowsPerPage;
  const endIndex = startIndex + maxRowsPerPage;
  const displayedProjects = projects?.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="table">
      <Loader />
      <div className="table_Sec">
        <div className="table_Head">
          <h1>Projects</h1>
          {(roleType === "SUPER ADMIN" || roleType === "MANAGER") && <div className="actions">
            <button onClick={handleAddProject}>Add Project</button>
            <div className="actions file-actions">
              <div>
                <button onClick={handleUpload}>Upload</button>
              </div>
              <div>
                <button onClick={() => downloadPdf(projects)}>{buttonText}</button>
              </div>
            </div>
          </div>}
        </div>
        {displayedProjects.length !== 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sno</th>
                <th>Project Name</th>
                {viewportWidth >= 1024 && renderColumns()}
                <th>Project ID</th>
                <th className="proj-status">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedProjects?.map((project, index) => (
                <tr
                  key={project.project_id}
                  onClick={() => handleCellClick(project)}
                  className={selectedButton.toLowerCase() + "-row"}
                >
                  <td>
                    {startIndex + index + 1}
                  </td>
                  <td>
                    {project.project_name}
                  </td>
                  {viewportWidth >= 1024 && selectedButton === "APARTMENT" && (
                    <>
                      <td className="tower-number">{project.tower_number}</td>
                      <td className="flat-number">{project.flat_number}</td>
                    </>
                  )}
                  {viewportWidth >= 1024 && selectedButton === "VILLA" && (
                    <td className="villa-number">{project.villa_number}</td>
                  )}
                  {viewportWidth >= 1024 && selectedButton === "PLOT" && (
                    <td className="plot-number">{project.plot_number}</td>
                  )}
                  {viewportWidth >= 1024 && selectedButton === "FARM_LAND" && (
                    <>
                      <td className="plot-number">{project.plot_number}</td>
                      <td className="sq-yards">{project.sq_yards}</td>
                    </>
                  )}
                  <td>
                    {project.pid}
                  </td>
                  <td
                    className="proj-status"
                    style={{ color: getStatusColor(project.status) }}
                  >
                    {project.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>) : loader == false ? ("No data to show") :
        ("")}
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(projects?.length / maxRowsPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={endIndex >= projects?.length}
          >
            Next
          </button>
        </div>
      </div>
      {showAddProjectForm && (
        <AddProject
          selectedType={selectedButton}
          onClose={handleCloseProject}
        />
      )}
      {showUploadForm && <UploadForm selectedType={selectedButton} onClose={handleCloseUpload} />}
      {showProjectDetails && (
        <ProjectDetails
          project={selectedProject}
          getStatusColor={getStatusColor}
          onClose={handleCloseProjectDetails}
        />
      )}
    </div>
  );
};

export default Table;
