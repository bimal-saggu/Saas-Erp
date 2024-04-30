import React, { useEffect, useState } from "react";
import "./pendingReceipts.css";
import soldDataDummy from "../../../data/soldDataDummy";
import partSoldPayments from "../../../data/partSoldPayments";
import partPayRecData from "../../../data/partPayRecData";
import close from "../../../assets/menuClose.svg";
import deleteIcon from "../../../assets/delete.svg";
import exportIcon from "../../../assets/export.svg";
import SoldCard from "./SoldCard";
import SoldDeletedProjects from "./SoldDeletedProjects";

const SoldTable = () => {
  const [soldData, setSoldData] = useState([]);
  const [partPaymentsData, setPartPaymentsData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [showDeletedProjects, setShowDeletedProjects] = useState(false); 
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    setPartPaymentsData(partPayRecData);
  }, []);

  useEffect(() => {
    setSoldData(soldDataDummy);
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

  const handleRowClick = (rowID) => {
    setSelectedRow(rowID);
  };

  const handleDropDownRowClick = (receiptID) => {
    setSelectedReceiptId(receiptID);
  };

  const handleCloseDropdown = () => {
    setSelectedRow(null);
  };

  const handleClosePartPayReceiptCard = () => {
    setSelectedReceiptId(false);
  };

  const renderDropdown = (projectID) => {
    const selectedProject = partSoldPayments.find(
      (item) => item.projectID === projectID
    );
    if (
      selectedRow === projectID &&
      selectedProject &&
      selectedProject.payment
    ) {
      const payments = Array.isArray(selectedProject.payment)
        ? selectedProject.payment
        : [selectedProject.payment];
      return (
        <tr className="dropdown" style={{ backgroundColor: "#D9D9D9" }}>
          <td colSpan="5">
            <div className="drop-sec">
              <div className="drop-head">
                <h4>Part-Payment</h4>
                <img src={close} alt="" onClick={handleCloseDropdown} />
              </div>
              <div className="drop-table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment, index) => (
                      <tr
                        key={index}
                        onClick={() =>
                          handleDropDownRowClick(payment.receipt_id)
                        }
                      >
                        <td>{payment.date || "No Payments yet"}</td>
                        <td>{payment.amount || "No Payments yet"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </td>
        </tr>
      );
    }
    return null;
  };

  return (
    <>
    <div className="receipt-table">
      <div className="receipt-table-sec">
        <div className="receipt-table-head">
          <h3>Receipts</h3>
          <div className="deleted-receipts">
          <button onClick={() => setShowDeletedProjects(!showDeletedProjects)}>Deleted Projects</button>
          </div>
        </div>
        {showDeletedProjects ? (
          <SoldDeletedProjects />
        ) : (
        <div className="receipts-table-container">
          <table>
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Project Name</th>
                {<th>Client Name</th>}
                {viewportWidth >= 1024 && <th>Status</th>}
                {viewportWidth >= 1024 && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {soldData.map((data) => (
                <React.Fragment key={data.projectID}>
                  <tr
                    key={data.projectID}
                    onClick={() => handleRowClick(data.projectID)}
                  >
                    <td>{data.projectID}</td>
                    <td>{data.projectName}</td>
                    <td>{data.clientName}</td>
                    {viewportWidth >= 1024 && <td>{data.status}</td>}
                    {viewportWidth >= 1024 && (
                      <td>
                        <div className="receipt-actions">
                          <img src={deleteIcon} alt="" />
                          <img src={exportIcon} alt="" />
                        </div>
                      </td>
                    )}
                  </tr>
                  {renderDropdown(data.projectID)}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
      {selectedReceiptId && (
        <SoldCard
          receiptID={selectedReceiptId}
          partPaymentsData={partPaymentsData}
          onClose={handleClosePartPayReceiptCard}
        />
      )}
    </div>
    {viewportWidth >= 1024 && <div className="res-del-rec">
      <h2>Deleted Projects</h2>
      <SoldDeletedProjects />
    </div>}
    </>
  );
};

export default SoldTable;
