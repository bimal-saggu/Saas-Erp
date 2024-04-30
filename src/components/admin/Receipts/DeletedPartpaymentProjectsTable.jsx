import React, { useEffect, useState } from "react";
import partSoldDataDummy from "../../../data/partSoldData";
import deleteIcon from "../../../assets/delete.svg";
import exportIcon from "../../../assets/export.svg";

const DeletedPartpaymentProjectsTable = () => {
    const [deltedPartpaymentProjects, setDeletedpartpaymentProjects] = useState([]);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
        setDeletedpartpaymentProjects(partSoldDataDummy);
    }, [])

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
                <React.Fragment key={data.projectID}>
                  <tr
                    key={data.projectID}
                  >
                    <td>{data.projectID}</td>
                    <td>{data.projectName}</td>
                    <td>{data.clientName}</td>
                    {viewportWidth >= 1024 && <td>{data.status}</td>}
                  </tr>
                  {/* {renderDropdown(data.projectID)} */}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeletedPartpaymentProjectsTable;
