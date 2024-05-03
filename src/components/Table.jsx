import React, { useContext, useEffect, useState } from "react";
import "./table.css";
import ProjectDetails from "./sales-channel/ProjectDetails";
import sharedContext from "../context/SharedContext";
import Loader from "./Loader";
import PrevArrow from "../assets/images/paginationPrevArrow.svg";;
import NextArrow from "../assets/images/paginationNextArrow.svg";;

const Table = ({ selectedButton, url }) => {
  const { setLoader, loader, projects, setProjects } = useContext(sharedContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
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

  const handleCellClick = (project) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  const handleCloseProjectDetails = () => {
    setShowProjectDetails(false);
  };

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
        return "#42FFA6";
      case "SOLD":
        return "#FF4E42";
      case "TOKEN":
        return "#E1F853";
      case "ADVANCE":
        return "#FFB03A";
      case "BLOCK":
        return "#696969";
      case "PART PAYMENT":
        return "#3F8CFF";
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
          {/* {(roleType === "SUPER ADMIN" || roleType === "MANAGER") && <div className="actions">
            <button onClick={handleAddProject}>Add Project</button>
            <div className="actions file-actions">
              <div>
                <button onClick={handleUpload}>Upload</button>
              </div>
              <div>
                <button onClick={() => downloadPdf(projects)}>{buttonText}</button>
              </div>
            </div>
          </div>} */}
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
          <img src={PrevArrow} alt="Previous arrow button" onClick={handlePreviousPage} disabled={currentPage === 1} />
          <span>
            Page {currentPage} of {Math.ceil(projects?.length / maxRowsPerPage)}
          </span>
          <img src={NextArrow} alt="Next arrow button" onClick={handleNextPage} disabled={endIndex >= projects?.length} />
        </div>
      </div>
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
