import React, { useEffect, useState } from "react";
import "../Receipts/pendingReceipts.css";
import partSoldDataDummy from "../../../data/partSoldData";
import partSoldPayments from "../../../data/partSoldPayments";
import partPayRecData from "../../../data/partPayRecData";
import close from "../../../assets/menuClose.svg";
import deleteIcon from "../../../assets/delete.svg";
import exportIcon from "../../../assets/export.svg";
import PartPayReceiptCard from "./PartPayReceiptCard";
// import DeletedPartPaymentsTable from "./DeletedPartPaymentsTable";
import DeletedPartTable from "./DeletedPartTable";
import DeletedPartpaymentProjectsTable from "./DeletedPartpaymentProjectsTable";

const PartSoldTable = () => {
  const [partSoldData, setPartSoldData] = useState([]);
  const [partPaymentsData, setPartPaymentsData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedPartOption, setSelectedPartOption] = useState("Deleted Part");
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    setPartPaymentsData(partPayRecData);
  }, []);

  useEffect(() => {
    setPartSoldData(partSoldDataDummy)
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

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value); // Update selected option
    // console.log(selectedOption);
  };

  const handleSelectPartChange = (event) => {
    setSelectedPartOption(event.target.value); // Update selected option
    // console.log(selectedOption);
  };

  // useEffect(() => {
  //   console.log(selectedOption);
  // }, [selectedOption]);

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
          <div className="deleted-type">
          <select className="select-deleted-type" value={selectedOption} onChange={handleSelectChange}>
                <option value="">Deleted Part Payment</option>
                <option value="Deleted Part Payment">Deleted Part Payments</option>
                <option value="Deleted Projects">Deleted Projects</option>
            </select>
          </div>
        </div>
        <div className="receipts-table-container">
        {selectedOption === "" && (
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
              {partSoldData.map((partSold) => (
                <React.Fragment key={partSold.projectID}>
                  <tr
                    key={partSold.projectID}
                    onClick={() => handleRowClick(partSold.projectID)}
                  >
                    <td>{partSold.projectID}</td>
                    <td>{partSold.projectName}</td>
                    <td>{partSold.clientName}</td>
                    {viewportWidth >= 1024 && <td>{partSold.status}</td>}
                    {viewportWidth >= 1024 && (
                      <td>
                        <div className="receipt-actions">
                          <img src={deleteIcon} alt="" />
                          <img src={exportIcon} alt="" />
                        </div>
                      </td>
                    )}
                  </tr>
                  {renderDropdown(partSold.projectID)}
                </React.Fragment>
              ))}
            </tbody>
          </table> )}
          {selectedOption === "Deleted Part Payment" && (
            <DeletedPartTable />
          )}
          {selectedOption === "Deleted Projects" && (
            <DeletedPartpaymentProjectsTable />
          )}
        </div>
      </div>
      {selectedReceiptId && (
        <PartPayReceiptCard
          receiptID={selectedReceiptId}
          partPaymentsData={partPaymentsData}
          onClose={handleClosePartPayReceiptCard}
        />
      )}
    </div>
    {viewportWidth >= 1024 && <div className="res-del-rec">
    <select className="part-select" value={selectedPartOption} onChange={handleSelectPartChange}>
                <option value="Deleted Part">Deleted Part Payments</option>
                <option value="Deleted Proj">Deleted Projects</option>
    </select>
    {selectedPartOption === "Deleted Part" && (
            <DeletedPartTable />
          )}
          {selectedPartOption === "Deleted Proj" && (
            <DeletedPartpaymentProjectsTable />
          )}
    </div>}
    </>
  );
};

export default PartSoldTable;
