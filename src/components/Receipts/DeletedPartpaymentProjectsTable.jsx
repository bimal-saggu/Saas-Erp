import React, { useContext, useEffect, useState } from "react";
import sharedContext from "../../context/SharedContext";

const DeletedPartpaymentProjectsTable = () => {
  const { setLoader, loader } = useContext(sharedContext);
  const [deltedPartpaymentProjects, setDeletedpartpaymentProjects] = useState([]);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // API to fetch deleted part payment table data

  useEffect(() => {
    const fetchDeletedPartpayProjects = async () => {
      setLoader(true);
      setDeletedpartpaymentProjects([]);

        try {
            const accessToken = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/receipt/getDeletedHistoryList?deletedFilter=COMPLETELY DELETED&statusFilter=Part Payment`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network error. Failed to fetch deleted part payment projects table data');
            }
            const result = await response.json();
            setDeletedpartpaymentProjects(result.data);
            console.log(result.data);
        } catch (error) {
            console.error('Error fetching deleted part payment projects table data:', error);
        } finally {
          setLoader(false);
        }
    };  

    fetchDeletedPartpayProjects();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize); // Listen for viewport width changes

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  return (
    <div>
      <div className="receipt-table-sec">
        {deltedPartpaymentProjects.length !== 0 ? (
        <div className="receipts-table-container part-pay-del">
          <table>
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Project Name</th>
                {<th>Client Name</th>}
                {viewportWidth >= 1024 && <th>Status</th>}
              </tr>
            </thead>
            <tbody>
              {deltedPartpaymentProjects.map((data) => (
                <React.Fragment key={data.receipt_id}>
                  <tr key={data.receipt_id}>
                    <td>{data.project.project_id}</td>
                    <td>{data.project.project_name}</td>
                    <td>{data.client_name}</td>
                    {viewportWidth >= 1024 && <td>{data.project.status}</td>}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        ) : loader == false ? (<div className="part-pay-del">No data to show in Deleted Projects</div>) : 
        ("")}
      </div>
    </div>
  );
};

export default DeletedPartpaymentProjectsTable;
